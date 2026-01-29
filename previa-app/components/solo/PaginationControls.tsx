import React from 'react';

interface PaginationControlsProps {
    onNext: () => void;
    onPrev: () => void;
    canNext: boolean;
    canPrev: boolean;
}

export default function PaginationControls({ onNext, onPrev, canNext, canPrev }: PaginationControlsProps) {
    return (
        <div className="flex justify-between w-full mt-4 px-2">
            {/* Left/Previous Button */}
            <button
                onClick={onPrev}
                className={`p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-all active:scale-95 ${!canPrev ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:border-violet-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]'}`}
                aria-label="Anterior"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                </svg>
            </button>

            {/* Right/Next Button */}
            <button
                onClick={onNext}
                className={`p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-all active:scale-95 ${!canNext ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:border-violet-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]'}`}
                aria-label="Siguiente"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                </svg>
            </button>
        </div>
    );
}
