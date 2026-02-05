import React from 'react';

interface CardProps {
    suit?: 'oros' | 'copas' | 'espadas' | 'bastos' | 'reverso';
    value?: number; // 1-12
    scale?: number; // Escala para ajustar el tamaño (default: 1)
    className?: string;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
    suit = 'reverso',
    value = 1,
    scale = 1,
    className = '',
    onClick
}) => {
    // Calcular la posición en el sprite sheet
    const getSpritePosition = () => {
        if (suit === 'reverso') {
            // El reverso está en la fila 5 (índice 4), columna 2 (índice 1)
            return { row: 4, col: 1 };
        }

        const suitRow = {
            'oros': 0,
            'copas': 1,
            'espadas': 2,
            'bastos': 3
        }[suit];

        // value va de 1 a 12, columnas van de 0 a 11
        const col = (value - 1) % 12;

        return { row: suitRow, col };
    };

    const { row, col } = getSpritePosition();

    // Dimensiones base del sprite (12 columnas × 5 filas)
    const baseCardWidth = 2048 / 12; // ~170.67 px
    const baseCardHeight = 1309 / 5; // ~261.8 px

    // Aplicar escala
    const cardWidth = baseCardWidth * scale;
    const cardHeight = baseCardHeight * scale;
    const spriteWidth = 2048 * scale;
    const spriteHeight = 1309 * scale;

    // Calcular background-position
    const backgroundX = -(col * baseCardWidth * scale);
    const backgroundY = -(row * baseCardHeight * scale);

    return (
        <div
            className={`card ${className} ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}
            style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                backgroundImage: 'url(/bajara-completa.jpg)',
                backgroundPosition: `${backgroundX}px ${backgroundY}px`,
                backgroundSize: `${spriteWidth}px ${spriteHeight}px`,
                backgroundRepeat: 'no-repeat',
                display: 'inline-block',
                borderRadius: `${8 * scale}px`,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.2s ease',
            }}
        />
    );
};

export default Card;
