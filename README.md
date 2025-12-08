# DOM vs Lightning.js - Performance Comparison

This project compares the performance of two implementations of an image carousel for TV:
- **DOM App**: Using pure HTML5/CSS/JavaScript
- **Lightning App**: Using Lightning.js 2.x + SolidJS

## 📁 Project Structure

```
DOMvsLightningJS/
├── dom-app/              # Application using native DOM
│   ├── index.html        # HTML interface
│   ├── style.css         # CSS styles
│   ├── script.js         # JavaScript logic
│   └── tizenDomApp/      # Build for Tizen TV
│
├── lightning-app/        # Application using Lightning + SolidJS
│   ├── src/
│   │   ├── App.jsx       # Main component
│   │   ├── index.jsx     # Entry point
│   │   └── fonts.js      # Font configuration
│   ├── package.json      # Dependencies
│   ├── vite.config.js    # Vite configuration
│   └── tizenLightning/   # Build for Tizen TV
│
└── README.md             # This file
```

## 🎯 Objective

Demonstrate the performance difference between traditional DOM rendering and Lightning.js in real TV application scenarios with:
- ✅ Horizontal carousel with 100 images
- ✅ Continuous left-to-right animation
- ✅ Lazy loading of images
- ✅ Real-time FPS counter
- ✅ 1920x1080 rendering

## 🚀 DOM App (HTML5/CSS/JavaScript)

### Features:
- **Framework**: None (Vanilla JS)
- **Rendering**: Native browser DOM
- **Animation**: `requestAnimationFrame`
- **Expected Performance**: ~60 FPS

### How to run:

```bash
cd dom-app
# Open index.html directly in browser or use a local server
python -m http.server 8000
# Access: http://localhost:8000
```

### Build for Tizen:
```bash
# Build is already configured in tizenDomApp folder
# Use Tizen Studio to deploy
```

### Technical Structure:
- **Header**: 120px height with title (48px) and statistics (24px)
- **Cards**: 400x550px with 350x350px image
- **Speed**: 5 pixels per frame
- **Lazy Loading**: Loads images only when visible

## ⚡ Lightning App (Lightning.js + SolidJS)

### Features:
- **Framework**: Lightning.js 2.x + SolidJS 1.9.9
- **Rendering**: WebGL via Lightning Renderer
- **Animation**: Lightning native animation system
- **Expected Performance**: ~50-60 FPS

### How to run:

```bash
cd lightning-app

# Install dependencies
pnpm install

# Development mode
pnpm dev
# Access: http://localhost:5174

# Production build preview
pnpm preview
# Access: http://localhost:5174
```

### Build for Tizen:
```bash
cd lightning-app
pnpm build:tizen
# Build will be generated in: tizenLightning/
```

### Technologies:
- **@lightningjs/renderer**: 2.20.0 (WebGL rendering)
- **@lightningtv/core**: 2.14.0
- **@lightningtv/solid**: 2.12.4
- **solid-js**: 1.9.9
- **Vite**: 7.1.10 (Build tool)

## 🎨 Visual

Both applications maintain:
- **Header**: Background #333333, 120px height
- **Cards**: 400x550px, background #444444, borderRadius 10px
- **Images**: 350x350px via picsum.photos
- **Text**: Roboto 24px, white
- **Background**: #1a1a1a

## 🐛 Troubleshooting

### CORS error when loading images:
Lightning App uses `vite.config.js` with CORS headers configured. If you still have issues:

```js
// vite.config.js
server: {
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
}
```


**Developed to compare performance between DOM and WebGL rendering in TV apps**
