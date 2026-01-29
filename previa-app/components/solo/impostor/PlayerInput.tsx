import { useState } from 'react';

interface PlayerInputProps {
    onAdd: (name: string) => void;
}

export default function PlayerInput({ onAdd }: PlayerInputProps) {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = name.trim();
        if (trimmed) {
            onAdd(trimmed);
            setName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del jugador..."
                className="glass-input flex-1"
                maxLength={12}
            />
            <button
                type="submit"
                className="btn btn-violet !w-auto !py-2 !px-4 rounded-xl font-bold uppercase text-sm tracking-wide"
                disabled={!name.trim()}
            >
                Add
            </button>
        </form>
    );
}
