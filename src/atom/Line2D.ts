import Shape from '../interface/Shape';
import Vector from '../basic/Vector';
import Linear from '../basic/Linear';
import Canvas from './Canvas';

export default class Line2D extends Linear implements Shape {
    readonly dimension = 2;

    static fromPoints(p1: Vector | Array<number>, p2: Vector | Array<number>): Line2D {
        return new Line2D(new Vector([
            p2[0] * p1[1] - p1[0] * p2[1],
            p2[1] - p1[1],
            p1[0] - p2[0],
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
            this.para[2] * other.para[0] - this.para[0] * other.para[2],
            this.para[0] * other.para[1] - this.para[1] * other.para[0],
        ]).divide(
            this.para[1] * other.para[2] - this.para[2] * other.para[1]
        );
    }

    move(d) {
        this.para[0] += this.para[1] * d[0] + this.para[2] * d[1];
    }

    render(canvas: Canvas, styles: Object = {}) {
        const eps = 0.01;
        const ends = canvas.borders
            .map(border => this.interaction(border))
            .filter(p => canvas.contains(p, eps));
        if (ends.length >= 2) {
            let from;
            let to;
            let dist = -eps;
            ends.forEach((e1, i) => {
                ends.forEach((e2, j) => {
                    if (i >= j) return;
                    const d = e1.minus(e2).norm;
                    if (d > dist) {
                        from = e1;
                        to = e2;
                        dist = d;
                    }
                })
            });
            const context = canvas.context;
            context.beginPath();
            context.moveTo(from[0], from[1]);
            context.lineTo(to[0], to[1]);
            context.closePath();
            Object.assign(context, styles);
            context.stroke();
        }
    }
}