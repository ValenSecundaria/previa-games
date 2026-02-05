import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Removido output: 'export' - incompatible con Vercel
    // Para Vercel, Next.js debe correr en su modo normal (SSR/SSG)
};

export default nextConfig;