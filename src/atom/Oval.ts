import Renderable from '../interface/Renderable';
import Vector from '../basic/Vector';
import Canvas from './Canvas';

export default class Oval implements Renderable {
    constructor(public center: Vector, public radius: Vector) {}

    move(d: Vector) {
        this.center = this.center.plus(d);
    }

    scale(d: Vector) {
        this.radius = this.radius.plus(d);
    }

    render(canvas: Canvas, styles: Object) {
        const ctx = canvas.context;
        ctx.beginPath();
        ctx.arc(this.center[0], this.center[1], this.radius[0], 0, Math.PI * 2, true);
        ctx.closePath();
        Object.assign(ctx, styles);
        ctx.fill();
    }
}