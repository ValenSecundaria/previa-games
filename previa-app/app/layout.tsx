import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
export const metadata = { title: 'Previas', manifest: '/manifest.json' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="es">
<body className="bg-white text-dark">
<div className="container py-4" style={{maxWidth: 420}}>
{children}
</div>
<script dangerouslySetInnerHTML={{__html:`if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js'));}`}} />
</body>
</html>
);
}