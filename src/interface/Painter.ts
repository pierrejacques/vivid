export default interface Painter {
    isAnimating: boolean;
    stop(): void;
    animate(): void;
}
