# ASCII-SCRIPT - Documentación API

**[English](#english-api-documentation) | Español**

## Tabla de Contenidos

- [Instalación](#instalación)
- [Inicio Rápido](#inicio-rápido)
- [API Core](#api-core)
- [API TextBlock](#api-textblock)
- [API CanvasGrid](#api-canvasgrid)
- [Efectos Disponibles](#efectos-disponibles)
- [Presets](#presets)
- [Eventos](#eventos)
- [Uso Avanzado](#uso-avanzado)

## Instalación

```bash
npm install ascii-script
```

O usando CDN:

```html
<script type="module">
  import { create } from 'https://unpkg.com/ascii-script';
</script>
```

## Inicio Rápido

```javascript
import { create } from 'ascii-script';

// Inicializar motor
const ascii = create();

// Crear instancia de arte ASCII
const logo = ascii.createArt('#my-logo');

// Aplicar efectos
await logo.wave();
await logo.colorCycle();

// Iniciar animación
logo.play();
```

## API Core

### `create(config)`

Crea una nueva instancia de ASCII-SCRIPT.

**Parámetros:**
- `config.autoStart` (boolean) - Auto-iniciar el motor (por defecto: true)

**Retorna:** Instancia AsciiFX

```javascript
const ascii = create({ autoStart: false });
ascii.start(); // Inicio manual
```

### `createArt(selector, config)`

Crea un bloque de texto de arte ASCII.

**Parámetros:**
- `selector` (string|HTMLElement) - Selector del elemento o elemento
- `config.renderMode` ('auto'|'dom'|'canvas') - Modo de renderizado
- `config.threshold` (number) - Umbral de líneas para modo canvas (por defecto: 100)

**Retorna:** TextBlockAPI

```javascript
const art = ascii.createArt('#logo', {
  renderMode: 'auto',
  threshold: 100
});
```

### `createBackground(selector, config)`

Crea un fondo canvas procedural.

**Parámetros:**
- `selector` (string|HTMLElement) - Selector del elemento
- `config.cols` (number) - Columnas de la cuadrícula
- `config.rows` (number) - Filas de la cuadrícula
- `config.charset` (string) - Set de caracteres para mapeo de densidad
- `config.generator` (function) - Función generadora personalizada

**Retorna:** CanvasGridAPI

```javascript
const bg = ascii.createBackground('#bg', {
  cols: 80,
  rows: 40,
  charset: ' .:-=+*#%@',
  generator: (x, y, time) => Math.random()
});
```

## API TextBlock

### Métodos de Control

#### `play()`

Inicia la animación.

```javascript
art.play();
```

#### `pause()`

Pausa la animación.

```javascript
art.pause();
```

#### `stop()`

Detiene y reinicia la animación.

```javascript
art.stop();
```

### Efectos

Todos los métodos de efectos soportan encadenamiento:

```javascript
art.wave().colorCycle().pulse().play();
```

## Efectos Disponibles

### Efectos de Arte ASCII

#### `wave(config)`

Efecto de desplazamiento en onda sinusoidal.

**Parámetros:**
```javascript
await art.wave({
  amplitude: 2,      // Cantidad de desplazamiento
  frequency: 0.5,    // Frecuencia de la onda
  speed: 0.001,      // Velocidad de animación
  easing: 'linear'   // Función de suavizado
});
```

#### `colorCycle(config)`

Rotación de color HSL por carácter.

**Parámetros:**
```javascript
await art.colorCycle({
  speed: 0.001,      // Velocidad de rotación
  spread: 10,        // Dispersión de color
  saturation: 70,    // Saturación HSL %
  lightness: 50      // Luminosidad HSL %
});
```

#### `pulse(config)`

Animación de escala respiratoria.

**Parámetros:**
```javascript
await art.pulse({
  minScale: 0.95,
  maxScale: 1.05,
  speed: 0.002,
  easing: 'easeInOutQuad'
});
```

#### `perspective(config)`

Efecto de transformación CSS 3D.

**Parámetros:**
```javascript
await art.perspective({
  rotateX: 15,       // Rotación eje X
  rotateY: 20,       // Rotación eje Y
  rotateZ: 0,        // Rotación eje Z
  perspective: 1000, // Distancia de perspectiva
  speed: 0.001
});
```

#### `colorGradient(config)`

Degradado de color suave.

**Parámetros:**
```javascript
await art.colorGradient({
  colors: ['#ff0000', '#00ff00', '#0000ff'],
  direction: 'horizontal', // 'horizontal' | 'vertical' | 'diagonal'
  speed: 0.001
});
```

### Efectos de Texto

#### `scramble(config)`

Reemplazo aleatorio de caracteres con revelado.

**Parámetros:**
```javascript
await art.scramble({
  duration: 1000,
  charset: '!@#$%^&*',
  revealMode: 'progressive', // o 'random'
  easing: 'easeOutQuad'
});
```

#### `reveal(config)`

Revelación secuencial de caracteres.

**Parámetros:**
```javascript
await art.reveal({
  duration: 1500,
  placeholder: '█',
  easing: 'easeOutCubic'
});
```

#### `glitch(config)`

Efecto de corrupción/glitch digital.

**Parámetros:**
```javascript
await art.glitch({
  intensity: 0.1,    // Probabilidad de glitch
  speed: 0.05,
  offsetRange: 5,    // Desplazamiento máximo
  corruptChars: '▓▒░█'
});
```

#### `typewriter(config)`

Animación de escritura de terminal.

**Parámetros:**
```javascript
await art.typewriter({
  speed: 50,         // ms por carácter
  cursor: '|',
  showCursor: true,
  blinkSpeed: 500
});
```

#### `matrix(config)`

Caracteres cayendo estilo Matrix.

**Parámetros:**
```javascript
await art.matrix({
  charset: 'ABCDEF0123456789',
  speed: 0.05,
  density: 0.05
});
```

### Efectos Procedurales (Canvas)

#### `noise(config)`

Generación de ruido tipo Perlin.

**Parámetros:**
```javascript
await bg.noise({
  scale: 0.1,
  speed: 0.001,
  octaves: 4
});
```

#### `scanlines(config)`

Efecto de líneas de escaneo CRT.

**Parámetros:**
```javascript
await bg.scanlines({
  lineHeight: 2,
  opacity: 0.1,
  speed: 0.5
});
```

#### `particles(config)`

Sistema de partículas de caracteres ASCII.

**Parámetros:**
```javascript
await bg.particles({
  count: 100,
  charset: '·•*+#@',
  speed: 1,
  gravity: 0.1
});
```

## Presets

Combinaciones preconfiguradas de efectos.

### `preset(name, config)`

Aplicar preset por nombre.

**Parámetros:**
- `name` (string) - Nombre del preset
- `config` (object) - Configuración opcional para sobrescribir valores por defecto

```javascript
await art.preset('hologram');
await art.preset('matrix');
await art.preset('decrypt');
await art.preset('rainbow');
await art.preset('terminal');
```

**Presets Disponibles:**

| Preset      | Efectos                    | Descripción                          |
|-------------|----------------------------|--------------------------------------|
| `hologram`  | Glitch + Pulse             | Efecto holográfico                   |
| `matrix`    | Matrix Rain + Scanlines    | Estilo Matrix clásico                |
| `decrypt`   | Scramble → Reveal          | Animación de desencriptado           |
| `rainbow`   | Wave + Color Cycle         | Onda arcoíris                        |
| `terminal`  | Typewriter + Scanlines     | Terminal retro                       |


## Eventos

### `on(event, callback)`

Registrar un listener de eventos.

**Eventos Disponibles:**
- `start` - Animación iniciada
- `pause` - Animación pausada
- `stop` - Animación detenida
- `complete` - Animación completada
- `effectStart` - Un efecto comenzó
- `effectEnd` - Un efecto terminó

```javascript
art.on('start', () => console.log('¡Iniciado!'));
art.on('complete', () => console.log('¡Completado!'));
art.on('effectStart', (effect) => console.log(`Efecto ${effect.name} iniciado`));
```

### `off(event, callback)`

Remover un listener de eventos.

```javascript
const handler = () => console.log('Completado');
art.on('complete', handler);
art.off('complete', handler);
```

### `once(event, callback)`

Registrar un listener que se ejecuta solo una vez.

```javascript
art.once('complete', () => console.log('Primera vez completado'));
```

## API CanvasGrid

### `setGenerator(fn)`

Establecer función generadora personalizada.

**Parámetros:**
- `fn(x, y, time)` - Función que retorna un valor de densidad (0-1)
  - `x` - Coordenada X de la celda
  - `y` - Coordenada Y de la celda
  - `time` - Tiempo transcurrido en ms

```javascript
bg.setGenerator((x, y, time) => {
  return Math.sin(x * 0.1 + time * 0.001) * 
         Math.cos(y * 0.1 + time * 0.001);
});
```

### `setCharset(chars)`

Actualizar set de caracteres.

**Parámetros:**
- `chars` (string) - Set de caracteres ordenados por densidad (más claro a más oscuro)

```javascript
bg.setCharset('·•*+#@');
bg.setCharset(' .:-=+*#%@');
```

### `resize(cols, rows)`

Redimensionar la cuadrícula.

```javascript
bg.resize(100, 50);
```

### `clear()`

Limpiar el canvas.

```javascript
bg.clear();
```

## Uso Avanzado

### Efectos Personalizados

Crear efectos personalizados extendiendo `BaseEffect`:

```javascript
import { BaseEffect } from 'ascii-script/effects/base-effect';

class RainbowEffect extends BaseEffect {
  constructor(config = {}) {
    super(config);
    this.speed = config.speed || 0.001;
  }

  render(text, elapsed, context) {
    const hue = (elapsed * this.speed) % 360;
    
    return text.split('\n').map(line => {
      return `<span style="color: hsl(${hue}, 70%, 50%)">${line}</span>`;
    }).join('\n');
  }
}

// Usar efecto personalizado
await art.useEffect(new RainbowEffect({ speed: 0.002 }));
```

### Importaciones Dinámicas

Los efectos se cargan bajo demanda para optimizar el bundle:

```javascript
// Solo carga scramble.js cuando se llama
await art.scramble();

// Precargar efectos si es necesario
import('ascii-script/effects/text/scramble');
```

### Composición de Efectos

```javascript
// Aplicar múltiples efectos secuencialmente
await art.scramble({ duration: 800 });
await art.reveal({ duration: 1200 });

// O en paralelo (si son compatibles)
Promise.all([
  art.wave(),
  art.colorCycle()
]).then(() => art.play());
```

### Control de Renderizado

```javascript
// Forzar modo de renderizado
const art = ascii.createArt('#logo', {
  renderMode: 'canvas', // 'dom' | 'canvas' | 'auto'
  threshold: 50         // Cambiar a canvas si >50 líneas
});

// Verificar modo actual
console.log(art.getRenderMode()); // 'dom' o 'canvas'
```

### Múltiples Instancias

```javascript
const ascii = create();

// Crear múltiples instancias
const logo = ascii.createArt('#logo');
const subtitle = ascii.createArt('#subtitle');
const bg = ascii.createBackground('#bg');

// Animaciones independientes
await logo.preset('rainbow');
await subtitle.typewriter({ speed: 80 });

logo.play();
subtitle.play();
bg.play();
```

### Encadenamiento de Promesas

```javascript
// Esperar a que termine un efecto antes del siguiente
await art.scramble({ duration: 1000 });
await art.reveal({ duration: 1500 });
await art.wave();

art.play();

// O usar then chaining
art.scramble({ duration: 1000 })
  .then(() => art.reveal({ duration: 1500 }))
  .then(() => art.wave())
  .then(() => art.play());
```

### Manejo de Estados

```javascript
// Obtener estado actual
console.log(art.isPlaying());  // true/false
console.log(art.isPaused());   // true/false

// Alternar reproducción
if (art.isPlaying()) {
  art.pause();
} else {
  art.play();
}
```

### Limpieza y Destrucción

```javascript
// Detener y limpiar
art.stop();
art.destroy(); // Remueve listeners y libera recursos

// Destruir instancia del motor
ascii.destroy(); // Limpia todas las instancias
```

## Rendimiento

### Optimizaciones

- **Lazy Loading**: Efectos se cargan solo cuando se usan
- **GPU Acceleration**: Transformaciones CSS aceleradas por GPU
- **Canvas Fallback**: Cambio automático a canvas para arte grande
- **requestAnimationFrame**: Loop de animación optimizado
- **Tree Shaking**: Solo importa lo que uses

### Tips de Rendimiento

```javascript
// 1. Usar renderMode apropiado
const art = ascii.createArt('#logo', {
  renderMode: 'dom'    // Más rápido para arte pequeño (<100 líneas)
});

// 2. Limitar efectos simultáneos
await art.wave();      // Esperar a que termine
await art.colorCycle(); // Luego aplicar el siguiente

// 3. Ajustar threshold
const ascii = create({ threshold: 50 }); // Canvas para >50 líneas

// 4. Usar presets optimizados
await art.preset('rainbow'); // Combinación optimizada de efectos
```

## Compatibilidad

### Navegadores Soportados

| Navegador | Versión Mínima | Notas                          |
|-----------|---------------|--------------------------------|
| Chrome    | 90+           | Soporte completo               |
| Firefox   | 88+           | Soporte completo               |
| Safari    | 14+           | Requiere prefijos CSS en <14.1 |
| Edge      | 90+           | Soporte completo               |

### Características Requeridas

- ES2022+ (Modules, async/await, optional chaining)
- requestAnimationFrame
- Canvas API
- CSS Transforms
- CSS Custom Properties

## Solución de Problemas

### Error: "Effect not found"

```javascript
// Asegúrate de await el efecto
await art.wave(); // ✓ Correcto
art.wave();       // ✗ Incorrecto
```

### Animación lenta o entrecortada

```javascript
// Reducir complejidad o usar canvas
const art = ascii.createArt('#logo', {
  renderMode: 'canvas',
  threshold: 50
});
```

### Efectos no visibles

```javascript
// Asegúrate de llamar play()
await art.wave();
art.play(); // ← No olvidar esto
```

---

<a name="english-api-documentation"></a>

# ASCII-SCRIPT - API Documentation

**English | [Español](#ascii-script---documentación-api)**

## Table of Contents

- [Installation](#installation-en)
- [Quick Start](#quick-start-en)
- [Core API](#core-api-en)
- [TextBlock API](#textblock-api-en)
- [CanvasGrid API](#canvasgrid-api-en)
- [Available Effects](#available-effects-en)
- [Presets](#presets-en)
- [Events](#events-en)
- [Advanced Usage](#advanced-usage-en)

<a name="installation-en"></a>
## Installation

```bash
npm install ascii-script
```

Or using CDN:

```html
<script type="module">
  import { create } from 'https://unpkg.com/ascii-script';
</script>
```

<a name="quick-start-en"></a>
## Quick Start

```javascript
import { create } from 'ascii-script';

// Initialize engine
const ascii = create();

// Create ASCII art instance
const logo = ascii.createArt('#my-logo');

// Apply effects
await logo.wave();
await logo.colorCycle();

// Start animation
logo.play();
```

<a name="core-api-en"></a>
## Core API

### `create(config)`

Create a new ASCII-SCRIPT instance.

**Parameters:**
- `config.autoStart` (boolean) - Auto-start engine (default: true)

**Returns:** AsciiFX instance

```javascript
const ascii = create({ autoStart: false });
ascii.start(); // Manual start
```

### `createArt(selector, config)`

Create an ASCII art text block.

**Parameters:**
- `selector` (string|HTMLElement) - Element selector or element
- `config.renderMode` ('auto'|'dom'|'canvas') - Rendering mode
- `config.threshold` (number) - Line threshold for canvas mode (default: 100)

**Returns:** TextBlockAPI

```javascript
const art = ascii.createArt('#logo', {
  renderMode: 'auto',
  threshold: 100
});
```

### `createBackground(selector, config)`

Create a procedural canvas background.

**Parameters:**
- `selector` (string|HTMLElement) - Element selector
- `config.cols` (number) - Grid columns
- `config.rows` (number) - Grid rows
- `config.charset` (string) - Character set for density mapping
- `config.generator` (function) - Custom generator function

**Returns:** CanvasGridAPI

```javascript
const bg = ascii.createBackground('#bg', {
  cols: 80,
  rows: 40,
  charset: ' .:-=+*#%@',
  generator: (x, y, time) => Math.random()
});
```

<a name="textblock-api-en"></a>
## TextBlock API

### Control Methods

#### `play()`

Start animation.

```javascript
art.play();
```

#### `pause()`

Pause animation.

```javascript
art.pause();
```

#### `stop()`

Stop and reset animation.

```javascript
art.stop();
```

### Effects

All effect methods support chaining:

```javascript
art.wave().colorCycle().pulse().play();
```

<a name="available-effects-en"></a>
## Available Effects

### ASCII Art Effects

#### `wave(config)`

Sine wave displacement effect.

**Parameters:**
```javascript
await art.wave({
  amplitude: 2,      // Displacement amount
  frequency: 0.5,    // Wave frequency
  speed: 0.001,      // Animation speed
  easing: 'linear'   // Easing function
});
```

#### `colorCycle(config)`

HSL color rotation per character.

**Parameters:**
```javascript
await art.colorCycle({
  speed: 0.001,      // Rotation speed
  spread: 10,        // Color spread
  saturation: 70,    // HSL saturation %
  lightness: 50      // HSL lightness %
});
```

#### `pulse(config)`

Breathing scale animation.

**Parameters:**
```javascript
await art.pulse({
  minScale: 0.95,
  maxScale: 1.05,
  speed: 0.002,
  easing: 'easeInOutQuad'
});
```

#### `perspective(config)`

3D CSS transform effect.

**Parameters:**
```javascript
await art.perspective({
  rotateX: 15,       // X-axis rotation
  rotateY: 20,       // Y-axis rotation
  rotateZ: 0,        // Z-axis rotation
  perspective: 1000, // Perspective distance
  speed: 0.001
});
```

#### `colorGradient(config)`

Smooth color gradient effect.

**Parameters:**
```javascript
await art.colorGradient({
  colors: ['#ff0000', '#00ff00', '#0000ff'],
  direction: 'horizontal', // 'horizontal' | 'vertical' | 'diagonal'
  speed: 0.001
});
```

### Text Effects

#### `scramble(config)`

Random character replacement with reveal.

**Parameters:**
```javascript
await art.scramble({
  duration: 1000,
  charset: '!@#$%^&*',
  revealMode: 'progressive', // or 'random'
  easing: 'easeOutQuad'
});
```

#### `reveal(config)`

Sequential character unveiling.

**Parameters:**
```javascript
await art.reveal({
  duration: 1500,
  placeholder: '█',
  easing: 'easeOutCubic'
});
```

#### `glitch(config)`

Digital glitch/corruption effect.

**Parameters:**
```javascript
await art.glitch({
  intensity: 0.1,    // Glitch probability
  speed: 0.05,
  offsetRange: 5,    // Max position offset
  corruptChars: '▓▒░█'
});
```

#### `typewriter(config)`

Terminal typing animation.

**Parameters:**
```javascript
await art.typewriter({
  speed: 50,         // ms per character
  cursor: '|',
  showCursor: true,
  blinkSpeed: 500
});
```

#### `matrix(config)`

Matrix-style falling characters.

**Parameters:**
```javascript
await art.matrix({
  charset: 'ABCDEF0123456789',
  speed: 0.05,
  density: 0.05
});
```

### Procedural Effects (Canvas)

#### `noise(config)`

Perlin-like noise generation.

**Parameters:**
```javascript
await bg.noise({
  scale: 0.1,
  speed: 0.001,
  octaves: 4
});
```

#### `scanlines(config)`

CRT scanline effect.

**Parameters:**
```javascript
await bg.scanlines({
  lineHeight: 2,
  opacity: 0.1,
  speed: 0.5
});
```

#### `particles(config)`

ASCII character particle system.

**Parameters:**
```javascript
await bg.particles({
  count: 100,
  charset: '·•*+#@',
  speed: 1,
  gravity: 0.1
});
```

<a name="presets-en"></a>
## Presets

Pre-configured effect combinations.

### `preset(name, config)`

Apply preset by name.

**Parameters:**
- `name` (string) - Preset name
- `config` (object) - Optional configuration to override defaults

```javascript
await art.preset('hologram');
await art.preset('matrix');
await art.preset('decrypt');
await art.preset('rainbow');
await art.preset('terminal');
```

**Available Presets:**

| Preset      | Effects                    | Description                          |
|-------------|----------------------------|--------------------------------------|
| `hologram`  | Glitch + Pulse             | Holographic effect                   |
| `matrix`    | Matrix Rain + Scanlines    | Classic Matrix style                 |
| `decrypt`   | Scramble → Reveal          | Decryption animation                 |
| `rainbow`   | Wave + Color Cycle         | Rainbow wave                         |
| `terminal`  | Typewriter + Scanlines     | Retro terminal                       |

**Custom Preset Configuration:**

```javascript
// Preset with custom config
await art.preset('rainbow', {
  wave: { amplitude: 5, frequency: 0.8 },
  colorCycle: { speed: 0.002 }
});
```

<a name="events-en"></a>
## Events

### `on(event, callback)`

Register an event listener.

**Available Events:**
- `start` - Animation started
- `pause` - Animation paused
- `stop` - Animation stopped
- `complete` - Animation completed
- `effectStart` - An effect started
- `effectEnd` - An effect ended

```javascript
art.on('start', () => console.log('Started!'));
art.on('complete', () => console.log('Completed!'));
art.on('effectStart', (effect) => console.log(`Effect ${effect.name} started`));
```

### `off(event, callback)`

Remove an event listener.

```javascript
const handler = () => console.log('Completed');
art.on('complete', handler);
art.off('complete', handler);
```

### `once(event, callback)`

Register a listener that runs only once.

```javascript
art.once('complete', () => console.log('First time completed'));
```

<a name="canvasgrid-api-en"></a>
## CanvasGrid API

### `setGenerator(fn)`

Set custom generator function.

**Parameters:**
- `fn(x, y, time)` - Function that returns a density value (0-1)
  - `x` - Cell X coordinate
  - `y` - Cell Y coordinate
  - `time` - Elapsed time in ms

```javascript
bg.setGenerator((x, y, time) => {
  return Math.sin(x * 0.1 + time * 0.001) * 
         Math.cos(y * 0.1 + time * 0.001);
});
```

### `setCharset(chars)`

Update character set.

**Parameters:**
- `chars` (string) - Character set ordered by density (lightest to darkest)

```javascript
bg.setCharset('·•*+#@');
bg.setCharset(' .:-=+*#%@');
```

### `resize(cols, rows)`

Resize the grid.

```javascript
bg.resize(100, 50);
```

### `clear()`

Clear the canvas.

```javascript
bg.clear();
```

<a name="advanced-usage-en"></a>
## Advanced Usage

### Custom Effects

Create custom effects by extending `BaseEffect`:

```javascript
import { BaseEffect } from 'ascii-script/effects/base-effect';

class RainbowEffect extends BaseEffect {
  constructor(config = {}) {
    super(config);
    this.speed = config.speed || 0.001;
  }

  render(text, elapsed, context) {
    const hue = (elapsed * this.speed) % 360;
    
    return text.split('\n').map(line => {
      return `<span style="color: hsl(${hue}, 70%, 50%)">${line}</span>`;
    }).join('\n');
  }
}

// Use custom effect
await art.useEffect(new RainbowEffect({ speed: 0.002 }));
```

### Dynamic Imports

Effects are lazy-loaded to optimize bundle size:

```javascript
// Only loads scramble.js when called
await art.scramble();

// Preload effects if needed
import('ascii-script/effects/text/scramble');
```

### Effect Composition

```javascript
// Apply multiple effects sequentially
await art.scramble({ duration: 800 });
await art.reveal({ duration: 1200 });

// Or in parallel (if compatible)
Promise.all([
  art.wave(),
  art.colorCycle()
]).then(() => art.play());
```

### Rendering Control

```javascript
// Force rendering mode
const art = ascii.createArt('#logo', {
  renderMode: 'canvas', // 'dom' | 'canvas' | 'auto'
  threshold: 50         // Switch to canvas if >50 lines
});

// Check current mode
console.log(art.getRenderMode()); // 'dom' or 'canvas'
```

### Multiple Instances

```javascript
const ascii = create();

// Create multiple instances
const logo = ascii.createArt('#logo');
const subtitle = ascii.createArt('#subtitle');
const bg = ascii.createBackground('#bg');

// Independent animations
await logo.preset('rainbow');
await subtitle.typewriter({ speed: 80 });

logo.play();
subtitle.play();
bg.play();
```

### Promise Chaining

```javascript
// Wait for one effect to finish before the next
await art.scramble({ duration: 1000 });
await art.reveal({ duration: 1500 });
await art.wave();

art.play();

// Or use then chaining
art.scramble({ duration: 1000 })
  .then(() => art.reveal({ duration: 1500 }))
  .then(() => art.wave())
  .then(() => art.play());
```

### State Management

```javascript
// Get current state
console.log(art.isPlaying());  // true/false
console.log(art.isPaused());   // true/false

// Toggle playback
if (art.isPlaying()) {
  art.pause();
} else {
  art.play();
}
```

### Cleanup and Destruction

```javascript
// Stop and cleanup
art.stop();
art.destroy(); // Removes listeners and frees resources

// Destroy engine instance
ascii.destroy(); // Cleans up all instances
```

## Performance

### Optimizations

- **Lazy Loading**: Effects load only when used
- **GPU Acceleration**: CSS transforms accelerated by GPU
- **Canvas Fallback**: Automatic switch to canvas for large art
- **requestAnimationFrame**: Optimized animation loop
- **Tree Shaking**: Only import what you use

### Performance Tips

```javascript
// 1. Use appropriate renderMode
const art = ascii.createArt('#logo', {
  renderMode: 'dom'    // Faster for small art (<100 lines)
});

// 2. Limit simultaneous effects
await art.wave();      // Wait to finish
await art.colorCycle(); // Then apply next

// 3. Adjust threshold
const ascii = create({ threshold: 50 }); // Canvas for >50 lines

// 4. Use optimized presets
await art.preset('rainbow'); // Optimized effect combination
```

## Compatibility

### Supported Browsers

| Browser | Minimum Version | Notes                      |
|---------|----------------|----------------------------|
| Chrome  | 90+            | Full support               |
| Firefox | 88+            | Full support               |
| Safari  | 14+            | Requires CSS prefixes <14.1|
| Edge    | 90+            | Full support               |

### Required Features

- ES2022+ (Modules, async/await, optional chaining)
- requestAnimationFrame
- Canvas API
- CSS Transforms
- CSS Custom Properties

## Troubleshooting

### Error: "Effect not found"

```javascript
// Make sure to await the effect
await art.wave(); // ✓ Correct
art.wave();       // ✗ Incorrect
```

### Slow or stuttering animation

```javascript
// Reduce complexity or use canvas
const art = ascii.createArt('#logo', {
  renderMode: 'canvas',
  threshold: 50
});
```

### Effects not visible

```javascript
// Make sure to call play()
await art.wave();
art.play(); // ← Don't forget this
```
