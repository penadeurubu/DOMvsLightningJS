## ⚡ Lightning App (Lightning.js + SolidJS) Release 1.0.0

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
