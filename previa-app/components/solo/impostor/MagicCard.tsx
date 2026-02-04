import React from 'react';
import MagicButton from './MagicButton';

interface MagicCardProps {
    player: string;
    isImpostor: boolean;
    word: string;
    onNext: () => void;
    isCardRevealed: boolean;
    setIsCardRevealed: (revealed: boolean) => void;
}

export default function MagicCard({ player, isImpostor, word, onNext, isCardRevealed, setIsCardRevealed }: MagicCardProps) {
    return (
        <div className="w-full max-w-sm mx-auto glass-card flex flex-col items-center gap-6 animate-fade-in">
            <div className="text-center">
                <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Turno de</p>
                <h2 className="text-3xl font-extrabold text-white">{player}</h2>
            </div>

            <div className="w-full">
                <MagicButton
                    isImpostor={isImpostor}
                    word={word}
                    isRevealed={isCardRevealed}
                    setIsRevealed={setIsCardRevealed}
                />
            </div>

            <button
                onClick={onNext}
                disabled={isCardRevealed}
                className={`btn btn-violet w-full shadow-lg transition-all ${isCardRevealed ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Siguiente
            </button>
        </div>
    );
}
