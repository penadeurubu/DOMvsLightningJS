import { createRenderer, Config, loadFonts } from '@lightningtv/solid';
import { WebGlCoreRenderer, SdfTextRenderer } from '@lightningjs/renderer/webgl';
import fonts from './fonts';
import App from './App';

Config.debug = false;
Config.fontSettings.fontFamily = 'Roboto';
Config.animationsEnabled = true;
Config.rendererOptions = {
  numImageWorkers: 2,
  fontEngines: [SdfTextRenderer],
  renderEngine: WebGlCoreRenderer,
  deviceLogicalPixelRatio: 1,
  devicePhysicalPixelRatio: 1,
  targetFPS: 0,
  textureMemory: {
    criticalThreshold: 200e6,
    targetThresholdLevel: 0.5,
    debugLogging: false
  },
  boundsMargin: 800,
  enableContextSpy: false,
  enableInspector: false,
  quadBufferSize: 4 * 1024 * 1024,
  useImageWorker: true,
  experimental_FinalizationRegistryTextureUsageTracker: true
};

const { render } = createRenderer();
loadFonts(fonts);

render(() => <App />);