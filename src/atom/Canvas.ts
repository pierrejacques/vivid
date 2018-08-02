import Vector from '../basic/Vector';

export default class Canvas {
    public context: CanvasRenderingContext2D = null;
    private corners: Array<Vector>;

    constructor(private dom: HTMLCanvasElement) {
        this.context = dom.getContext('2d');
    }

    setSize(size: Vector, ratio: Vector = new Vector([2, 2])) {
        const [w, h] = [this.dom.width, this.dom.height] = size.times(ratio).toArray();
        this.corners = [
            [0, 0],
            [0, h],
            [w, h],
            [w, 0]
        ].map(c => new Vector(c));
        [this.dom.style.width, this.dom.style.height] = size.toArray().map(v => `${v}px`);
    }

    contains(v: Vector): boolean {
        return !this.corners.every(c => c.dot(v) >= 0) &&
        !this.corners.every(c => c.dot(v) <= 0) 
    }

    get width() {
        return this.dom.width;
    }

    get height() {
        return this.dom.height;
    }
}
