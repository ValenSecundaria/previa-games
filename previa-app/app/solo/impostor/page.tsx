'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PlayerInput from '@/components/solo/impostor/PlayerInput';
import ThemeSelector from '@/components/solo/impostor/ThemeSelector';
import MagicCard from '@/components/solo/impostor/MagicCard';

// --- MOCK DICTIONARY ---
const MOCK_WORDS: { [key: string]: string[] } = {
    'General': ['Pizza', 'Fútbol', 'Playa', 'Hospital', 'Escuela', 'Gimnasio', 'Cine', 'Supermercado'],
    'Comida': ['Hamburguesa', 'Sushi', 'Tacos', 'Milanesa', 'Helado', 'Ensalada', 'Asado', 'Pasta'],
    'Lugares': ['París', 'Nueva York', 'Japón', 'Brasil', 'Egipto', 'Roma', 'Londres', 'China'],
    'Animales': ['León', 'Elefante', 'Perro', 'Gato', 'Águila', 'Tiburón', 'Delfín', 'Gorila'],
    'Famosos': ['Messi', 'Shakira', 'Brad Pitt', 'Taylor Swift', 'The Rock', 'Rihanna', 'Cristiano', 'Beyoncé'],
    'Objetos': ['Silla', 'Teléfono', 'Computadora', 'Reloj', 'Lámpara', 'Mesa', 'Cama', 'Espejo'],
    'Películas': ['Titanic', 'Avatar', 'Star Wars', 'Harry Potter', 'Matrix', 'Joker', 'Avengers', 'Frozen'],
    'Marcas': ['Nike', 'Adidas', 'Apple', 'Samsung', 'Coca-Cola', 'McDonalds', 'Tesla', 'Netflix']
};

type GameState = 'SETUP' | 'PLAYING' | 'FINISHED';

// Key for LocalStorage
const STORAGE_KEY = 'previa-impostor-state';

