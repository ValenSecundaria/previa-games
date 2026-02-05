'use client';

import Link from 'next/link';

export default function CarreraCaballos() {
    return (
        <main className="flex flex-col items-center justify-center flex-1 h-full w-full px-6">
            <div className="mb-6 text-center w-full">
                <h1 className="text-gradient text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    🐴 Carrera de Caballos
                </h1>
                <div className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm">
                    <p className="text-2xl md:text-3xl font-bold text-white/90 mb-2">
                        Próximo a desarrollar
                    </p>
                    <p className="text-lg text-white/60">
                        Este juego está en construcción. ¡Vuelve pronto! 🚧
                    </p>
                </div>
            </div>

            <div className="mt-6">
                <Link href="/solo" className="text-gray-400 hover:text-white transition-colors text-sm">
                    ← Volver a juegos
                </Link>
            </div>
        </main>
    );
}
