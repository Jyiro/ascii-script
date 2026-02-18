# ASCII-SCRIPT

> Micro-librería JavaScript para renderizado y animación de arte ASCII en el DOM

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/badge/bundle-~5kb-brightgreen)](https://bundlephobia.com)
[![Version](https://img.shields.io/badge/version-0.1.0-blue)](https://www.npmjs.com/package/ascii-script)

**[English](#english-version) | Español**

Librería ligera e independiente de frameworks para crear impresionantes animaciones de arte ASCII en el navegador.

## ✨ Características

- 🎨 **Efectos Variados** - Wave, color-cycle, glitch, scramble, typewriter, matrix rain y más
- 🎭 **Presets Listos** - Combinaciones preconfiguradas de efectos (hologram, rainbow, terminal, decrypt)
- 📦 **Bundle Minúsculo** - ~5kb core + efectos cargados bajo demanda (3-5kb cada uno)
- ⚡ **Rendimiento 60fps** - Aceleración GPU vía transformaciones CSS, fallback canvas para arte grande
- 🔌 **Agnóstico de Framework** - JavaScript puro, funciona con React, Vue, Svelte o vanilla
- 🎯 **Auto-Detección** - Detecta y formatea automáticamente arte ASCII multi-línea
- 🌈 **Extensible** - Sistema de plugins para efectos personalizados
- 🎮 **API Intuitiva** - Métodos encadenables y configuración sencilla
- 📱 **Responsive** - Se adapta a diferentes tamaños de pantalla
- 🚀 **Zero Dependencies** - Sin dependencias externas

## 🚀 Inicio Rápido

### Instalación

```bash
npm install ascii-script
```

O usando CDN:

```html
<script type="module">
  import { create } from 'https://unpkg.com/ascii-script';
</script>
```

### Uso Básico

```javascript
import { create } from 'ascii-script';

// Inicializar motor
const ascii = create();

// Crear instancia de arte ASCII
const logo = ascii.createArt('#my-logo');

// Aplicar efectos
await logo.wave({ amplitude: 3 });
await logo.colorCycle();

// Iniciar animación
logo.play();
```

### HTML

```html
<pre id="my-logo">
  █████╗ ███████╗ ██████╗██╗██╗
 ██╔══██╗██╔════╝██╔════╝██║██║
 ███████║███████╗██║     ██║██║
 ██╔══██║╚════██║██║     ██║██║
 ██║  ██║███████║╚██████╗██║██║
 ╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝╚═╝
</pre>
```

## 🎨 Efectos Disponibles

### Efectos para Arte ASCII

Perfectos para logos y banners ASCII estáticos:

- **Wave** - Desplazamiento en onda sinusoidal por línea
- **Color Cycle** - Rotación de color HSL tipo arcoíris
- **Pulse** - Animación de escala respiratoria
- **Perspective** - Transformaciones CSS 3D
- **Color Gradient** - Degradados de color suaves

### Efectos de Animación de Texto

Para texto dinámico:

- **Scramble** - Reemplazo aleatorio de caracteres con revelado progresivo
- **Reveal** - Revelación secuencial de caracteres
- **Glitch** - Corrupción digital y desplazamiento
- **Typewriter** - Efecto de escritura de terminal
- **Matrix Rain** - Caracteres cayendo estilo Matrix

### Efectos Procedurales

Fondos basados en canvas:

- **Noise** - Generación de ruido tipo Perlin
- **Scanlines** - Efecto de monitor CRT
- **Particles** - Partículas de caracteres ASCII

## 🎭 Presets

Combinaciones preconfiguradas de efectos para uso rápido:

```javascript
// Efecto holográfico (glitch + pulse)
await logo.preset('hologram');

// Efecto Matrix (matrix rain + scanlines)
await text.preset('matrix');

// Animación de desencriptado (scramble → reveal)
await text.preset('decrypt');

// Onda arcoíris (wave + color cycle)
await logo.preset('rainbow');

// Terminal retro (typewriter + scanlines)
await text.preset('terminal');
```

## 📖 Ejemplos

### 🚀 Ejecutar Ejemplos en Vivo

Para ver los ejemplos interactivos en tu navegador:

```bash
# 1. Clonar o navegar al proyecto
cd ascii-script

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# El servidor te mostrará la URL (generalmente http://localhost:5173)
```

**Ejemplos Disponibles:**

- **Enhanced Terminal** - `examples/enhanced.html`
  - Terminal interactivo completo con todos los efectos
  - Controles en tiempo real
  - Showcase de todos los presets

- **ASCII Art Showcase** - `examples/ascii-art/showcase.html`
  - Galería de efectos para arte ASCII
  - Logos y banners animados
  - Efectos combinados

### Ejemplos de Código

#### Logo Animado

```javascript
const ascii = create();
const logo = ascii.createArt('#logo');

await logo.preset('rainbow');
logo.play();
```

#### Efecto Typewriter

```javascript
const text = ascii.createArt('#greeting');

await text.typewriter({ speed: 80 });
text.play();
```

#### Fondo Procedural

```javascript
const bg = ascii.createBackground('#bg', {
  cols: 80,
  rows: 40,
  charset: ' .:-=+*#%@'
});

bg.play();
```

### Cadena de Efectos Personalizada

```javascript
await art
  .scramble({ duration: 1000 })
  .then(() => art.reveal({ duration: 1500 }))
  .then(() => art.wave());

art.play();
```

### Efecto Matrix Completo

```javascript
const ascii = create();

// Fondo con scanlines
const bg = ascii.createBackground('#bg', {
  cols: 100,
  rows: 40
});

// Texto con matrix rain
const text = ascii.createArt('#matrix-text');
await text.preset('matrix');

// Reproducir ambos
bg.play();
text.play();
```

### Animación Secuencial

```javascript
const ascii = create();
const logo = ascii.createArt('#logo');

// Secuencia de efectos
async function animate() {
  await logo.scramble({ duration: 800 });
  await logo.reveal({ duration: 1200 });
  await logo.colorCycle();
  logo.play();
}

animate();
```

## 📚 Documentación

- [Referencia API Completa](docs/api.md) - Documentación detallada de todas las APIs y métodos
- **Ejemplos en Vivo** - Ejecuta `npm run dev` y abre:
  - `examples/enhanced.html` - Terminal interactivo completo
  - `examples/ascii-art/showcase.html` - Galería de efectos
- Guía de Efectos Personalizados - Ver sección "Uso Avanzado" en [docs/api.md](docs/api.md)

## 🛠️ Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Ejecutar tests
npm test

# Tests con UI
npm run test:ui

# Linter
npm run lint
```

## 🌟 Casos de Uso

- **Landing Pages** - Headers con arte ASCII llamativo
- **Portafolios de Desarrolladores** - Efectos estilo terminal
- **Sitios Retro** - Estética años 80/90
- **Proyectos Creativos** - Arte ASCII generativo
- **Juegos** - Interfaces de juegos retro
- **Dashboards** - Monitores estilo terminal
- **Presentaciones** - Slides con animaciones únicas
- **Arte Interactivo** - Instalaciones web creativas

## 🎯 Compatibilidad de Navegadores

| Navegador | Versión Mínima |
|-----------|---------------|
| Chrome    | 90+           |
| Firefox   | 88+           |
| Safari    | 14+           |
| Edge      | 90+           |

Requiere soporte ES2022+.

## 🏗️ Arquitectura

```
ascii-script/
├── src/
│   ├── index.js           # Punto de entrada principal
│   ├── presets.js         # Presets preconfigurados
│   ├── core/              # Motor central
│   │   ├── engine.js      # Loop de animación
│   │   ├── registry.js    # Registro de efectos
│   │   └── timing.js      # Sistema de timing
│   ├── effects/           # Efectos disponibles
│   │   ├── base-effect.js # Clase base para efectos
│   │   ├── ascii-art/     # Efectos para arte ASCII
│   │   ├── procedural/    # Efectos procedurales
│   │   └── text/          # Efectos de texto
│   └── render/            # Sistemas de renderizado
│       ├── base-instance.js
│       ├── canvas-grid.js
│       └── text-block.js
├── examples/              # Ejemplos de uso
├── tests/                 # Suite de tests
└── docs/                  # Documentación
```

## 🚀 Rendimiento

- **Bundle core**: ~5kb gzipped
- **Efectos**: 3-5kb cada uno (carga bajo demanda)
- **Target**: Renderizado a 60fps
- **Aceleración GPU**: Vía transformaciones CSS
- **Fallback automático**: Canvas para arte grande (>100 líneas)
- **Tree-shaking**: Importa solo lo que uses

## 📄 Licencia

MIT © 2026

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🙏 Créditos

Creado con ❤️ para la comunidad de arte ASCII.

---

<a name="english-version"></a>

# ASCII-SCRIPT

> Lightweight JavaScript library for ASCII art rendering and animation in the DOM

**English | [Español](#ascii-script)**

Framework-independent library for creating stunning ASCII art animations in the browser.

## ✨ Features

- 🎨 **Rich Effects** - Wave, color-cycle, glitch, scramble, typewriter, matrix rain, and more
- 🎭 **Ready-to-use Presets** - Pre-configured effect combinations (hologram, rainbow, terminal, decrypt)
- 📦 **Tiny Bundle** - ~5kb core + lazy-loaded effects (3-5kb each)
- ⚡ **60fps Performance** - GPU-accelerated via CSS transforms, canvas fallback for large art
- 🔌 **Framework-Agnostic** - Pure JavaScript, works with React, Vue, Svelte, or vanilla
- 🎯 **Auto-Detection** - Automatically detects and formats multi-line ASCII art
- 🌈 **Extensible** - Plugin system for custom effects
- 🎮 **Intuitive API** - Chainable methods and simple configuration
- 📱 **Responsive** - Adapts to different screen sizes
- 🚀 **Zero Dependencies** - No external dependencies

## 🚀 Quick Start

### Installation

```bash
npm install ascii-script
```

Or using CDN:

```html
<script type="module">
  import { create } from 'https://unpkg.com/ascii-script';
</script>
```

### Basic Usage

```javascript
import { create } from 'ascii-script';

// Initialize engine
const ascii = create();

// Create ASCII art instance
const logo = ascii.createArt('#my-logo');

// Apply effects
await logo.wave({ amplitude: 3 });
await logo.colorCycle();

// Start animation
logo.play();
```

### HTML

```html
<pre id="my-logo">
  █████╗ ███████╗ ██████╗██╗██╗
 ██╔══██╗██╔════╝██╔════╝██║██║
 ███████║███████╗██║     ██║██║
 ██╔══██║╚════██║██║     ██║██║
 ██║  ██║███████║╚██████╗██║██║
 ╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝╚═╝
</pre>
```

## 🎨 Available Effects

### ASCII Art Effects

Perfect for static ASCII art logos and banners:

- **Wave** - Sine wave displacement per line
- **Color Cycle** - Rainbow HSL color rotation
- **Pulse** - Breathing scale animation
- **Perspective** - 3D CSS transforms
- **Color Gradient** - Smooth color gradients

### Text Animation Effects

For dynamic text:

- **Scramble** - Random character replacement with progressive reveal
- **Reveal** - Sequential character unveiling
- **Glitch** - Digital corruption and offset
- **Typewriter** - Terminal typing effect
- **Matrix Rain** - Matrix-style falling characters

### Procedural Effects

Canvas-based backgrounds:

- **Noise** - Perlin-like noise generation
- **Scanlines** - CRT monitor effect
- **Particles** - ASCII character particles

## 🎭 Presets

Pre-configured effect combinations for quick use:

```javascript
// Hologram effect (glitch + pulse)
await logo.preset('hologram');

// Matrix effect (matrix rain + scanlines)
await text.preset('matrix');

// Decrypt animation (scramble → reveal)
await text.preset('decrypt');

// Rainbow wave (wave + color cycle)
await logo.preset('rainbow');

// Retro terminal (typewriter + scanlines)
await text.preset('terminal');
```

## 📖 Examples

### 🚀 Run Live Examples

To view interactive examples in your browser:

```bash
# 1. Clone or navigate to the project
cd ascii-script

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# The server will show you the URL (usually http://localhost:5173)
```

**Available Examples:**

- **Enhanced Terminal** - `examples/enhanced.html`
  - Complete interactive terminal with all effects
  - Real-time controls
  - Showcase of all presets

- **ASCII Art Showcase** - `examples/ascii-art/showcase.html`
  - Gallery of ASCII art effects
  - Animated logos and banners
  - Combined effects

### Code Examples

#### Animated Logo

```javascript
const ascii = create();
const logo = ascii.createArt('#logo');

await logo.preset('rainbow');
logo.play();
```

#### Typewriter Effect

```javascript
const text = ascii.createArt('#greeting');

await text.typewriter({ speed: 80 });
text.play();
```

#### Procedural Background

```javascript
const bg = ascii.createBackground('#bg', {
  cols: 80,
  rows: 40,
  charset: ' .:-=+*#%@'
});

bg.play();
```

#### Custom Effect Chain

```javascript
await art
  .scramble({ duration: 1000 })
  .then(() => art.reveal({ duration: 1500 }))
  .then(() => art.wave());

art.play();
```

#### Full Matrix Effect

```javascript
const ascii = create();

// Background with scanlines
const bg = ascii.createBackground('#bg', {
  cols: 100,
  rows: 40
});

// Text with matrix rain
const text = ascii.createArt('#matrix-text');
await text.preset('matrix');

// Play both
bg.play();
text.play();
```

#### Sequential Animation

```javascript
const ascii = create();
const logo = ascii.createArt('#logo');

// Effect sequence
async function animate() {
  await logo.scramble({ duration: 800 });
  await logo.reveal({ duration: 1200 });
  await logo.colorCycle();
  logo.play();
}

animate();
```

## 📚 Documentation

- [Complete API Reference](docs/api.md) - Detailed documentation of all APIs and methods
- **Live Examples** - Run `npm run dev` and open:
  - `examples/enhanced.html` - Complete interactive terminal
  - `examples/ascii-art/showcase.html` - Effects gallery
- Custom Effects Guide - See "Advanced Usage" section in [docs/api.md](docs/api.md)

## 🛠️ Development

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Run tests
npm test

# Tests with UI
npm run test:ui

# Linter
npm run lint
```

## 🌟 Use Cases

- **Landing Pages** - Eye-catching ASCII art headers
- **Developer Portfolios** - Terminal-style effects
- **Retro Websites** - 80s/90s aesthetic
- **Creative Projects** - Generative ASCII art
- **Games** - Retro game UIs
- **Dashboards** - Terminal-style monitors
- **Presentations** - Slides with unique animations
- **Interactive Art** - Creative web installations

## 🎯 Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome  | 90+            |
| Firefox | 88+            |
| Safari  | 14+            |
| Edge    | 90+            |

Requires ES2022+ support.

## 🏗️ Architecture

```
ascii-script/
├── src/
│   ├── index.js           # Main entry point
│   ├── presets.js         # Pre-configured presets
│   ├── core/              # Core engine
│   │   ├── engine.js      # Animation loop
│   │   ├── registry.js    # Effect registry
│   │   └── timing.js      # Timing system
│   ├── effects/           # Available effects
│   │   ├── base-effect.js # Base effect class
│   │   ├── ascii-art/     # ASCII art effects
│   │   ├── procedural/    # Procedural effects
│   │   └── text/          # Text effects
│   └── render/            # Rendering systems
│       ├── base-instance.js
│       ├── canvas-grid.js
│       └── text-block.js
├── examples/              # Usage examples
├── tests/                 # Test suite
└── docs/                  # Documentation
```

## 🚀 Performance

- **Core bundle**: ~5kb gzipped
- **Effects**: 3-5kb each (lazy loaded)
- **Target**: 60fps rendering
- **GPU Acceleration**: Via CSS transforms
- **Automatic fallback**: Canvas for large art (>100 lines)
- **Tree-shaking**: Import only what you use

## 📄 License

MIT © 2026

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add: AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Credits

Created with ❤️ for the ASCII art community.
