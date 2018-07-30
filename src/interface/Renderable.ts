import Canvas from '../atom/Canvas';

export default interface Renderable {
    render(context: Canvas, styles: Object): void;
}
