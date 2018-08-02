import Shape from '../interface/Shape';
import Vector from '../basic/Vector';
import Canvas from './Canvas';

export default class Ellipse implements Shape {
    readonly dimension = 2;

    constructor(public center: Vector, public radius: Vector, public rotation: number = 0) {}

    move(d: Vector) {
        this.center = this.center.plus(d);
    }

    scale(d: Vector | number) {
        this.radius = this.radius.times(d);
    }

    rotate(d: number) {
        this.rotation = d;
    }

    render(canvas: Canvas, styles: Object) {
        const ctx = canvas.context;
        ctx.beginPath();
        ctx.ellipse(
            this.center[0],
            this.center[1],
            this.radius[0],
            this.radius[1],
            0,
            0,
            Math.PI * 2,
            true,
        );
        ctx.closePath();
        Object.assign(ctx, styles);
        ctx.fill();
    }
}