import Canvas from '../atom/Canvas';
import Vector from '../basic/Vector';

export default interface Shape {
    move(v: Vector): void;
    render(context: Canvas, styles: Object): void;
}
