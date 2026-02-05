import './globals.css';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata = {
    title: 'Previa App',
    description: 'La mejor app para tus previas.',
    manifest: '/manifest.json',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
    themeColor: '#0f0f13',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body className={`${outfit.className} bg-black text-white antialiased min-h-screen`}>
                <div className="app-container">
                    {children}
                </div>
                <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js'));}` }} />
            </body>
        </html>
    );
}