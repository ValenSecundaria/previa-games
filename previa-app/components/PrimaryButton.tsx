import Link from 'next/link';
export default function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="btn btn-violet w-full shadow-lg">
            {children}
        </Link>
    );
}