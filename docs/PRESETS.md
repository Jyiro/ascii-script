# Presets Guide - ASCII-SCRIPT

**[English](#english-presets-guide) | Español**

Guía completa de todos los presets disponibles en ASCII-SCRIPT.

## ⚠️ Presets Disponibles (Lista Completa)

**IMPORTANTE:** Solo existen estos 5 presets. No inventes nombres nuevos.

## Tabla de Contenidos

- [rainbow](#preset-rainbow)
- [hologram](#preset-hologram)
- [matrix](#preset-matrix)
- [terminal](#preset-terminal)
- [decrypt](#preset-decrypt)
- [Crear Combinaciones Personalizadas](#crear-combinaciones-personalizadas)

---

## Preset: `rainbow`

**Descripción:** Onda arcoíris animada con rotación de colores HSL.

**Efectos Incluidos:**
- `wave()` - Desplazamiento en onda sinusoidal
- `colorCycle()` - Rotación de color tipo arcoíris

**Ideal Para:**
- Logos animados
- Headers llamativos
- Arte ASCII con movimiento y color

### Uso Básico

```javascript
import { create } from '@jyiro/ascii-script';

const ascii = create();
const logo = ascii.createArt('#logo');

// Aplicar preset rainbow
await logo.preset('rainbow');
logo.play();
```

### Configuración por Defecto

```javascript
// Internamente hace esto:
await logo.wave({
  amplitude: 3,
  frequency: 0.8,
  speed: 0.001
});

await logo.colorCycle({
  speed: 0.002,
  spread: 5
});
```

### Personalizar Efectos Individuales

Si quieres ajustar parámetros específicos, aplica los efectos manualmente:

```javascript
// Rainbow personalizado
await logo.wave({
  amplitude: 5,      // Onda más pronunciada
  frequency: 1.2,    // Más frecuente
  speed: 0.002       // Más rápido
});

await logo.colorCycle({
  speed: 0.003,      // Cambio de color más rápido
  spread: 10         // Más variación de color
});

logo.play();
```

### Casos de Uso

```javascript
// Hero animado en landing page
const heroText = ascii.createArt('#hero-ascii');
await heroText.preset('rainbow');
heroText.play();

// Logo en header
const logo = ascii.createArt('#brand-logo');
await logo.preset('rainbow');
logo.play();
```

---

## Preset: `hologram`

**Descripción:** Efecto holográfico futurista con glitch y pulsación.

**Efectos Incluidos:**
- `glitch()` - Corrupción digital y desplazamiento
- `pulse()` - Animación de escala respiratoria

**Ideal Para:**
- Efectos futuristas
- Interfaces sci-fi
- Proyectos cyberpunk
- Arte ASCII con estética tecnológica

### Uso Básico

```javascript
const ascii = create();
const logo = ascii.createArt('#logo');

// Aplicar preset hologram
await logo.preset('hologram');
logo.play();
```

### Configuración por Defecto

```javascript
// Internamente hace esto:
await logo.glitch({
  intensity: 0.15,
  speed: 0.1
});

await logo.pulse({
  scale: 0.05,
  speed: 0.002
});
```

### Personalizar

```javascript
// Hologram más intenso
await logo.glitch({
  intensity: 0.3,    // Más glitch
  speed: 0.2         // Más rápido
});

await logo.pulse({
  scale: 0.1,        // Pulsación más visible
  speed: 0.003       // Más rápido
});

logo.play();
```

### Casos de Uso

```javascript
// Interfaz futurista
const terminal = ascii.createArt('#terminal-output');
await terminal.preset('hologram');
terminal.play();

// Logo sci-fi
const brandLogo = ascii.createArt('#brand');
await brandLogo.preset('hologram');
brandLogo.play();
```

---

## Preset: `matrix`

**Descripción:** Efecto Matrix con caracteres cayendo y scanlines estilo CRT.

**Efectos Incluidos:**
- `matrixRain()` - Caracteres cayendo estilo Matrix
- `scanlines` (background) - Líneas de escaneo CRT

**Ideal Para:**
- Estética Matrix/Cyberpunk
- Fondos animados
- Efectos de terminal retro
- Proyectos de hacking/tech

### Uso Básico

```javascript
const ascii = create();
const text = ascii.createArt('#matrix-text');

// Aplicar preset matrix
await text.preset('matrix');
text.play();
```

### Configuración por Defecto

```javascript
// Internamente hace esto:
await text.matrixRain({
  speed: 0.05,
  density: 0.1,
  charset: 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾨﾗﾘﾙﾚﾛﾜﾝ'
});
```

### Personalizar

```javascript
// Matrix más denso
await text.matrixRain({
  speed: 0.08,       // Cae más rápido
  density: 0.2,      // Más caracteres
  charset: '0123456789ABCDEF' // Caracteres hexadecimales
});

text.play();
```

### Con Fondo Procedural

```javascript
// Matrix completo con fondo
const ascii = create();

// Fondo con scanlines
const bg = ascii.createBackground('#bg', {
  cols: 100,
  rows: 40,
  charset: ' ░▒▓█'
});

// Texto con matrix rain
const text = ascii.createArt('#matrix-text');
await text.preset('matrix');

// Reproducir ambos
bg.play();
text.play();
```

### Casos de Uso

```javascript
// Pantalla de carga estilo Matrix
const loadingScreen = ascii.createArt('#loading');
await loadingScreen.preset('matrix');
loadingScreen.play();

// Fondo animado de página
const pageBg = ascii.createBackground('#page-bg', {
  cols: 120,
  rows: 50
});
// Aplicar generador de matrix rain al fondo
pageBg.play();
```

---

## Preset: `terminal`

**Descripción:** Efecto de terminal retro con escritura tipo máquina de escribir.

**Efectos Incluidos:**
- `typewriter()` - Efecto de escritura carácter por carácter
- `scanlines` (opcional) - Líneas de escaneo CRT

**Ideal Para:**
- Texto estilo terminal
- Animaciones de comandos
- Interfaces retro
- Efectos de consola

### Uso Básico

```javascript
const ascii = create();
const text = ascii.createArt('#terminal-text');

// Aplicar preset terminal
await text.preset('terminal');
text.play();
```

### Configuración por Defecto

```javascript
// Internamente hace esto:
await text.typewriter({
  speed: 80,        // Milisegundos por carácter
  cursor: true      // Mostrar cursor parpadeante
});
```

### Personalizar

```javascript
// Terminal más rápido
await text.typewriter({
  speed: 40,        // Más rápido
  cursor: true,
  cursorChar: '█'   // Cursor personalizado
});

text.play();
```

### Con Fondo Scanlines

```javascript
// Terminal retro completo
const ascii = create();

// Fondo con scanlines
const bg = ascii.createBackground('#terminal-bg', {
  cols: 80,
  rows: 30
});
bg.setGenerator((x, y, time) => {
  // Scanlines
  const t = time * 0.002 * 4;
  const scanline = Math.sin((y * 0.1 * 10 + t * 10) * Math.PI * 2) * 0.5 + 0.5;
  const fade = Math.sin(x * 0.1 + t) * 0.2 + 0.3;
  return scanline * fade;
});
bg.play();

// Texto con typewriter
const text = ascii.createArt('#terminal-text');
await text.preset('terminal');
text.play();
```

### Casos de Uso

```javascript
// Comando de terminal animado
const command = ascii.createArt('#command');
await command.preset('terminal');
command.play();

// Mensaje de bienvenida
const greeting = ascii.createArt('#greeting');
await greeting.typewriter({ speed: 60 });
greeting.play();
```

---

## Preset: `decrypt`

**Descripción:** Animación de desencriptado con scramble inicial y revelación progresiva.

**Efectos Incluidos:**
- `scramble()` - Caracteres aleatorios en desorden
- `reveal()` - Revelación progresiva del texto real

**Ideal Para:**
- Animaciones de descifrado
- Efectos de "hacking"
- Revelación dramática de texto
- Transiciones únicas

### Uso Básico

```javascript
const ascii = create();
const text = ascii.createArt('#secret-text');

// Aplicar preset decrypt
await text.preset('decrypt');
text.play();
```

### Configuración por Defecto

```javascript
// Internamente hace esto:
await text.scramble({
  duration: 1000,   // 1 segundo de scramble
  charset: '!@#$%^&*()_+-=[]{}|;:,.<>?'
});

// Luego revela
await text.reveal({
  duration: 1500,   // 1.5 segundos de revelación
  direction: 'left-to-right'
});
```

### Personalizar

```javascript
// Decrypt más dramático
await text.scramble({
  duration: 1500,   // Más tiempo scrambleado
  charset: '01'     // Solo binario
});

await text.reveal({
  duration: 2000,   // Revelación más lenta
  direction: 'center-out' // Revelar desde el centro
});

text.play();
```

### Secuencia Controlada

```javascript
// Control manual de la secuencia
const ascii = create();
const text = ascii.createArt('#message');

async function decrypt() {
  // Fase 1: Scramble
  await text.scramble({ duration: 800 });
  
  // Pequeña pausa
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Fase 2: Reveal
  await text.reveal({ duration: 1200 });
  
  text.play();
}

decrypt();
```

### Casos de Uso

```javascript
// Mensaje secreto
const secretMsg = ascii.createArt('#secret');
await secretMsg.preset('decrypt');
secretMsg.play();

// Animación de login/autenticación
const authText = ascii.createArt('#auth-status');
await authText.preset('decrypt');
authText.play();

// Revelación de título
const title = ascii.createArt('#hero-title');
await title.preset('decrypt');
title.play();
```

---

## Crear Combinaciones Personalizadas

Si ningún preset se ajusta a tus necesidades, crea tu propia combinación:

### Ejemplo 1: Wave + Gradient

```javascript
const ascii = create();
const logo = ascii.createArt('#logo');

// Wave con gradiente de color
await logo.wave({ amplitude: 4, frequency: 1.0 });
await logo.colorGradient({
  baseColor: '#00ff00',
  mode: 'lightness',
  speed: 0.001
});

logo.play();
```

### Ejemplo 2: Pulse + Perspective

```javascript
// Efecto 3D pulsante
await logo.pulse({ scale: 0.08, speed: 0.003 });
await logo.perspective({
  rotateX: 0.2,
  rotateY: 0.3
});

logo.play();
```

### Ejemplo 3: Glitch + ColorCycle

```javascript
// Glitch colorido
await logo.glitch({ intensity: 0.2, speed: 0.15 });
await logo.colorCycle({ speed: 0.004, spread: 8 });

logo.play();
```

### Ejemplo 4: Secuencia Compleja

```javascript
// Animación de intro compleja
async function intro() {
  const logo = ascii.createArt('#logo');
  
  // 1. Scramble inicial
  await logo.scramble({ duration: 800 });
  
  // 2. Reveal
  await logo.reveal({ duration: 1200 });
  
  // 3. Wave + ColorCycle
  await logo.wave({ amplitude: 3 });
  await logo.colorCycle();
  
  logo.play();
}

intro();
```

---

## Tabla Comparativa de Presets

| Preset | Velocidad | Intensidad | Uso CPU | Mejor Para |
|--------|-----------|------------|---------|------------|
| `rainbow` | Media | Baja | Baja | Logos permanentes |
| `hologram` | Alta | Alta | Media | Efectos puntuales |
| `matrix` | Media | Media | Media | Fondos/Ambientes |
| `terminal` | Baja | Baja | Baja | Texto narrativo |
| `decrypt` | Alta | Alta | Media | Transiciones |

---

## Consejos de Rendimiento

### Optimización

```javascript
// ✅ Bueno: Usar en elementos específicos
const logo = ascii.createArt('#logo');
await logo.preset('rainbow');

// ⚠️ Cuidado: No abusar en muchos elementos
// Esto puede afectar el rendimiento:
const elements = document.querySelectorAll('.ascii');
elements.forEach(el => {
  const art = ascii.createArt(el);
  art.preset('matrix'); // Muchas animaciones simultáneas
});

// ✅ Mejor: Limitar cantidad
const mainArts = document.querySelectorAll('.ascii-main');
mainArts.forEach((el, index) => {
  if (index < 3) { // Máximo 3 animaciones
    const art = ascii.createArt(el);
    art.preset('rainbow');
  }
});
```

### Pausar cuando no es visible

```javascript
// Usar Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      art.play();
    } else {
      art.pause();
    }
  });
});

observer.observe(document.querySelector('#logo'));
```

---

## ⛔ Errores Comunes

### 1. Preset no existe

```javascript
// ❌ INCORRECTO
await logo.preset('glow');     // No existe
await logo.preset('neon');     // No existe
await logo.preset('custom');   // No existe

// ✅ CORRECTO
await logo.preset('rainbow');  // ✅ Existe
```

### 2. Olvidar await

```javascript
// ❌ INCORRECTO: Falta await
logo.preset('rainbow');
logo.play(); // Se ejecuta antes de que termine

// ✅ CORRECTO
await logo.preset('rainbow');
logo.play();
```

### 3. No llamar .play()

```javascript
// ❌ INCORRECTO: Falta .play()
await logo.preset('rainbow');
// No pasa nada...

// ✅ CORRECTO
await logo.preset('rainbow');
logo.play(); // Inicia la animación
```

---

<a name="english-presets-guide"></a>

# Presets Guide - ASCII-SCRIPT

**English | [Español](#presets-guide---ascii-script)**

Complete guide to all available presets in ASCII-SCRIPT.

## ⚠️ Available Presets (Complete List)

**IMPORTANT:** Only these 5 presets exist. Do not invent new names.

## Table of Contents

- [rainbow](#preset-rainbow-1)
- [hologram](#preset-hologram-1)
- [matrix](#preset-matrix-1)
- [terminal](#preset-terminal-1)
- [decrypt](#preset-decrypt-1)
- [Creating Custom Combinations](#creating-custom-combinations)

---

## Preset: `rainbow`

**Description:** Animated rainbow wave with HSL color rotation.

**Included Effects:**
- `wave()` - Sine wave displacement
- `colorCycle()` - Rainbow color rotation

**Best For:**
- Animated logos
- Eye-catching headers
- ASCII art with movement and color

### Basic Usage

```javascript
import { create } from '@jyiro/ascii-script';

const ascii = create();
const logo = ascii.createArt('#logo');

// Apply rainbow preset
await logo.preset('rainbow');
logo.play();
```

### Default Configuration

```javascript
// Internally does this:
await logo.wave({
  amplitude: 3,
  frequency: 0.8,
  speed: 0.001
});

await logo.colorCycle({
  speed: 0.002,
  spread: 5
});
```

### Customize Individual Effects

If you want to adjust specific parameters, apply effects manually:

```javascript
// Custom rainbow
await logo.wave({
  amplitude: 5,      // More pronounced wave
  frequency: 1.2,    // More frequent
  speed: 0.002       // Faster
});

await logo.colorCycle({
  speed: 0.003,      // Faster color change
  spread: 10         // More color variation
});

logo.play();
```

### Use Cases

```javascript
// Animated hero on landing page
const heroText = ascii.createArt('#hero-ascii');
await heroText.preset('rainbow');
heroText.play();

// Header logo
const logo = ascii.createArt('#brand-logo');
await logo.preset('rainbow');
logo.play();
```

---

## Preset: `hologram`

**Description:** Futuristic holographic effect with glitch and pulse.

**Included Effects:**
- `glitch()` - Digital corruption and offset
- `pulse()` - Breathing scale animation

**Best For:**
- Futuristic effects
- Sci-fi interfaces
- Cyberpunk projects
- ASCII art with tech aesthetic

### Basic Usage

```javascript
const ascii = create();
const logo = ascii.createArt('#logo');

// Apply hologram preset
await logo.preset('hologram');
logo.play();
```

### Default Configuration

```javascript
// Internally does this:
await logo.glitch({
  intensity: 0.15,
  speed: 0.1
});

await logo.pulse({
  scale: 0.05,
  speed: 0.002
});
```

### Customize

```javascript
// More intense hologram
await logo.glitch({
  intensity: 0.3,    // More glitch
  speed: 0.2         // Faster
});

await logo.pulse({
  scale: 0.1,        // More visible pulse
  speed: 0.003       // Faster
});

logo.play();
```

### Use Cases

```javascript
// Futuristic interface
const terminal = ascii.createArt('#terminal-output');
await terminal.preset('hologram');
terminal.play();

// Sci-fi logo
const brandLogo = ascii.createArt('#brand');
await brandLogo.preset('hologram');
brandLogo.play();
```

---

## Preset: `matrix`

**Description:** Matrix effect with falling characters and CRT-style scanlines.

**Included Effects:**
- `matrixRain()` - Matrix-style falling characters
- `scanlines` (background) - CRT scan lines

**Best For:**
- Matrix/Cyberpunk aesthetic
- Animated backgrounds
- Retro terminal effects
- Hacking/tech projects

### Basic Usage

```javascript
const ascii = create();
const text = ascii.createArt('#matrix-text');

// Apply matrix preset
await text.preset('matrix');
text.play();
```

### Default Configuration

```javascript
// Internally does this:
await text.matrixRain({
  speed: 0.05,
  density: 0.1,
  charset: 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ'
});
```

### Customize

```javascript
// Denser matrix
await text.matrixRain({
  speed: 0.08,       // Falls faster
  density: 0.2,      // More characters
  charset: '0123456789ABCDEF' // Hexadecimal characters
});

text.play();
```

### With Procedural Background

```javascript
// Full matrix with background
const ascii = create();

// Background with scanlines
const bg = ascii.createBackground('#bg', {
  cols: 100,
  rows: 40,
  charset: ' ░▒▓█'
});

// Text with matrix rain
const text = ascii.createArt('#matrix-text');
await text.preset('matrix');

// Play both
bg.play();
text.play();
```

---

## Preset: `terminal`

**Description:** Retro terminal effect with typewriter-style writing.

**Included Effects:**
- `typewriter()` - Character-by-character typing effect
- `scanlines` (optional) - CRT scan lines

**Best For:**
- Terminal-style text
- Command animations
- Retro interfaces
- Console effects

### Basic Usage

```javascript
const ascii = create();
const text = ascii.createArt('#terminal-text');

// Apply terminal preset
await text.preset('terminal');
text.play();
```

### Default Configuration

```javascript
// Internally does this:
await text.typewriter({
  speed: 80,        // Milliseconds per character
  cursor: true      // Show blinking cursor
});
```

### Customize

```javascript
// Faster terminal
await text.typewriter({
  speed: 40,        // Faster
  cursor: true,
  cursorChar: '█'   // Custom cursor
});

text.play();
```

---

## Preset: `decrypt`

**Description:** Decryption animation with initial scramble and progressive reveal.

**Included Effects:**
- `scramble()` - Random disordered characters
- `reveal()` - Progressive reveal of real text

**Best For:**
- Decryption animations
- "Hacking" effects
- Dramatic text reveals
- Unique transitions

### Basic Usage

```javascript
const ascii = create();
const text = ascii.createArt('#secret-text');

// Apply decrypt preset
await text.preset('decrypt');
text.play();
```

### Default Configuration

```javascript
// Internally does this:
await text.scramble({
  duration: 1000,   // 1 second of scramble
  charset: '!@#$%^&*()_+-=[]{}|;:,.<>?'
});

// Then reveals
await text.reveal({
  duration: 1500,   // 1.5 seconds of reveal
  direction: 'left-to-right'
});
```

### Customize

```javascript
// More dramatic decrypt
await text.scramble({
  duration: 1500,   // More scramble time
  charset: '01'     // Binary only
});

await text.reveal({
  duration: 2000,   // Slower reveal
  direction: 'center-out' // Reveal from center
});

text.play();
```

---

## Creating Custom Combinations

If no preset fits your needs, create your own combination:

### Example 1: Wave + Gradient

```javascript
const ascii = create();
const logo = ascii.createArt('#logo');

// Wave with color gradient
await logo.wave({ amplitude: 4, frequency: 1.0 });
await logo.colorGradient({
  baseColor: '#00ff00',
  mode: 'lightness',
  speed: 0.001
});

logo.play();
```

### Example 2: Pulse + Perspective

```javascript
// 3D pulsing effect
await logo.pulse({ scale: 0.08, speed: 0.003 });
await logo.perspective({
  rotateX: 0.2,
  rotateY: 0.3
});

logo.play();
```

### Example 3: Glitch + ColorCycle

```javascript
// Colorful glitch
await logo.glitch({ intensity: 0.2, speed: 0.15 });
await logo.colorCycle({ speed: 0.004, spread: 8 });

logo.play();
```

---

## Preset Comparison Table

| Preset | Speed | Intensity | CPU Usage | Best For |
|--------|-------|-----------|-----------|----------|
| `rainbow` | Medium | Low | Low | Permanent logos |
| `hologram` | High | High | Medium | Specific effects |
| `matrix` | Medium | Medium | Medium | Backgrounds/Ambients |
| `terminal` | Low | Low | Low | Narrative text |
| `decrypt` | High | High | Medium | Transitions |

---

## ⛔ Common Mistakes

### 1. Preset doesn't exist

```javascript
// ❌ WRONG
await logo.preset('glow');     // Doesn't exist
await logo.preset('neon');     // Doesn't exist
await logo.preset('custom');   // Doesn't exist

// ✅ CORRECT
await logo.preset('rainbow');  // ✅ Exists
```

### 2. Forgetting await

```javascript
// ❌ WRONG: Missing await
logo.preset('rainbow');
logo.play(); // Executes before preset finishes

// ✅ CORRECT
await logo.preset('rainbow');
logo.play();
```

### 3. Not calling .play()

```javascript
// ❌ WRONG: Missing .play()
await logo.preset('rainbow');
// Nothing happens...

// ✅ CORRECT
await logo.preset('rainbow');
logo.play(); // Starts animation
```
