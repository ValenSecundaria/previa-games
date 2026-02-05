'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/data/verdad-o-reto-questions';

type CardProps = {
    type: 'verdad' | 'reto' | 'mixta';
    question?: Question;
    onNext: () => void;
};

export default function Card({ type, question, onNext }: CardProps) {
    const [isRevealed, setIsRevealed] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);

    const cardColor = type === 'verdad'
        ? 'from-blue-500 to-cyan-500'
        : type === 'reto'
            ? 'from-pink-500 to-rose-500'
            : 'from-purple-500 to-violet-500'; // Mixta

    const cardTitle = type === 'verdad' ? 'VERDAD' : type === 'reto' ? 'RETO' : 'MIXTA';
    const cardEmoji = type === 'verdad' ? '🤔' : type === 'reto' ? '🎯' : '🎲';

    // Handle card reveal with 5-second timer for Next button
    const handleReveal = () => {
        if (!isRevealed) {
            setIsRevealed(true);

            // Show Next button after 5 seconds
            setTimeout(() => {
                setShowNextButton(true);
            }, 5000);
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <div
                className={`relative w-full max-w-md h-80 perspective-1000 transition-transform duration-300 ${isRevealed ? 'scale-100' : 'scale-95 hover:scale-100 cursor-pointer'
                    }`}
                onClick={handleReveal}
            >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${cardColor} shadow-2xl transition-all duration-300 ${isRevealed ? 'opacity-100' : 'opacity-90'}`}>
                    {/* Card Border Glow */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${cardColor} blur-xl opacity-50`}></div>

                    {/* Card Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-8 text-white">
                        {!isRevealed ? (
                            // Card Back - Covered State
                            <div className="text-center space-y-4 animate-fade-in">
                                <div className="text-7xl animate-bounce-slow">{cardEmoji}</div>
                                <h2 className="text-4xl font-black tracking-wider drop-shadow-lg">
                                    {cardTitle}
                                </h2>
                                <p className="text-sm text-white/80 font-medium">
                                    Toca para ver
                                </p>
                            </div>
                        ) : (
                            // Card Front - Revealed State
                            <div className="text-center space-y-6 animate-fade-in">
                                <div className="text-5xl">{cardEmoji}</div>
                                <p className="text-2xl font-bold leading-relaxed px-4">
                                    {question?.text || 'Cargando pregunta...'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Shadow */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/30 blur-2xl rounded-full"></div>
            </div>

            {/* Next Button - Shows after 5 seconds */}
            {showNextButton && (
                <button
                    onClick={onNext}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 btn btn-violet shadow-2xl animate-fade-in px-6 py-2 text-base font-bold"
                >
                    Siguiente →
                </button>
            )}
        </div>
    );
}
