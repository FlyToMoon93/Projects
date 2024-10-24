declare module 'plotly.js-dist' {
    const plotly: any;
    export default plotly;
}
declare global {
    interface Window {
        initMap: () => void; // Definiere initMap als eine Funktion auf dem Window-Objekt
    }
}

export {};