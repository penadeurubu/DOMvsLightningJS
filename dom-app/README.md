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
### Technical Structure:
- **Header**: 120px height with title (48px) and statistics (24px)
- **Cards**: 400x550px with 350x350px image
- **Speed**: 5 pixels per frame
- **Lazy Loading**: Loads images only when visible

**Developed to compare performance between DOM and WebGL rendering in TV apps**
