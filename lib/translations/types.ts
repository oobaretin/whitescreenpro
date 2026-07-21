export type Language = "en" | "es" | "fr" | "de" | "it" | "pt" | "zh" | "ja" | "ko" | "ar" | "ru" | "hi" | "tr";

export interface Translations {
  nav: {
    home: string;
    about: string;
    contact: string;
  };
  common: {
    colors: string;
    display: string;
    tools: string;
    pranks: string;
    ambient: string;
    export: string;
    settings: string;
    backToHome: string;
    download: string;
    copy: string;
    clear: string;
    save: string;
    cancel: string;
    confirm: string;
  };
  home: {
    title: string;
    subtitle: string;
    clickToFullscreen: string;
    pressEscToExit: string;
    aboutTitle: string;
    aboutDescription: string;
    definitionTitle: string;
    definition: string;
    toolsTitle: string;
    qaTitle: string;
    featuresTitle: string;
  };
  about: {
    whatIs: string;
    definition: string;
    useCases: string;
    professional: string;
    creative: string;
    testing: string;
    entertainment: string;
  };
  toolExplanations: {
    colorScreens: string;
    zoomLighting: string;
    signature: string;
    tipScreen: string;
    deadPixel: string;
    brokenScreen: string;
    bsod: string;
    fakeUpdate: string;
    hackerTerminal: string;
    dvdScreensaver: string;
    matrixRain: string;
    flipClock: string;
    noSignal: string;
  };
  qa: {
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
    q6: string;
    a6: string;
    q7: string;
    a7: string;
  };
  colors: {
    brightness: string;
    colorTemperature: string;
    cool: string;
    warm: string;
    gradientMode: string;
    linear: string;
    radial: string;
    startColor: string;
    endColor: string;
    angle: string;
  };
  display: {
    resolutionPreset: string;
    width: string;
    height: string;
    aspectRatioLock: string;
    toggleFullscreen: string;
    pictureInPicture: string;
    exitPiP: string;
  };
  tools: {
    zoomLighting: string;
    signature: string;
    tipScreen: string;
    deadPixelTest: string;
    videoCallFillLight: string;
    digitalSignatureCapture: string;
    posTippingInterface: string;
    monitorTesting: string;
  };
  pranks: {
    bsod: string;
    fakeUpdate: string;
    hackerTerminal: string;
    brokenScreen: string;
  };
  ambient: {
    dvdScreensaver: string;
    matrixRain: string;
    flipClock: string;
    noSignal: string;
  };
  export: {
    downloadImage: string;
    screenCapture: string;
    solidColor: string;
    share: string;
    qrCode: string;
    showQrCode: string;
    hideQrCode: string;
    exportPalette: string;
    exportCss: string;
    exportJson: string;
    screenCaptureWarning: string;
  };
  settings: {
    autoHidePanel: string;
    hideDelay: string;
    keyboardShortcuts: string;
    toggleFullscreen: string;
    cycleColors: string;
    toggleControls: string;
    toggleGrid: string;
    startStopTimer: string;
    adjustBrightness: string;
    quickSelectColors: string;
  };
  bsod: {
    customError: string;
    errorCode: string;
  };
  tipScreen: {
    amount: string;
    tip: string;
    total: string;
    pay: string;
    enterAmount: string;
    noTip: string;
    newTransaction: string;
    thankYou: string;
  };
  signature: {
    signHere: string;
    undo: string;
    clearAll: string;
    savePng: string;
    background: string;
    white: string;
    light: string;
    clear: string;
    grid: string;
  };
}