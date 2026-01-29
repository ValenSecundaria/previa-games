import PrimaryButton from '@/components/PrimaryButton';
export default function Home(){
return (
<main>
<div className="logo-box mb-4">Logo</div>
<div className="d-grid gap-3">
<PrimaryButton href="/solo">Jugar con un móvil</PrimaryButton>
<a className="btn btn-secondary btn-lg btn-block rounded-3 shadow-sm disabled" aria-disabled>Jugar con varios móviles</a>
<a className="btn btn-secondary btn-lg btn-block rounded-3 shadow-sm" href="#">Sobre mí</a>
</div>
</main>
);
}