'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Deck from '@/components/solo/verdad-o-reto/Deck';
import Card from '@/components/solo/verdad-o-reto/Card';
import { getRandomQuestionAvoidingLast, Question } from '@/data/verdad-o-reto-questions';

// Player type with alcohol preference
type Player = {
    name: string;
    drinksAlcohol: boolean;
};

type GameState = 'SETUP' | 'PLAYING' | 'SHOWING_CARD';
type CardType = 'verdad' | 'reto' | 'mixta' | null;

export default function VerdadOReto() {
    const router = useRouter();
    const [gameState, setGameState] = useState<GameState>('SETUP');
    const [players, setPlayers] = useState<Player[]>([]);
    const [currentPlayerName, setCurrentPlayerName] = useState('');
    const [drinksAlcohol, setDrinksAlcohol] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [showLandscapeWarning, setShowLandscapeWarning] = useState(false);

    // Game state
    const [selectedCardType, setSelectedCardType] = useState<CardType>(null);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [lastQuestionId, setLastQuestionId] = useState<number | undefined>(undefined);
    const [verdadCount, setVerdadCount] = useState(50);
    const [retoCount, setRetoCount] = useState(50);
    const [mixtaCount, setMixtaCount] = useState(50);

    // Player turn system
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

    // Check orientation and force landscape when playing
    useEffect(() => {
        if (gameState === 'PLAYING' || gameState === 'SHOWING_CARD') {
            const checkOrientation = () => {
                const isLandscape = window.innerWidth > window.innerHeight;
                setShowLandscapeWarning(!isLandscape);
            };

            checkOrientation();
            window.addEventListener('resize', checkOrientation);
            window.addEventListener('orientationchange', checkOrientation);

            return () => {
                window.removeEventListener('resize', checkOrientation);
                window.removeEventListener('orientationchange', checkOrientation);
            };
        }
    }, [gameState]);

    // Validate player name
    const validatePlayerName = (name: string): string | null => {
        if (!name.trim()) {
            return 'El nombre no puede estar vacío o contener solo espacios';
        }

        if (/^\d+$/.test(name.trim())) {
            return 'El nombre no puede ser solo números';
        }

        if (name.trim().length < 2) {
            return 'El nombre debe tener al menos 2 caracteres';
        }

        if (players.some(p => p.name.toLowerCase() === name.trim().toLowerCase())) {
            return 'Este nombre ya está en uso';
        }

        return null;
    };

    const handleAddPlayer = () => {
        const validationError = validatePlayerName(currentPlayerName);

        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        setPlayers([...players, { name: currentPlayerName.trim(), drinksAlcohol }]);
        setCurrentPlayerName('');
        setDrinksAlcohol(true);
        setErrorMessage('');
    };

    const handleRemovePlayer = (index: number) => {
        setPlayers(players.filter((_, i) => i !== index));
    };

    const handleStartGame = () => {
        if (players.length < 2) {
            setErrorMessage('Necesitas al menos 2 jugadores para empezar');
            return;
        }
        setGameState('PLAYING');
    };

    const handleSelectDeck = (type: 'verdad' | 'reto' | 'mixta') => {
        if (type === 'verdad' && verdadCount === 0) return;
        if (type === 'reto' && retoCount === 0) return;
        if (type === 'mixta' && mixtaCount === 0) return;

        // For mixta, randomly choose verdad or reto
        let actualType: 'verdad' | 'reto' = type === 'mixta'
            ? (Math.random() < 0.5 ? 'verdad' : 'reto')
            : type;

        // Get current player info
        const currentPlayer = players[currentPlayerIndex];

        // Get a random question based on player's alcohol preference
        const question = getRandomQuestionAvoidingLast(
            actualType,
            currentPlayer.drinksAlcohol,
            lastQuestionId
        );

        setSelectedCardType(actualType);
        setCurrentQuestion(question);
        setLastQuestionId(question.id);
        setGameState('SHOWING_CARD');

        // Decrease count
        if (type === 'verdad') {
            setVerdadCount(prev => prev - 1);
        } else if (type === 'reto') {
            setRetoCount(prev => prev - 1);
        } else if (type === 'mixta') {
            setMixtaCount(prev => prev - 1);
        }
    };

    const handleNextCard = () => {
        // Move to next player
        setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
        setGameState('PLAYING');
        setSelectedCardType(null);
        setCurrentQuestion(null);
    };

    const handleQuitGame = () => {
        router.push('/solo');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddPlayer();
        }
    };

    return (
        <>
            {/* Landscape Warning Overlay */}
            {showLandscapeWarning && (gameState === 'PLAYING' || gameState === 'SHOWING_CARD') && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6">
                    <div className="text-center space-y-6 max-w-md">
                        <div className="text-8xl animate-bounce">📱</div>
                        <h2 className="text-3xl font-bold text-white">¡Gira tu dispositivo!</h2>
                        <p className="text-gray-300 text-lg">
                            Este juego debe jugarse en modo horizontal
                        </p>
                        <div className="text-6xl rotate-90 animate-pulse">↻</div>
                    </div>
                </div>
            )}

            <main className={`flex flex-col items-center justify-center flex-1 h-full w-full overflow-hidden ${gameState === 'PLAYING' || gameState === 'SHOWING_CARD' ? 'landscape-only' : 'px-6 py-6'
                }`}>
                {/* SETUP VIEW - Player Registration */}
                {gameState === 'SETUP' && (
                    <div className="w-full max-w-md flex flex-col items-center gap-6 animate-fade-in flex-1 justify-center px-6">
                        <div className="text-center w-full">
                            <h1 className="text-gradient text-4xl md:text-5xl font-extrabold mb-2">Verdad o Reto</h1>
                            <p className="text-gray-400 text-sm">Registra a los jugadores</p>
                        </div>

                        {/* Player Input Form */}
                        <div className="w-full bg-white/5 p-6 rounded-2xl border border-white/10 shadow-2xl">
                            <div className="space-y-4">
                                {/* Name Input */}
                                <div>
                                    <label htmlFor="playerName" className="text-gray-300 text-sm font-medium mb-2 block">
                                        Nombre del jugador
                                    </label>
                                    <input
                                        id="playerName"
                                        type="text"
                                        value={currentPlayerName}
                                        onChange={(e) => {
                                            setCurrentPlayerName(e.target.value);
                                            setErrorMessage('');
                                        }}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ingresa el nombre..."
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                                        maxLength={20}
                                    />
                                </div>

                                {/* Alcohol Checkbox */}
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                                    <input
                                        id="drinksAlcohol"
                                        type="checkbox"
                                        checked={drinksAlcohol}
                                        onChange={(e) => setDrinksAlcohol(e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-500 text-violet-600 focus:ring-violet-500 focus:ring-offset-0 bg-white/10 cursor-pointer"
                                    />
                                    <label htmlFor="drinksAlcohol" className="text-gray-300 text-sm font-medium cursor-pointer select-none">
                                        ¿Toma alcohol? 🍺
                                    </label>
                                </div>

                                {/* Error Message */}
                                {errorMessage && (
                                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm animate-fade-in">
                                        {errorMessage}
                                    </div>
                                )}

                                {/* Add Button */}
                                <button
                                    onClick={handleAddPlayer}
                                    className="w-full btn btn-violet shadow-lg py-3 font-bold"
                                >
                                    Agregar Jugador
                                </button>
                            </div>
                        </div>

                        {/* Players List */}
                        <div className="w-full flex-1 min-h-[100px] max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
                            {players.length === 0 && (
                                <p className="text-center text-gray-500 italic mt-4">
                                    No hay jugadores registrados aún...
                                </p>
                            )}
                            {players.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-3">
                                        Jugadores ({players.length})
                                    </h3>
                                    <ul className="space-y-2">
                                        {players.map((player, index) => (
                                            <li
                                                key={index}
                                                className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10 animate-fade-in hover:bg-white/10 transition-all"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="font-medium text-white">{player.name}</span>
                                                    {player.drinksAlcohol && (
                                                        <span className="text-lg" title="Toma alcohol">🍺</span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => handleRemovePlayer(index)}
                                                    className="text-gray-400 hover:text-red-400 p-1 transition-colors"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M18 6 6 18" />
                                                        <path d="m6 6 12 12" />
                                                    </svg>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="w-full space-y-3 mt-auto">
                            <button
                                onClick={handleStartGame}
                                disabled={players.length < 2}
                                className={`btn btn-violet w-full shadow-lg py-4 text-xl tracking-wide font-black uppercase ${players.length < 2 ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                Empezar Juego
                            </button>

                            <button
                                onClick={handleQuitGame}
                                className="block w-full text-center text-gray-500 hover:text-white text-sm py-2 transition-colors"
                            >
                                Volver
                            </button>
                        </div>
                    </div>
                )}

                {/* PLAYING VIEW - Deck Selection (Landscape Mode) */}
                {gameState === 'PLAYING' && !showLandscapeWarning && (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 animate-fade-in relative">
                        {/* Player Turn Indicator */}
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
                            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Turno de</p>
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                                {players[currentPlayerIndex]?.name}
                            </h2>
                            {players[currentPlayerIndex]?.drinksAlcohol && (
                                <span className="text-2xl mt-1 inline-block">🍺</span>
                            )}
                        </div>

                        {/* Decks */}
                        <div className="flex items-center justify-center gap-8">
                            {/* Verdad Deck */}
                            <Deck
                                type="verdad"
                                count={verdadCount}
                                onSelect={() => handleSelectDeck('verdad')}
                            />

                            {/* Mixta Deck */}
                            <Deck
                                type="mixta"
                                count={mixtaCount}
                                onSelect={() => handleSelectDeck('mixta')}
                            />

                            {/* Reto Deck */}
                            <Deck
                                type="reto"
                                count={retoCount}
                                onSelect={() => handleSelectDeck('reto')}
                            />
                        </div>

                        {/* Quit Button - Small and discreet */}
                        <button
                            onClick={handleQuitGame}
                            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-500/40 transition-all group"
                            title="Salir del juego"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-400 group-hover:text-red-400 transition-colors"
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* SHOWING CARD VIEW (Landscape Mode) */}
                {gameState === 'SHOWING_CARD' && selectedCardType && !showLandscapeWarning && (
                    <div className="w-full h-full animate-fade-in relative">
                        <Card
                            type={selectedCardType}
                            question={currentQuestion || undefined}
                            onNext={handleNextCard}
                        />

                        {/* Quit Button - Small and discreet */}
                        <button
                            onClick={handleQuitGame}
                            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-500/40 transition-all group z-50"
                            title="Salir del juego"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-400 group-hover:text-red-400 transition-colors"
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>
                )}
            </main>
        </>
    );
}
