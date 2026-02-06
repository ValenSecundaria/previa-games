# Previa App

**Previa App** es una aplicación web progresiva (PWA) diseñada para animar fiestas y reuniones sociales. Ofrece una colección de juegos interactivos que se juegan con un solo dispositivo móvil, pasándolo entre los participantes.

## 🎮 Juegos Disponibles

### 1. **Impostor**
Juego de deducción social inspirado en el clásico "palabra secreta". Los jugadores reciben una palabra común excepto uno o más impostores que no la conocen. El objetivo es descubrir quién es el impostor mediante preguntas estratégicas.

**Características:**
- Configuración de 1-3 impostores
- Múltiples temáticas predefinidas:
  - **Selecciones de fútbol**: Equipos nacionales de todo el mundo
  - **Equipos de fútbol**: Clubes internacionales famosos
  - **NBA**: Jugadores históricos y actuales de baloncesto
  - **Películas**: Títulos icónicos del cine
  - **Series**: Producciones populares de TV
  - **Acciones**: Verbos y actividades cotidianas
  - **Lugares**: Sitios y ubicaciones comunes
  - **General**: Combinación de todas las categorías
- Sistema de rondas con persistencia en LocalStorage
- Interfaz con animaciones y efectos visuales (MagicCard)
- Gestión dinámica de jugadores

### 2. **Verdad o Reto**
El clásico juego de preguntas y desafíos con una base de datos extensa y categorizada.

**Características:**
- **78 preguntas de "Verdad"**:
  - 23 para modo con alcohol
  - 21 para modo sin alcohol
- **55 desafíos de "Reto"**:
  - 23 para modo con alcohol
  - 32 para modo sin alcohol
- Sistema de preferencias por jugador (toma/no toma alcohol)
- Filtrado inteligente de preguntas según preferencias
- Tres modalidades de juego:
  - Solo verdades
  - Solo retos
  - Mixto (aleatorio)
- Detección de orientación de pantalla
- Evita repetición de preguntas consecutivas
- Sistema de barajas visuales con animaciones

### 3. **Carrera de Caballos**
Juego de apuestas basado en el robo de cartas de una baraja española. Cada palo representa un caballo que avanza en la pista.

**Características:**
- Baraja española completa (48 cartas)
- 4 caballos (Oros, Copas, Espadas, Bastos)
- Sistema de animación de 2 frames:
  - Frame 1: Caballo saltando
  - Frame 2: Caballo corriendo
- Detección automática de ganador
- Visualización de cartas robadas
- Sistema de reinicio de partida
- Recursos gráficos personalizados (`horse-jumping.png`, `horse-running.png`)

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 16.1.6** - Framework React con renderizado del lado del servidor
- **React 19.2.3** - Biblioteca para interfaces de usuario
- **TypeScript 5** - Tipado estático para JavaScript
- **Tailwind CSS 4** - Framework de utilidades CSS
- **Outfit (Google Fonts)** - Tipografía principal

### Herramientas de Desarrollo
- **ESLint 9** - Linter para calidad de código
- **PostCSS** - Procesador CSS con plugin de Tailwind
- **@types/node, @types/react, @types/react-dom** - Definiciones de tipos

### PWA y Optimización
- **Service Worker** (`sw.js`) - Cacheo y funcionalidad offline
- **Web App Manifest** (`manifest.json`) - Configuración de instalación
- **Firebase** - Infraestructura de hosting (configurado pero opcional)

## 📁 Estructura del Proyecto

