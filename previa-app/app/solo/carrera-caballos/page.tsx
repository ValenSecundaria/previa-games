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
    const [currentFrame, setCurrentFrame] = useState(0); // 0 = running, 1 = jumping
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
                animateHorses();
            }, 1000);
        }, 1500);
    };

    // Función para animar el movimiento con 2 frames
    const animateHorses = () => {
        setIsAnimating(true);

        // Frame 1: jumping
        setCurrentFrame(1);

        setTimeout(() => {
            // Frame 2: running y mover a la siguiente posición
            setCurrentFrame(0);
            setHorsePositions(prev =>
                prev.map(pos => Math.min(pos + 1, totalColumns - 1))
            );
            setIsAnimating(false);
        }, 300); // 300ms para el salto
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
                                {/* Caballo */}
                                <div className="w-12 text-3xl flex items-center justify-center">
                                    {horse}
                                </div>

                                {/* Pista de carreras */}
                                <div className="flex-1 flex gap-1">
                                    {Array.from({ length: totalColumns }).map((_, colIndex) => (
                                        <div
                                            key={colIndex}
                                            className={`flex-1 h-12 rounded-lg border-2 transition-all ${colIndex === horsePositions[rowIndex]
                                                ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-purple-400/50'
                                                : 'bg-gray-800/30 border-gray-700/50'
                                                }`}
                                        >
                                            {/* Indicador de posición */}
                                            {colIndex === horsePositions[rowIndex] && (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <img
                                                        src={currentFrame === 0 ? '/horse-running.png' : '/horse-jumping.png'}
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
                <div className="mt-8">
                    <Link href="/solo" className="text-gray-400 hover:text-white transition-colors text-sm">
                        ← Volver a juegos
                    </Link>
                </div>
            </main>
        </>
    );
}
