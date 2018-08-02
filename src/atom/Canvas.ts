import Vector from '../basic/Vector';
import Line2D from './Line2D';

export default class Canvas {
    public context: CanvasRenderingContext2D = null;
    public corners: Array<Vector>;
    public borders: Array<Line2D>;
    private extendedCorners: Array<Vector>;

    constructor(private dom: HTMLCanvasElement) {
        this.context = dom.getContext('2d');
    }

    setSize(size: Vector, ratio: Vector = new Vector([2, 2])): Canvas {
        const [w, h] = [this.dom.width, this.dom.height] = size.times(ratio).toArray();
        const c = [
            [0, 0],
            [0, h],
            [w, h],
            [w, 0]
        ].map(c => new Vector(c));
        this.corners = c;
        this.extendedCorners = this.corners.map(corner => new Vector([1, corner[0], corner[1]]));
        this.borders = [
            Line2D.fromPoints(c[0], c[1]),          
            Line2D.fromPoints(c[1], c[2]),
            Line2D.fromPoints(c[2], c[3]),
            Line2D.fromPoints(c[3], c[0]),
        ];
        [this.dom.style.width, this.dom.style.height] = size.toArray().map(v => `${v}px`);
        return this;
    }

    contains(v: Vector, eps: number = 0): boolean {
        return v[0] > -eps && v[1] > -eps && v[0] < this.width + eps && v[1] < this.height + eps;
    }

    containsLine(v: Vector): boolean {
        return !this.extendedCorners.every(c => c.dot(v) >= 0) &&
        !this.extendedCorners.every(c => c.dot(v) <= 0) 
    }
    
    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    get width() {
        return this.dom.width;
    }

    get height() {
        return this.dom.height;
    }
}
