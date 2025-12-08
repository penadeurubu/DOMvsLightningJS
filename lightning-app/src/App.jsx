import { createSignal, onMount, onCleanup, For } from 'solid-js';
import { View, Text } from '@lightningtv/solid';

const ITEM_COUNT = 100;
const SPEED = 5;

// Generate static data
const items = Array.from({ length: ITEM_COUNT }).map((_, i) => ({
  id: i,
  title: `Item ${i + 1}`,
  color: 0x444444ff,
  imageUrl: `https://picsum.photos/350/350?random=${i}`
}));

const Card = (props) => {
  return (
    <View
      width={400}
      height={550}
      x={props.x}
      y={25}
      color={props.item.color}
      borderRadius={10}
    >
      {/* Image Placeholder */}
      <View
        width={350}
        height={350}
        x={25}
        y={25}
        src={props.item.imageUrl}
        borderRadius={10}
      />
      
      {/* Text */}
      <Text
        x={25}
        y={400}
        text={props.item.title}
        fontSize={24}
        color={0xffffffff}
      />
    </View>
  );
};

const App = () => {
  const [fps, setFps] = createSignal(0);
  let trackRef;
  let lastTime = performance.now();
  let frames = 0;
  let fpsIntervalId;

  onMount(() => {
    if (trackRef) {
      const totalWidth = ITEM_COUNT * 450;
      const startX = -(totalWidth - 1920);
      
      // Calcula a duração baseada na velocidade
      // SPEED pixels por frame, 60 frames por segundo
      const duration = (totalWidth / SPEED) * (1000 / 60); // em milissegundos
      
      // Função para animar continuamente
      const animateLoop = () => {
        trackRef.animate(
          { x: 0 },
          {
            duration: duration,
            easing: 'linear',
          }
        ).start().waitUntilStopped().then(() => {
          // Reset e reinicia
          trackRef.x = startX;
          animateLoop();
        });
      };
      
      // Inicia a animação
      trackRef.x = startX;
      animateLoop();
    }
    
    // FPS Counter usando setInterval
    fpsIntervalId = setInterval(() => {
      const now = performance.now();
      const elapsed = now - lastTime;
      const currentFps = Math.round((frames * 1000) / elapsed);
      setFps(currentFps);
      frames = 0;
      lastTime = now;
    }, 1000);
    
    // Contador de frames
    const countFrames = () => {
      frames++;
      requestAnimationFrame(countFrames);
    };
    requestAnimationFrame(countFrames);
  });
  
  onCleanup(() => {
    if (fpsIntervalId) clearInterval(fpsIntervalId);
    if (trackRef) trackRef.stopAnimations();
  });

  return (
    <View width={1920} height={1080} color={0x1a1a1aff}>
      {/* Header */}
      <View width={1920} height={120} y={0} color={0x333333ff}>
        <Text x={35} y={10} text="LightningJS / Solid Performance" fontSize={48} color={0xffffffff} />
        <Text x={35} y={65} text={`Items: ${ITEM_COUNT}`} fontSize={24} color={0xffffffff} />
        <Text x={275} y={65} text={`FPS: ${fps()}`} fontSize={24} color={0x00ff00ff} />
      </View>

      {/* Carousel Container Area */}
      <View 
        y={150} 
        width={1920} 
        height={600} 
        color={0x000000ff}
        clipping={true}
      >
        {/* Track - Moving Layer usando animação nativa do Lightning */}
        <View ref={trackRef} y={0} width={ITEM_COUNT * 450} height={600}>
          <For each={items}>
            {(item, index) => (
              <Card item={item} x={index() * 450} />
            )}
          </For>
        </View>
      </View>
    </View>
  );
};

export default App;