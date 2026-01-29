import { useState, useEffect } from 'react';

interface MagicButtonProps {
    isImpostor: boolean;
    word: string;
}

export default function MagicButton({ isImpostor, word }: MagicButtonProps) {
    const [revealed, setRevealed] = useState(false);
    const [showContent, setShowContent] = useState(false);

    // Reset state when word or role changes (new round/player)
    useEffect(() => {
        setRevealed(false);
        setShowContent(false);
    }, [word, isImpostor]);

    const handlePress = () => {
        setRevealed(true);
        // Small delay for animation if desired, or instant
        setShowContent(true);
    };

    const handleRelease = () => {
        // Optional: If we want it to hide when releasing, but usually for this game 
        // it stays revealed until "Next" is clicked in the parent. 
        // For "Hold to reveal" mechanics, we'd use onTouchStart/End.
        // The requirement says "Click to show", usually toggles or holds.
        // Let's implement a toggle for simplicity unless "Hold" is strictly requested.
        // User said: "Al presionarlo te muestra la palabra". "Presionarlo" could mean hold.
        // Let's stick to Toggle for accessibility and ease, or Hold if requested specifically?
        // "Al presionarlo te muestra" often implies "While pressed". 
        // Let's do a "Touch/Click to reveal, release to hide" for safety? 
        // Or a toggle. Let's do a simple TOGGLE based on context "MagicButton".
        // Actually, "Safety" means if I show it, I don't want the next person to see it accidentally.
        // Let's make it: Press and HOLD to see. Release to hide. 
        // Wait, requirements: "al presionarlo te muestra la palabra o te muestra 'Impostor'".
        // Let's implement PRESS AND HOLD interaction for better secrecy.
    };

    return (
        <button
            className={`w-full h-40 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-300 flex items-center justify-center text-2xl font-bold select-none
                ${revealed
                    ? (isImpostor ? 'bg-red-500/20 border-2 border-red-500 text-red-100' : 'bg-green-500/20 border-2 border-green-500 text-green-100')
                    : 'bg-gradient-to-br from-violet-600 to-fuchsia-600 border-2 border-white/20 text-white hover:scale-[1.02] active:scale-95'
                }`}
            onMouseDown={() => setRevealed(true)}
            onMouseUp={() => setRevealed(false)}
            onMouseLeave={() => setRevealed(false)}
            onTouchStart={() => setRevealed(true)}
            onTouchEnd={() => setRevealed(false)}
            type="button"
        >
            {revealed ? (
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
