import Vector from './Vector';

const map = Array.prototype.map;

export default class Matrix {
    readonly row: number;
    readonly col: number;
    readonly length: number;

    static fromVector(v: Vector) {
        return new Matrix(v.toArray().map(a => [a]));
    }

    constructor(m: Array<Vector | Array<number>>) {
        m.forEach((row, i) => {
            this[i] = map.call(row, v => v);
        });
        this.length = m.length;
    }

    toArray(): Array<Array<number>> {
        return map.call(this, v => v);
    }

    // get T(): Matrix {
    //     const m = this.toArray();
        
    // }

    // dot(other: Vector | Matrix) {
        
    // }
}