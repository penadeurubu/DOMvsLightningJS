const track = document.getElementById('track');
const countEl = document.getElementById('count');
const fpsEl = document.getElementById('fps');

// Configuration
const ITEM_COUNT = 100; // Number of items to render
const SPEED = 5; // Pixels per frame

// Store all card elements
const cards = [];

// Generate Items with lazy loading
function createItems() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < ITEM_COUNT; i++) {
        const el = document.createElement('div');
        el.className = 'card';
        el.dataset.index = i;
        el.innerHTML = `
            <img data-src="https://picsum.photos/350/350?random=${i}" alt="Placeholder" class="lazy">
            <h3>Item ${i + 1}</h3>
        `;
        fragment.appendChild(el);
        cards.push(el);
    }
    track.appendChild(fragment);
    countEl.innerText = ITEM_COUNT;
}

// Lazy load images based on viewport
function lazyLoadImages() {
    const viewportLeft = Math.abs(position);
    const viewportRight = viewportLeft + 1920;
    
    cards.forEach((card, index) => {
        const cardLeft = index * 450;
        const cardRight = cardLeft + 400;
        
        // Check if card is in viewport (with some margin)
        if (cardRight >= viewportLeft - 500 && cardLeft <= viewportRight + 500) {
            const img = card.querySelector('img.lazy');
            if (img && img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.remove('lazy');
            }
        }
    });
}

// Animation Loop
// Start the track shifted to the left so items can move Right into view
let position = -((ITEM_COUNT * 450) - 1920); 
let lastTime = performance.now();
let frames = 0;

function animate(time) {
    // FPS Calculation
    frames++;
    if (time - lastTime >= 1000) {
        fpsEl.innerText = frames;
        frames = 0;
        lastTime = time;
    }

    // Move Carousel (Left to Right)
    position += SPEED;
    
    // Reset if moved too far
    // For Left-to-Right, if we go past 0 (assuming we start negative) or just keep going
    // We'll just loop it for the demo. 
    // Let's start at -3000 and move to 0 for this visual test
    if (position > 0) {
         position = -track.scrollWidth + 1920; 
    }

    // Apply transform
    track.style.transform = `translate3d(${position}px, 0, 0)`;
    
    // Lazy load images based on current position
    lazyLoadImages();

    requestAnimationFrame(animate);
}

createItems();
lazyLoadImages(); // Load initial visible images
requestAnimationFrame(animate);