```
previa-app/
├── app/                          # Rutas de Next.js (App Router)
│   ├── layout.tsx                # Layout principal con fuente Outfit
│   ├── page.tsx                  # Página de inicio
│   ├── globals.css               # Estilos globales
│   └── solo/                     # Juegos para un solo dispositivo
│       ├── page.tsx              # Selector de juegos con paginación
│       ├── impostor/
│       │   └── page.tsx          # Lógica completa del juego Impostor
│       ├── verdad-o-reto/
│       │   └── page.tsx          # Lógica completa de Verdad o Reto
│       └── carrera-caballos/
│           └── page.tsx          # Lógica completa de Carrera de Caballos
├── components/                   # Componentes reutilizables
│   ├── PrimaryButton.tsx         # Botón principal con estilos
│   └── solo/                     # Componentes específicos por juego
│       ├── PaginationControls.tsx
│       ├── impostor/
│       │   ├── PlayerInput.tsx
│       │   ├── ThemeSelector.tsx
│       │   └── MagicCard.tsx
│       ├── verdad-o-reto/
│       │   ├── Deck.tsx
│       │   └── Card.tsx
│       └── carrera-caballos/
│           ├── Card.tsx
│           └── deckUtils.ts
├── data/                         # Datos del juego
│   └── verdad-o-reto-questions.ts # Base de datos de 133 preguntas/retos
├── public/                       # Recursos estáticos
│   ├── manifest.json             # Configuración PWA
│   ├── sw.js                     # Service Worker
│   ├── horse-jumping.png         # Animación caballo (frame 1)
│   ├── horse-running.png         # Animación caballo (frame 2)
│   └── bajara-completa.jpg       # Imagen de baraja española
├── package.json                  # Dependencias del proyecto
├── tsconfig.json                 # Configuración TypeScript
└── next.config.ts                # Configuración Next.js
```

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Node.js 20+ 
- npm o pnpm

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd previa-app

# Instalar dependencias
npm install
```

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Modo Producción

```bash
# Compilar para producción
npm run build

# Ejecutar en producción
npm start
```

### Linting

```bash
npm run lint
```

## 📱 Progressive Web App (PWA)

La aplicación está configurada como PWA, lo que permite:

- **Instalación en dispositivos móviles**: Agregar a pantalla de inicio
- **Funcionalidad offline**: Cacheo mediante Service Worker
- **Experiencia nativa**: Pantalla completa sin barra de navegador
- **Optimización móvil**: `viewport` configurado para evitar zoom

### Configuración PWA
- **Nombre**: "Previas App"
- **Nombre corto**: "Previas"
- **Modo de visualización**: `standalone`
- **Color de tema**: `#212529`
- **Color de fondo**: `#ffffff`

## 🎨 Diseño y UX

### Paleta de Colores
- **Fondo principal**: Negro (`#000000`)
- **Texto**: Blanco
- **Tema oscuro**: `#0f0f13`
- **Botones primarios**: Gradientes violeta/rosa
- **Hover effects**: Transiciones suaves

### Características de UI
- **Tipografía**: Outfit (Google Fonts)
- **Responsive design**: Adaptado a móviles
- **Animaciones**: Efectos de glassmorfismo y micro-animaciones
- **Anti-aliasing**: Renderizado suave de texto
- **Gradientes de texto**: Efectos visuales premium

## 🔧 Configuración Técnica

### TypeScript
- **Target**: ES2017
- **JSX**: React JSX automático (`react-jsx`)
- **Strict mode**: Habilitado
- **Module resolution**: Bundler (Next.js)
- **Path aliases**: `@/*` apunta a la raíz del proyecto

### Next.js
- **App Router**: Arquitectura moderna de Next.js 13+
- **Client Components**: Uso de `'use client'` para interactividad
- **Metadata**: SEO optimizado con meta tags dinámicos
- **Font Optimization**: Carga optimizada de fuentes de Google

## 🎯 Características Destacadas

### Sistema de Persistencia
- **LocalStorage**: Guarda el estado de las partidas
- **Recuperación automática**: Continúa donde dejaste
- **Reset manual**: Opción de reiniciar juegos

### Gestión de Estado
- **React Hooks**: `useState`, `useEffect`, `useCallback`, `useMemo`
- **Estado local**: Sin necesidad de bibliotecas externas
- **Optimización de renders**: Memoización donde es necesario

### Navegación
- **Next.js Link**: Navegación del lado del cliente
- **useRouter**: Navegación programática
- **Breadcrumbs**: Enlaces de retorno intuitivos

## 🌐 Deployment

### Firebase Hosting (Configurado)
El proyecto incluye configuración para Firebase:
- `.firebaserc`: Configuración del proyecto
- `firebase.json`: Reglas de hosting

### Otros Servicios Compatibles
- Vercel (recomendado para Next.js)
- Netlify
- Railway
- Render

## 📝 Próximas Funcionalidades

Según la estructura del código, hay espacio para:
- 6 juegos adicionales (slots reservados en el selector)
- Modo multijugador con varios dispositivos
- Sistema de estadísticas y puntuaciones
- Más temáticas para el juego del Impostor
- Ampliación de la base de datos de Verdad o Reto

## 📄 Licencia

Este proyecto es de uso privado.

## 👤 Autor

Desarrollado como aplicación de entretenimiento social.

---

**¡Diviértete jugando! 🎉**
