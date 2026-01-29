import Link from 'next/link';
import PrimaryButton from '@/components/PrimaryButton';

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center flex-1 h-full w-full px-6">
            <div className="mb-6 text-center w-full">
                <h1 className="text-gradient text-4xl md:text-5xl font-extrabold tracking-tight">Bienvenidos</h1>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-[280px]">
                <PrimaryButton href="/solo">Jugar con un móvil</PrimaryButton>
                <Link href="#" className="btn btn-violet w-full shadow-lg opacity-60 pointer-events-none">
                    Jugar con varios móviles
                </Link>
                <Link href="#" className="btn btn-violet w-full shadow-lg">
                    Sobre mí
                </Link>
            </div>
        </main>
    );
}