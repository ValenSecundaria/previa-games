import React from 'react';

interface ThemeSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (theme: string) => void;
    currentTheme: string;
}

const THEMES = [
    'General',
    'Selecciones',
    'Jugadores Famosos de Fútbol',
    'Jugadores Históricos NBA',
    'Películas',
    'Marcas',
    'Series',
    'Acciones',
    'Bandas / Cantantes',
    'Lugares',
    'Equipos de futbol',
    'Test'
];

export default function ThemeSelector({ isOpen, onClose, onSelect, currentTheme }: ThemeSelectorProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-xs bg-[#1a1a20] border border-violet-500/30 rounded-2xl p-4 shadow-2xl flex flex-col gap-3 max-h-[70vh]">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-white">Seleccionar Temática</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                    </button>
                </div>

                <div className="overflow-y-auto flex-1 flex flex-col gap-2 pr-1">
                    {THEMES.map(theme => (
                        <button
                            key={theme}
                            onClick={() => {
                                onSelect(theme);
                                onClose();
                            }}
                            className={`w-full text-left p-3 rounded-xl transition-all ${currentTheme === theme
                                ? 'bg-violet-600 text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            {theme}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
