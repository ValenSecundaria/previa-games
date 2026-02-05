// Types for Truth or Dare questions
export type QuestionType = 'verdad' | 'reto';

export interface Question {
    id: number;
    type: QuestionType;
    text: string;
    difficulty: number; // 1-100: Level of danger/embarrassment
    requiresAlcohol: boolean; // true if this challenge involves drinking
}

// Truth questions database
export const VERDADES: Question[] = [
    // 🍺 VERDAD – MODO TOMA (23 preguntas)
    { id: 1, type: 'verdad', text: '¿A alguien de esta ronda le das?', difficulty: 0, requiresAlcohol: true },
    { id: 2, type: 'verdad', text: '¿Contar la mayor vergüenza que te pasó tomando alcohol?', difficulty: 0, requiresAlcohol: true },
    { id: 3, type: 'verdad', text: '¿Alguna vez dijiste "estoy bien" cuando claramente no lo estabas?', difficulty: 0, requiresAlcohol: true },
    { id: 4, type: 'verdad', text: '¿A quién stalkeaste más de una vez?', difficulty: 0, requiresAlcohol: true },
    { id: 5, type: 'verdad', text: '¿Contar si alguna ve levantaste sin saber cómo llegaste a tu casa?', difficulty: 0, requiresAlcohol: true },
    { id: 6, type: 'verdad', text: '¿Qué mensaje te arrepentís de haber mandado borracho (mostrar)?', difficulty: 0, requiresAlcohol: true },
    { id: 7, type: 'verdad', text: '¿Quién te cae peor de la ronda cuando toma?', difficulty: 0, requiresAlcohol: true },
    { id: 8, type: 'verdad', text: '¿A quién defendiste estando en pedo y después te arrepentiste?', difficulty: 0, requiresAlcohol: true },
    { id: 9, type: 'verdad', text: '¿Cuál fue la peor decisión que tomaste de noche?', difficulty: 0, requiresAlcohol: true },
    { id: 10, type: 'verdad', text: '¿A quién de acá no le confiarías tus llaves?', difficulty: 0, requiresAlcohol: true },
    { id: 11, type: 'verdad', text: '¿Qué fue lo más caro que rompiste sin querer?', difficulty: 0, requiresAlcohol: true },
    { id: 12, type: 'verdad', text: '¿Alguna vez mentiste diciendo "ya estoy llegando"?', difficulty: 0, requiresAlcohol: true },
    { id: 13, type: 'verdad', text: '¿Con quién nunca saldrías ni aunque estés borracho?', difficulty: 0, requiresAlcohol: true },
    { id: 14, type: 'verdad', text: '¿Cuál fue tu peor resaca?', difficulty: 0, requiresAlcohol: true },
    { id: 15, type: 'verdad', text: '¿Qué mentira decís seguido para evitar planes?', difficulty: 0, requiresAlcohol: true },
    { id: 16, type: 'verdad', text: '¿Quién de este grupo chamuyaría mejor estando borracho?', difficulty: 0, requiresAlcohol: true },
    { id: 17, type: 'verdad', text: '¿Qué cosa dijiste en pedo que fue totalmente innecesaria?', difficulty: 0, requiresAlcohol: true },
    { id: 18, type: 'verdad', text: '¿A quién bloqueaste y después desbloqueaste?', difficulty: 0, requiresAlcohol: true },
    { id: 19, type: 'verdad', text: '¿Alguna vez prometiste algo a alguien del grupo que sabías que no ibas a cumplir?', difficulty: 0, requiresAlcohol: true },
    { id: 20, type: 'verdad', text: '¿Qué te da más vergüenza admitir cuando tomás?', difficulty: 0, requiresAlcohol: true },
    { id: 21, type: 'verdad', text: '¿Quién de acá sería peor compañero de viaje?', difficulty: 0, requiresAlcohol: true },
    { id: 22, type: 'verdad', text: '¿Alguna vez fingiste estar más borracho de lo que estabas?', difficulty: 0, requiresAlcohol: true },
    { id: 23, type: 'verdad', text: '¿A quién defendiste solo porque te caía bien?', difficulty: 0, requiresAlcohol: true },

    // 🚱 VERDAD – MODO NO TOMA (21 preguntas)
    { id: 24, type: 'verdad', text: '¿A quién de esta ronda conocés menos?', difficulty: 0, requiresAlcohol: false },
    { id: 25, type: 'verdad', text: '¿Qué situación social te incomoda más?', difficulty: 0, requiresAlcohol: false },
    { id: 26, type: 'verdad', text: '¿Qué es lo primero que notás de una persona?', difficulty: 0, requiresAlcohol: false },
    { id: 27, type: 'verdad', text: '¿Qué plan cancelaste y no te arrepentís?', difficulty: 0, requiresAlcohol: false },
    { id: 28, type: 'verdad', text: '¿Qué hábito raro tenés?', difficulty: 0, requiresAlcohol: false },
    { id: 29, type: 'verdad', text: '¿Qué cosa te da vergüenza admitir?', difficulty: 0, requiresAlcohol: false },
    { id: 30, type: 'verdad', text: '¿Qué te pone de mal humor rápido?', difficulty: 0, requiresAlcohol: false },
    { id: 31, type: 'verdad', text: '¿Con quién te llevás mejor de este grupo?', difficulty: 0, requiresAlcohol: false },
    { id: 32, type: 'verdad', text: '¿Qué harías distinto si no te importara el qué dirán?', difficulty: 0, requiresAlcohol: false },
    { id: 33, type: 'verdad', text: '¿Qué momento de tu vida repetirías?', difficulty: 0, requiresAlcohol: false },
    { id: 34, type: 'verdad', text: '¿Qué te saca una sonrisa siempre?', difficulty: 0, requiresAlcohol: false },
    { id: 35, type: 'verdad', text: '¿Qué es lo que más te cuesta decir que no?', difficulty: 0, requiresAlcohol: false },
    { id: 36, type: 'verdad', text: '¿verdad dura o una mentira linda?', difficulty: 0, requiresAlcohol: false },
    { id: 37, type: 'verdad', text: '¿Qué hábito tuyo cambiarías si fuera fácil?', difficulty: 0, requiresAlcohol: false },
    { id: 38, type: 'verdad', text: '¿Qué parte del día odiás más?', difficulty: 0, requiresAlcohol: false },
    { id: 39, type: 'verdad', text: '¿Qué te molesta de vos mismo?', difficulty: 0, requiresAlcohol: false },
    { id: 40, type: 'verdad', text: '¿Qué te hace sentir fuera de lugar?', difficulty: 0, requiresAlcohol: false },
    { id: 41, type: 'verdad', text: '¿Qué plan preferís pero casi nunca proponés?', difficulty: 0, requiresAlcohol: false },
    { id: 42, type: 'verdad', text: '¿Sos más intenso o más desapegado?', difficulty: 0, requiresAlcohol: false },
    { id: 43, type: 'verdad', text: '¿Qué te gustaría que los demás entiendan de vos?', difficulty: 0, requiresAlcohol: false },
    { id: 44, type: 'verdad', text: '¿Qué cosa simple te hace muy feliz?', difficulty: 0, requiresAlcohol: false }
];

