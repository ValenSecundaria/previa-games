'use client';

type DeckProps = {
    type: 'verdad' | 'reto' | 'mixta';
    count: number;
    onSelect: () => void;
    isActive?: boolean;
};

export default function Deck({ type, count, onSelect, isActive = false }: DeckProps) {
    const cardColor = type === 'verdad'
        ? 'from-blue-500 to-cyan-500'
        : type === 'reto'
            ? 'from-pink-500 to-rose-500'
            : 'from-purple-500 to-violet-500'; // Mixta uses purple gradient

    const cardTitle = type === 'verdad' ? 'VERDAD' : type === 'reto' ? 'RETO' : 'MIXTA';
    const cardEmoji = type === 'verdad' ? '🤔' : type === 'reto' ? '🎯' : '🎲';

    return (
        <button
            onClick={onSelect}
            disabled={count === 0}
            className={`relative group ${count === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        >
            {/* Stack Effect - Multiple Cards */}
            <div className="relative">
                {/* Back card (3rd layer) */}
                <div className={`absolute -top-2 -right-2 w-40 h-56 rounded-2xl bg-gradient-to-br ${cardColor} opacity-30 blur-sm`}></div>

                {/* Middle card (2nd layer) */}
                <div className={`absolute -top-1 -right-1 w-40 h-56 rounded-2xl bg-gradient-to-br ${cardColor} opacity-60`}></div>

                {/* Front card (Main) */}
                <div className={`relative w-40 h-56 rounded-2xl bg-gradient-to-br ${cardColor} shadow-2xl transition-all duration-300 ${isActive
                    ? 'scale-110 shadow-[0_0_40px_rgba(139,92,246,0.8)]'
                    : count > 0
                        ? 'group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]'
                        : ''
                    }`}>
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cardColor} blur-lg opacity-50`}></div>

                    {/* Card Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-4 text-white">
                        <div className="text-5xl mb-2 animate-bounce-slow">{cardEmoji}</div>
                        <h3 className="text-2xl font-black tracking-wider drop-shadow-lg mb-1">
                            {cardTitle}
                        </h3>
                        <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center">
                            <span className="text-sm font-bold">{count}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Selection Indicator */}
            {isActive && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1 animate-fade-in">
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse delay-150"></div>
                </div>
            )}
        </button>
    );
}
