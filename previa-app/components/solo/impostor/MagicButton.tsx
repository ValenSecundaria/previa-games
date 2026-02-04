import { useEffect } from 'react';

interface MagicButtonProps {
    isImpostor: boolean;
    word: string;
    isRevealed: boolean;
    setIsRevealed: (revealed: boolean) => void;
}

export default function MagicButton({ isImpostor, word, isRevealed, setIsRevealed }: MagicButtonProps) {
    // Reset state when word or role changes (new round/player)
    useEffect(() => {
        setIsRevealed(false);
    }, [word, isImpostor, setIsRevealed]);

    return (
        <button
            className={`w-full h-40 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-300 flex items-center justify-center text-2xl font-bold select-none
                ${isRevealed
                    ? (isImpostor ? 'bg-red-500/20 border-2 border-red-500 text-red-100' : 'bg-green-500/20 border-2 border-green-500 text-green-100')
                    : 'bg-gradient-to-br from-violet-600 to-fuchsia-600 border-2 border-white/20 text-white hover:scale-[1.02] active:scale-95'
                }`}
            onMouseDown={() => setIsRevealed(true)}
            onMouseUp={() => setIsRevealed(false)}
            onMouseLeave={() => setIsRevealed(false)}
            onTouchStart={() => setIsRevealed(true)}
            onTouchEnd={() => setIsRevealed(false)}
            type="button"
        >
            {isRevealed ? (
                <span className="animate-fade-in">
                    {isImpostor ? 'IMPOSTOR' : word}
                </span>
            ) : (
                <div className="flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span className="text-lg opacity-90">Mantener para ver</span>
                </div>
            )}
        </button>
    );
}