// Dare challenges database
export const RETOS: Question[] = [
    // 🍺 RETO – MODO TOMA (23 retos)
    { id: 101, type: 'reto', text: 'Tomá un trago por cada persona que esté a tu derecha.', difficulty: 0, requiresAlcohol: true },
    { id: 102, type: 'reto', text: 'Elegí a alguien para que tome por vos.', difficulty: 0, requiresAlcohol: true },
    { id: 103, type: 'reto', text: 'Brindá y tomá diciendo algo ridículamente solemne.', difficulty: 0, requiresAlcohol: true },
    { id: 104, type: 'reto', text: 'Tomá y contá una anécdota corta.', difficulty: 0, requiresAlcohol: true },
    { id: 105, type: 'reto', text: 'Tomá sin usar las manos.', difficulty: 0, requiresAlcohol: true },
    { id: 106, type: 'reto', text: 'Tomá y mandá un audio diciendo "todo bajo control" (el grupo elige a quien el audio).', difficulty: 0, requiresAlcohol: true },
    { id: 107, type: 'reto', text: 'Elegí a alguien y tomen juntos.', difficulty: 0, requiresAlcohol: true },
    { id: 108, type: 'reto', text: 'Tomá mirando a alguien fijo.', difficulty: 0, requiresAlcohol: true },
    { id: 109, type: 'reto', text: 'Tomá y cambiá de lugar con alguien.', difficulty: 0, requiresAlcohol: true },
    { id: 110, type: 'reto', text: 'Tomá y elegí la próxima carta.', difficulty: 0, requiresAlcohol: true },
    { id: 111, type: 'reto', text: 'Tomá y poné música por 1 minuto.', difficulty: 0, requiresAlcohol: true },
    { id: 112, type: 'reto', text: 'Tomá diciendo el nombre de todos los jugadores.', difficulty: 0, requiresAlcohol: true },
    { id: 113, type: 'reto', text: 'Tomá y contá hasta 20 sin equivocarte.', difficulty: 0, requiresAlcohol: true },
    { id: 114, type: 'reto', text: 'Tomá y quedás en silencio hasta tu próximo turno (si hablas, tomás).', difficulty: 0, requiresAlcohol: true },
    { id: 115, type: 'reto', text: 'Tomá y decí "esta es una excelente decisión".', difficulty: 0, requiresAlcohol: true },
    { id: 116, type: 'reto', text: 'Tomá y elegí quién toma después.', difficulty: 0, requiresAlcohol: true },
    { id: 117, type: 'reto', text: 'Tomá mirando al techo.', difficulty: 0, requiresAlcohol: true },
    { id: 118, type: 'reto', text: 'Tomá y aplaudí 5 segundos.', difficulty: 0, requiresAlcohol: true },
    { id: 119, type: 'reto', text: 'Tomá y cambiá de asiento.', difficulty: 0, requiresAlcohol: true },
    { id: 120, type: 'reto', text: 'Tomá y quedate serio 1 ronda.', difficulty: 0, requiresAlcohol: true },
    { id: 121, type: 'reto', text: 'Tomá y poné la próxima canción.', difficulty: 0, requiresAlcohol: true },
    { id: 122, type: 'reto', text: 'Tomá haciendo una pose ridícula.', difficulty: 0, requiresAlcohol: true },
    { id: 123, type: 'reto', text: 'Tomá y no hablas hasta que te nombren.', difficulty: 0, requiresAlcohol: true },

    // 🚱 RETO – MODO NO TOMA (32 retos)
    { id: 124, type: 'reto', text: 'Cambiá de lugar con alguien.', difficulty: 0, requiresAlcohol: false },
    { id: 125, type: 'reto', text: 'Elegí la próxima canción.', difficulty: 0, requiresAlcohol: false },
    { id: 126, type: 'reto', text: 'Imitá a alguien del grupo.', difficulty: 0, requiresAlcohol: false },
    { id: 127, type: 'reto', text: 'Mandá un emoji al grupo de WhatsApp.', difficulty: 0, requiresAlcohol: false },
    { id: 128, type: 'reto', text: 'Decí algo positivo de cada jugador.', difficulty: 0, requiresAlcohol: false },
    { id: 129, type: 'reto', text: 'Parate y estirá como si fueras deportista profesional.', difficulty: 0, requiresAlcohol: false },
    { id: 130, type: 'reto', text: 'Hacé una mini presentación tuya.', difficulty: 0, requiresAlcohol: false },
    { id: 131, type: 'reto', text: 'Decí tres cosas que te gustan de la noche.', difficulty: 0, requiresAlcohol: false },
    { id: 132, type: 'reto', text: 'Cerrá los ojos hasta tu próximo turno.', difficulty: 0, requiresAlcohol: false },
    { id: 133, type: 'reto', text: 'Elegí a alguien para que haga el próximo reto.', difficulty: 0, requiresAlcohol: false },
    { id: 134, type: 'reto', text: 'Inventá una regla por una ronda completa para alguien.', difficulty: 0, requiresAlcohol: false },
    { id: 135, type: 'reto', text: 'El grupo decide tu reto.', difficulty: 0, requiresAlcohol: false },
    { id: 136, type: 'reto', text: 'El más hablador hace los proximos 3 retos.', difficulty: 0, requiresAlcohol: false },
    { id: 137, type: 'reto', text: 'Elegí a alguien para que responda por vos (hasta el final del jego).', difficulty: 0, requiresAlcohol: false },
    { id: 138, type: 'reto', text: 'Imitá a alguien del grupo (sin decir quién).', difficulty: 0, requiresAlcohol: false },
    { id: 139, type: 'reto', text: 'Cambiá tu lugar con el de enfrente.', difficulty: 0, requiresAlcohol: false },
    { id: 140, type: 'reto', text: 'Hablá solo con gestos por una ronda (completa).', difficulty: 0, requiresAlcohol: false },
    { id: 141, type: 'reto', text: 'Inventá un apodo para alguien (el grupo decide a quien).', difficulty: 0, requiresAlcohol: false },
    { id: 142, type: 'reto', text: 'Contá una historia inventada en serio.', difficulty: 0, requiresAlcohol: false },
    { id: 143, type: 'reto', text: 'Hacer karaoke de una canción elegida por el grupo durante 30s.', difficulty: 0, requiresAlcohol: false },
    { id: 144, type: 'reto', text: 'Decí algo positivo de alguien al azar.', difficulty: 0, requiresAlcohol: false },
    { id: 145, type: 'reto', text: 'Aplaudí cada vez que alguien hable (1 ronda completa).', difficulty: 0, requiresAlcohol: false },
    { id: 146, type: 'reto', text: 'Elegí una regla nueva por una ronda.', difficulty: 0, requiresAlcohol: false },
    { id: 147, type: 'reto', text: 'Cerrá los ojos 10 segundos.', difficulty: 0, requiresAlcohol: false },
    { id: 148, type: 'reto', text: 'Reíte sin motivo por 15 segundos.', difficulty: 0, requiresAlcohol: false },
    { id: 149, type: 'reto', text: 'Actuá como si estuvieras muy concentrado.', difficulty: 0, requiresAlcohol: false },
    { id: 150, type: 'reto', text: 'Hablá como relator deportivo (hasta que termine el juego).', difficulty: 0, requiresAlcohol: false },
    { id: 151, type: 'reto', text: 'Caminá como modelo por toda la ronda.', difficulty: 0, requiresAlcohol: false },
    { id: 152, type: 'reto', text: 'Hablá exageradamente formal.', difficulty: 0, requiresAlcohol: false },
    { id: 153, type: 'reto', text: 'Decí una frase filosófica.', difficulty: 0, requiresAlcohol: false },
    { id: 154, type: 'reto', text: 'Actuá como si estuvieras en un reality.', difficulty: 0, requiresAlcohol: false },
    { id: 155, type: 'reto', text: 'Elegí a alguien y copiá todo lo que haga (30s).', difficulty: 0, requiresAlcohol: false }
];

