export type Suit = 'oros' | 'copas' | 'espadas' | 'bastos';

export interface SpanishCard {
    suit: Suit;
    value: number; // 1-12
    id: string; // e.g., "1-oros", "12-copas"
}

// Generar el mazo completo de 40 cartas (baraja española sin 8 y 9)
export const generateFullDeck = (): SpanishCard[] => {
    const suits: Suit[] = ['oros', 'copas', 'espadas', 'bastos'];
    const deck: SpanishCard[] = [];

    suits.forEach(suit => {
        // Baraja española: 1-7, 10-12 (sin 8 y 9)
        for (let value = 1; value <= 7; value++) {
            deck.push({
                suit,
                value,
                id: `${value}-${suit}`
            });
        }
        // Agregar 10, 11, 12 (Sota, Caballo, Rey)
        for (let value = 10; value <= 12; value++) {
            deck.push({
                suit,
                value,
                id: `${value}-${suit}`
            });
        }
    });

    return deck;
};

// Barajar el mazo
export const shuffleDeck = (deck: SpanishCard[]): SpanishCard[] => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Obtener el nombre de la carta
export const getCardName = (card: SpanishCard): string => {
    const valueNames: { [key: number]: string } = {
        1: 'As',
        2: 'Dos',
        3: 'Tres',
        4: 'Cuatro',
        5: 'Cinco',
        6: 'Seis',
        7: 'Siete',
        10: 'Sota',
        11: 'Caballo',
        12: 'Rey'
    };

    const suitNames = {
        'oros': 'Oros',
        'copas': 'Copas',
        'espadas': 'Espadas',
        'bastos': 'Bastos'
    };

    return `${valueNames[card.value]} de ${suitNames[card.suit]}`;
};
