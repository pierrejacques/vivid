import Canvas from '../atom/Canvas';
import Vector from '../basic/Vector';

export default interface Shape {
    dimension: number;
    move(v: Vector): void;
    render(canvas: Canvas, styles: Object): void;
}