// Helper function to get a random question by type
export function getRandomQuestion(
    type: QuestionType,
    playerDrinksAlcohol: boolean
): Question {
    const questions = type === 'verdad' ? VERDADES : RETOS;

    // Filter questions based on alcohol preference
    const availableQuestions = playerDrinksAlcohol
        ? questions
        : questions.filter(q => !q.requiresAlcohol);

    if (availableQuestions.length === 0) {
        // Fallback if no questions available
        return {
            id: 0,
            type,
            text: 'No hay preguntas disponibles',
            difficulty: 1,
            requiresAlcohol: false
        };
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
}

// Helper function to get a random question avoiding repetition
export function getRandomQuestionAvoidingLast(
    type: QuestionType,
    playerDrinksAlcohol: boolean,
    lastQuestionId?: number
): Question {
    const questions = type === 'verdad' ? VERDADES : RETOS;

    // Filter questions based on alcohol preference
    let availableQuestions = playerDrinksAlcohol
        ? questions
        : questions.filter(q => !q.requiresAlcohol);

    // If there's a last question and more than one option, avoid it
    if (lastQuestionId && availableQuestions.length > 1) {
        availableQuestions = availableQuestions.filter(q => q.id !== lastQuestionId);
    }

    if (availableQuestions.length === 0) {
        return {
            id: 0,
            type,
            text: 'No hay preguntas disponibles',
            difficulty: 1,
            requiresAlcohol: false
        };
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
}

// Get question by difficulty range
export function getQuestionByDifficulty(
    type: QuestionType,
    playerDrinksAlcohol: boolean,
    minDifficulty: number,
    maxDifficulty: number
): Question {
    const questions = type === 'verdad' ? VERDADES : RETOS;

    // Filter by alcohol preference and difficulty range
    const availableQuestions = questions.filter(q => {
        const alcoholMatch = playerDrinksAlcohol || !q.requiresAlcohol;
        const difficultyMatch = q.difficulty >= minDifficulty && q.difficulty <= maxDifficulty;
        return alcoholMatch && difficultyMatch;
    });

    if (availableQuestions.length === 0) {
        // Fallback to any question that matches alcohol preference
        return getRandomQuestion(type, playerDrinksAlcohol);
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
}
