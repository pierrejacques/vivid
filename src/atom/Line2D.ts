import Renderable from '../interface/Renderable';
import Vector from '../basic/Vector';
import Linear from '../basic/Linear';
import Canvas from './Canvas';

export default class Line2D extends Linear implements Renderable {
    static fromPoints(p1: Vector | Array<number>, p2: Vector | Array<number>): Line2D {
        return new Line2D(new Vector([
            p1[0] * p2[1] - p2[0] * p1[1],
            p1[1] - p2[1],
            p2[0] - p1[0],
        ]));
    }

    static fromDirection(p: Vector | Array<number>, d: Vector | Array<number>): Line2D {
        return new Line2D(new Vector([
            d[0] * p[1] - d[1] * p[0],
            d[1],
            -d[0],
        ]));
    }

    constructor(public para: Vector) {
        super(para);
    }

    interaction(other: Line2D): Vector {
        return new Vector([
            (this.para[1] * other.para[0] - other.para[2] * this.para[0]) / (this.para[1] * other.para[2] - this.para[2] * other.para[1]),
            (this.para[2] * other.para[0] - other.para[1] * this.para[0]) / (this.para[2] * other.para[1] - this.para[1] * other.para[2]),
        ]);
    }

    move(d) {
        this.para[0] += this.para[1] * d[0] + this.para[2] * d[1];
    }

    render(canvas: Canvas, styles: Object) {
        const xmax = canvas.width;
        const ymax = canvas.height;
        const borders = [
            Line2D.fromPoints([0, 0], [0, ymax]),
            Line2D.fromPoints([0, 0], [xmax, 0]),
            Line2D.fromPoints([0, ymax], [xmax, ymax]),
            Line2D.fromPoints([xmax, 0], [xmax, ymax]),
        ];
        const eps = 0.01;
        const ends = borders.map(border => this.interaction(border)).filter(p => 
            p[0] >= -eps && p[0] <= xmax + eps && p[1] >= -eps && p[1] <= ymax + eps
        );
        if (ends.length === 2) {
            const start = ends[0];
            const end = ends[1];
            const context = canvas.context;
            context.beginPath();
            context.moveTo(start[0], start[1]);
            context.lineTo(end[0], end[1]);
            context.closePath();
            Object.assign(context, styles);
            context.stroke();
        }
    }
}