'use client';

import { useState } from 'react';
import Link from 'next/link';
import PrimaryButton from '@/components/PrimaryButton';
import PaginationControls from '@/components/solo/PaginationControls';

const items = [
    'Impostor', 'Verdad o Reto', 'Carrera caballos', 'Juego 3',
    'Juego 4', 'Juego 5', 'Juego 6', 'Juego 7', 'Juego 8'
];

export default function Solo() {
    const [page, setPage] = useState(0);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const startIndex = page * itemsPerPage;
    const displayedItems = items.slice(startIndex, startIndex + itemsPerPage);

    const nextPage = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 0) setPage(page - 1);
    };

    return (
        <main className="flex flex-col items-center justify-center flex-1 h-full w-full px-6">
            <div className="mb-6 text-center w-full">
                <h1 className="text-gradient text-4xl md:text-5xl font-extrabold tracking-tight">Juegos</h1>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-[280px] min-h-[300px]">
                {displayedItems.map((label) => (
                    label === 'Impostor'
                        ? <PrimaryButton key={label} href="/solo/impostor">{label}</PrimaryButton>
                        : label === 'Verdad o Reto'
                            ? <PrimaryButton key={label} href="/solo/verdad-o-reto">{label}</PrimaryButton>
                            : label === 'Carrera caballos'
                                ? <PrimaryButton key={label} href="/solo/carrera-caballos">{label}</PrimaryButton>
                                : <button key={label} className="btn btn-violet w-full shadow-lg opacity-50 cursor-not-allowed" disabled>{label}</button>
                ))}
            </div>

            {/* Pagination Controls */}
            {/* Pagination Controls */}
            <div className="w-full max-w-[320px] mt-2">
                <PaginationControls
                    onNext={nextPage}
                    onPrev={prevPage}
                    canNext={page < totalPages - 1}
                    canPrev={page > 0}
                />
            </div>

            <div className="mt-6">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                    ← Volver al inicio
                </Link>
            </div>
        </main>
    );
}