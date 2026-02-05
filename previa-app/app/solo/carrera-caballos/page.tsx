'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Card from '@/components/solo/carrera-caballos/Card';
import { generateFullDeck, shuffleDeck, SpanishCard } from '@/components/solo/carrera-caballos/deckUtils';

export default function CarreraCaballos() {
    // Generar y barajar el mazo solo una vez al inicio
    const initialDeck = useMemo(() => shuffleDeck(generateFullDeck()), []);

    const [deck, setDeck] = useState<SpanishCard[]>(initialDeck);
    const [discardPile, setDiscardPile] = useState<SpanishCard[]>([]);
    const [currentCard, setCurrentCard] = useState<SpanishCard | null>(null);
    const [showCardPopup, setShowCardPopup] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [horsePositions, setHorsePositions] = useState([0, 0, 0, 0]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [horseFrames, setHorseFrames] = useState([0, 0, 0, 0]); // 0 = running, 1 = jumping para cada caballo
    const [winner, setWinner] = useState<number | null>(null); // Índice del caballo ganador
    const totalColumns = 10;
    const horses = ['🐴', '🐎', '🏇', '🦄'];

    // Colores para cada caballo según el palo
    const horseColors = [
        'invert(50%) sepia(100%) saturate(500%) hue-rotate(160deg) brightness(1.2)', // Celeste - Espada
        'invert(40%) sepia(100%) saturate(400%) hue-rotate(340deg) brightness(1.1)', // Rojo suave - Copa
        'invert(45%) sepia(100%) saturate(600%) hue-rotate(80deg) brightness(0.85)', // Verde oscuro - Basto
        'invert(70%) sepia(100%) saturate(500%) hue-rotate(20deg) brightness(1.2)'   // Amarillo-oro - Oro
    ];

    // Función para robar una carta
    const drawCard = () => {
        if (deck.length === 0) return; // No hay más cartas

        const [drawnCard, ...remainingDeck] = deck;
        setDeck(remainingDeck);

        setCurrentCard(drawnCard);
        setShowCardPopup(true);
        setIsExiting(false);

        // Después de 1.3 segundos, iniciar animación de salida
        setTimeout(() => {
            setIsExiting(true);
        }, 1300);

        // Cerrar popup y mover la carta actual al descarte después de 1.5 segundos total
        setTimeout(() => {
            setShowCardPopup(false);
            setIsExiting(false);

            // Mover la carta que acabamos de sacar al descarte
            setDiscardPile(prev => [drawnCard, ...prev]);

            // Esperar 1 segundo después de que la carta llega al descarte, luego animar caballos
            setTimeout(() => {
                animateHorses(drawnCard.suit);
            }, 1000);
        }, 1500);
    };

    // Función para animar el movimiento con 2 frames
    const animateHorses = (suit: string) => {
        setIsAnimating(true);

        // Mapear palo a índice de caballo
        const suitToHorseIndex: { [key: string]: number } = {
            'espadas': 0,  // Celeste
            'copas': 1,    // Rojo suave
            'bastos': 2,   // Verde
            'oros': 3      // Amarillo-oro
        };

        const horseIndex = suitToHorseIndex[suit];

        // Frame 1: jumping - solo para el caballo correspondiente
        setHorseFrames(prev => prev.map((frame, idx) => idx === horseIndex ? 1 : frame));

        setTimeout(() => {
            // Frame 2: running y mover solo el caballo correspondiente
            setHorseFrames(prev => prev.map((frame, idx) => idx === horseIndex ? 0 : frame));

            const newPositions = horsePositions.map((pos, idx) =>
                idx === horseIndex ? Math.min(pos + 1, totalColumns - 1) : pos
            );

            setHorsePositions(newPositions);

            // Verificar si el caballo llegó a la meta
            if (newPositions[horseIndex] >= totalColumns - 1) {
                setWinner(horseIndex);
            }

            setIsAnimating(false);
        }, 300); // 300ms para el salto
    };

    // Función para reiniciar el juego
    const restartGame = () => {
        setHorsePositions([0, 0, 0, 0]);
        setHorseFrames([0, 0, 0, 0]);
        setWinner(null);
        setDeck(shuffleDeck(generateFullDeck()));
        setDiscardPile([]);
        setCurrentCard(null);
    };

    return (
        <>
            <style jsx>{`
                @keyframes cardEnter {
                    0% {
                        transform: scale(0.3) translateX(40vw) translateY(30vh);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(1) translateX(0) translateY(0);
                        opacity: 1;
                    }
                }
            `}</style>

            <main className="flex flex-col items-center justify-center flex-1 h-full w-full px-6 py-8">
                {/* Título */}
                <div className="mb-8 text-center w-full">
                    <h1 className="text-gradient text-4xl md:text-5xl font-extrabold tracking-tight">
                        Carrera de caballos
                    </h1>
                </div>

                {/* Popup de carta animada */}
                {showCardPopup && currentCard && (
                    <div
                        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'
                            }`}
                    >
                        <div
                            className={`transition-all duration-500 ${isExiting
                                ? 'scale-50 opacity-0 translate-x-[-40vw] translate-y-[30vh]'
                                : 'scale-100 opacity-100'
                                }`}
                            style={{
                                animation: isExiting ? 'none' : 'cardEnter 0.5s ease-out'
                            }}
                        >
                            <Card
                                suit={currentCard.suit}
                                value={currentCard.value}
                                scale={1.8}
                            />
                        </div>
                    </div>
                )}

                {/* Popup de Victoria */}
                {winner !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-md w-full mx-4 border-2 border-purple-500/50 shadow-2xl">
                            {/* Caballo ganador */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="mb-4">
                                    <img
                                        src='/horse-running.png'
                                        alt="caballo ganador"
                                        className="h-32 w-auto object-contain"
                                        style={{ filter: horseColors[winner!] }}
                                    />
                                </div>

                                <h2 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                    ¡Victoria!
                                </h2>

                                <p className="text-xl text-white/90 text-center">
                                    El caballo <span className="font-bold">
                                        {winner === 0 && 'Espada'}
                                        {winner === 1 && 'Copa'}
                                        {winner === 2 && 'Basto'}
                                        {winner === 3 && 'Oro'}
                                    </span> ha ganado la carrera
                                </p>
                            </div>

                            {/* Botones */}
                            <div className="flex gap-4 mt-8">
                                <button
                                    onClick={restartGame}
                                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                    </svg>
                                    Reiniciar
                                </button>

                                <Link
                                    href="/solo"
                                    className="flex-1 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center"
                                >
                                    Volver al menú
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mazos de cartas */}
                <div className="mb-8 flex gap-4 items-center">
                    {/* Carta jugada (Descarte) - Solo se muestra si hay cartas jugadas */}
                    {discardPile.length > 0 && (
                        <div className="hover:scale-105 transition-transform">
                            <Card
                                suit={discardPile[0].suit}
                                value={discardPile[0].value}
                                scale={0.6}
                            />
                        </div>
                    )}

                    {/* Carta oculta (Mazo principal) */}
                    {deck.length > 0 && (
                        <div className="hover:scale-105 transition-transform">
                            <Card
                                suit="reverso"
                                scale={0.6}
                                onClick={drawCard}
                            />
                        </div>
                    )}
                </div>

                {/* Cuadrícula de carreras */}
                <div className="w-full max-w-4xl">
                    <div className="space-y-3">
                        {horses.map((horse, rowIndex) => (
                            <div key={rowIndex} className="flex items-center gap-1">
                                {/* Pista de carreras */}
                                <div className="flex-1 flex gap-1">
                                    {Array.from({ length: totalColumns }).map((_, colIndex) => (
                                        <div
                                            key={colIndex}
                                            className="flex-1 h-12 rounded-lg border-2 bg-gray-800/30 border-gray-700/50"
                                        >
                                            {/* Indicador de posición */}
                                            {colIndex === horsePositions[rowIndex] && (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <img
                                                        src={horseFrames[rowIndex] === 0 ? '/horse-running.png' : '/horse-jumping.png'}
                                                        alt="caballo"
                                                        className="h-10 w-auto object-contain"
                                                        style={{ filter: horseColors[rowIndex] }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Meta */}
                                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center text-2xl border-2 border-yellow-400/50">
                                    🏁
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botón de volver */}
                <div className="mt-12">
                    <Link href="/solo" className="text-gray-400 hover:text-white transition-colors text-sm">
                        ← Volver a juegos
                    </Link>
                </div>
            </main>
        </>
    );
}
