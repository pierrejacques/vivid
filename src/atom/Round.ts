import Ellipse from "./Ellipse";
import Vector from "../basic/Vector";
import Canvas from "./Canvas";

export default class Round extends Ellipse {
    constructor(c: Vector, r: number) {
        super(c, new Vector([r, r]), 0);
    }

    scale(d: number) {
        this.radius = this.radius.times(d);
    }

    render(canvas: Canvas, styles: Object) {
        const ctx = canvas.context;
        ctx.beginPath();
        ctx.arc(
            this.center[0],
            this.center[1],
            this.radius[0],
            0,
            Math.PI * 2,
            true,
        );
        ctx.closePath();
        Object.assign(ctx, styles);
        ctx.fill();
    }
}
