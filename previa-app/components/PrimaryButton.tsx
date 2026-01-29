import Link from 'next/link';
export default function PrimaryButton({ href, children }:{href:string;children:React.ReactNode}){
return (
<Link href={href} className="btn btn-secondary btn-lg btn-block rounded-3 shadow-sm">
{children}
</Link>
);
}