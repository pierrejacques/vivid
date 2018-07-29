import Vector from '../basic/Vector';

export default class Canvas {
    public context: CanvasRenderingContext2D = null;

    constructor(private dom: HTMLCanvasElement) {
        this.context = dom.getContext('2d');
    }

    setSize(size: Vector, ratio: Vector = new Vector([2, 2])) {
        [this.dom.width, this.dom.height] = size.times(ratio);
        [this.dom.style.width, this.dom.style.height] = size.toArray().map(v => `${v}px`);
    }

    get width() {
        return this.dom.width;
    }

    get height() {
        return this.dom.height;
    }
}