export default function ImpostorGame() {
    const router = useRouter();

    // --- STATE ---
    const [players, setPlayers] = useState<string[]>([]);
    const [theme, setTheme] = useState('General');
    const [currentTheme, setCurrentTheme] = useState('General'); // To track what's confirmed
    const [gameState, setGameState] = useState<GameState>('SETUP');
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

    // Game Options
    const [targetImpostorCount, setTargetImpostorCount] = useState(1);

    // Game Logic State
    const [turnOrder, setTurnOrder] = useState<number[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [impostorIndices, setImpostorIndices] = useState<number[]>([]);
    const [secretWord, setSecretWord] = useState('');

    // --- INITIALIZATION ---
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                setPlayers(data.players || []);
                setTheme(data.theme || 'General');
                setCurrentTheme(data.theme || 'General');
                setGameState(data.gameState || 'SETUP');
                setTurnOrder(data.turnOrder || []);
                setCurrentStep(data.currentStep || 0);
                setImpostorIndices(data.impostorIndices || []);
                setSecretWord(data.secretWord || '');
                setTargetImpostorCount(data.targetImpostorCount || 1);
            } catch (e) {
                console.error("Failed to load state", e);
            }
        }
    }, []);

    // --- PERSISTENCE ---
    useEffect(() => {
        const stateToSave = {
            players,
            theme,
            gameState,
            turnOrder,
            currentStep,

            impostorIndices,
            secretWord,
            targetImpostorCount
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    }, [players, theme, gameState, turnOrder, currentStep, impostorIndices, secretWord, targetImpostorCount]);


    // --- HELPERS ---
    const getRandomWord = (selectedTheme: string) => {
        const list = MOCK_WORDS[selectedTheme] || MOCK_WORDS['General'];
        return list[Math.floor(Math.random() * list.length)];
    };

    const setupNewRound = (selectedTheme: string) => {
        if (players.length < 3) return;

        // 1. Pick Start Index (Random)
        const startIndex = Math.floor(Math.random() * players.length);

        // 2. Generate Circular Turn Order
        const newOrder = [];
        for (let i = 0; i < players.length; i++) {
            newOrder.push((startIndex + i) % players.length);
        }

        // 3. Pick Impostors (Unique)
        const safeCount = Math.min(targetImpostorCount, Math.floor(players.length / 2));
        const newImpostors: number[] = [];
        while (newImpostors.length < safeCount) {
            const candidate = Math.floor(Math.random() * players.length);
            if (!newImpostors.includes(candidate)) {
                newImpostors.push(candidate);
            }
        }

        // 4. Pick Word
        const newWord = getRandomWord(selectedTheme);

        setTurnOrder(newOrder);
        setImpostorIndices(newImpostors);
        setSecretWord(newWord);
        setTheme(selectedTheme);
        setCurrentTheme(selectedTheme);
        setCurrentStep(0);
        setGameState('PLAYING');
    };

    // --- HANDLERS ---
    const addPlayer = (name: string) => {
        if (!players.includes(name)) {
            setPlayers([...players, name]);
        }
    };

    const removePlayer = (index: number) => {
        const newPlayers = players.filter((_, i) => i !== index);
        setPlayers(newPlayers);
        // Auto-adjust impostor count if needed
        if (newPlayers.length < 8 && targetImpostorCount > 2) setTargetImpostorCount(2);
        if (newPlayers.length < 6 && targetImpostorCount > 1) setTargetImpostorCount(1);
    };

    const handleStartGame = () => {
        if (players.length < 3) return;
        setupNewRound(theme);
    };

    const handleNextPlayer = () => {
        if (currentStep < players.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setGameState('FINISHED');
        }
    };

    const handleNextRound = () => {
        setupNewRound(theme);
    };

    const handleChangeTheme = (newTheme: string) => {
        // Confirmation is implicit in "Confirm" logic if we had a separate button, 
        // but user asked for "Select -> Confirm -> Start".
        // Here we just set the local theme state, waiting for explicit confirmation action if needed?
        // User said: "Cambiar tematica... selecciona una nueva, y cuando selecciona y confirma, arranca el ciclo"
        // So effectively, selecting in the modal + closing/confirming starts new round.
        // Let's assume selecting in modal calls `confirmChangeTheme` immediately or via a button in modal.
        // For simplicity with our `ThemeSelector`, let's make the selection trigger the restart.
        // Or better: Open modal -> Select -> (Modal closes) -> Logic runs.

        // Let's implement this: "Restart game immediately with new theme"
        setupNewRound(newTheme);
    };

    const handleQuit = () => {
        localStorage.removeItem(STORAGE_KEY);
        router.push('/solo');
    };

    // --- RENDER ---
    const currentPlayerIndex = turnOrder[currentStep];
    const currentPlayerName = players[currentPlayerIndex];
    const isImpostor = impostorIndices.includes(currentPlayerIndex);

    // Dynamic max impostors based on player count
    const canHaveTwoImpostors = players.length >= 6;
    const canHaveThreeImpostors = players.length >= 8;

    return (
        <main className="flex flex-col items-center justify-center flex-1 h-full w-full px-6 py-6 overflow-hidden">
            {/* SETUP VIEW */}
            {gameState === 'SETUP' && (
                <div className="w-full max-w-sm flex flex-col items-center gap-6 animate-fade-in flex-1 justify-center">
                    <div className="text-center w-full">
                        <h1 className="text-gradient text-4xl font-extrabold mb-1">Jugadores</h1>
                        <p className="text-gray-400 text-sm">Mínimo 3 jugadores</p>
                    </div>

                    <PlayerInput onAdd={addPlayer} />

                    <div className="w-full flex-1 min-h-[100px] max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                        {players.length === 0 && (
                            <p className="text-center text-gray-500 mt-4 italic">Agrega jugadores para empezar...</p>
                        )}
                        <ul className="flex flex-col gap-2">
                            {players.map((p, i) => (
                                <li key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5 animate-fade-in">
                                    <span className="font-medium text-white">{p}</span>
                                    <button onClick={() => removePlayer(i)} className="text-gray-400 hover:text-red-400 p-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-full space-y-4 mt-auto">
                        {/* IMPOSTOR COUNT SELECTOR */}
                        {canHaveTwoImpostors && (
                            <div className="w-full animate-fade-in">
                                <label className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-3 block text-center">
                                    Cantidad de Impostores
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        onClick={() => setTargetImpostorCount(1)}
                                        className={`h-14 rounded-xl font-bold text-xl border-2 transition-all duration-200 ${targetImpostorCount === 1 ? 'border-violet-500 bg-violet-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] scale-105' : 'border-transparent bg-white/5 text-gray-500 hover:bg-white/10'}`}
                                    >
                                        1
                                    </button>
                                    <button
                                        onClick={() => setTargetImpostorCount(2)}
                                        className={`h-14 rounded-xl font-bold text-xl border-2 transition-all duration-200 ${targetImpostorCount === 2 ? 'border-violet-500 bg-violet-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] scale-105' : 'border-transparent bg-white/5 text-gray-500 hover:bg-white/10'}`}
                                    >
                                        2
                                    </button>
                                    {canHaveThreeImpostors ? (
                                        <button
                                            onClick={() => setTargetImpostorCount(3)}
                                            className={`h-14 rounded-xl font-bold text-xl border-2 transition-all duration-200 ${targetImpostorCount === 3 ? 'border-violet-500 bg-violet-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] scale-105' : 'border-transparent bg-white/5 text-gray-500 hover:bg-white/10'}`}
                                        >
                                            3
                                        </button>
                                    ) : (
                                        <div className="h-14 rounded-xl border-2 border-transparent bg-white/5 opacity-20 flex items-center justify-center">
                                            <span className="text-gray-600 font-bold text-xl">3</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* SPACER between sections */}
                        <div className="h-6"></div>

                        <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10 mb-12">
                            <span className="text-gray-300">Temática:</span>
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                                    {theme}
                                </span>
                                <button
                                    onClick={() => setIsThemeModalOpen(true)}
                                    className="btn btn-secondary !py-1 !px-3 text-sm !w-auto"
                                >
                                    Cambiar
                                </button>
                            </div>
                        </div>

                        {/* SPACER */}
                        <div className="h-10 w-full"></div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleStartGame}
                                disabled={players.length < 3}
                                className={`btn btn-violet w-full shadow-lg py-4 text-xl tracking-wide font-black uppercase ${players.length < 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Jugar
                            </button>

                            <Link href="/solo" className="block text-center text-gray-500 hover:text-white text-sm py-2">
                                Volver
                            </Link>
                        </div>


                    </div>
                </div>
            )}

            {/* PLAYING VIEW */}
            {gameState === 'PLAYING' && (
                <div className="w-full max-w-sm flex flex-col justify-center gap-4 flex-1">
                    <MagicCard
                        player={currentPlayerName}
                        isImpostor={isImpostor}
                        word={secretWord}
                        onNext={handleNextPlayer}
                    />

                    {/* Safe Progress Indicator */}
                    <div className="flex justify-center gap-1 mt-4">
                        {turnOrder.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 rounded-full transition-all duration-300 ${i <= currentStep ? 'w-4 bg-violet-500' : 'w-2 bg-gray-700'}`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* FINISHED VIEW */}
            {gameState === 'FINISHED' && (
                <div className="w-full max-w-sm flex flex-col items-center justify-center gap-8 animate-fade-in flex-1">
                    <div className="text-center">
                        <div className="text-5xl mb-4">🤫</div>
                        <h2 className="text-3xl font-extrabold text-white mb-2">¡Ronda Terminada!</h2>
                        <p className="text-gray-400 text-sm">
                            ¿Quién es el impostor?
                        </p>
                    </div>

                    <div className="w-full space-y-3">
                        <button onClick={handleNextRound} className="btn btn-violet w-full shadow-lg">
                            Siguiente Ronda
                        </button>

                        <button
                            onClick={() => setIsThemeModalOpen(true)}
                            className="btn btn-secondary w-full"
                        >
                            Cambiar Temática
                        </button>

                        <button onClick={handleQuit} className="btn w-full text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20">
                            Terminar Juego
                        </button>
                    </div>
                </div>
            )}

            {/* THEME MODAL */}
            <ThemeSelector
                isOpen={isThemeModalOpen}
                onClose={() => setIsThemeModalOpen(false)}
                onSelect={(newTheme) => {
                    if (gameState === 'FINISHED') {
                        handleChangeTheme(newTheme);
                    } else {
                        setTheme(newTheme);
                    }
                }}
                currentTheme={theme}
            />
        </main>
    );
}