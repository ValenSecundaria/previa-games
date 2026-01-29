import PrimaryButton from '@/components/PrimaryButton';
const items = ['Impostor','Juego 2','Juego 3','Juego 4','Juego 5','Juego 6','Juego 7','Juego 8'];
export default function Solo(){
return (
<main>
<div className="logo-box mb-3">Logo</div>
<div className="d-grid gap-3">
{items.map((label,i)=> (
i===0
? <PrimaryButton key={label} href="/solo/impostor">{label}</PrimaryButton>
: <button key={label} className="btn btn-secondary btn-lg btn-block rounded-3 shadow-sm" disabled>{label}</button>
))}
</div>
</main>
);
}