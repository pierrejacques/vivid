const map = Array.prototype.map;
const reduce = Array.prototype.reduce;
const forEach = Array.prototype.forEach;
const iterator = Array.prototype[Symbol.iterator];

export default class Vector implements Iterable<number> {
    readonly length: number;
    [Symbol.iterator] = iterator;

    static plus(...vectors: Array<Vector>): Vector {
        const length = Math.max(...vectors.map(v => v.length));
        return new Vector(Array(length).fill(null).map((_, idx) => vectors
            .map(vector => vector[idx] || 0).reduce((i, j) => i + j)
        ));
    }

    // shortCuts

    static ones(length: number): Vector {
        return new Vector(Array(length).fill(1));
    }

    static zeros(length: number): Vector {
        return new Vector(Array(length).fill(0));
    }

    static random(length: number = 1): Vector {
        return new Vector(Array(length).fill(null).map(() => Math.random()));
    }

    constructor(arr: Array<number>) {
        arr.forEach((value, index) => {
            this[index] = value;
        });
        this.length = arr.length;
    }

    // object-side functional

    toArray(): Array<number> {
        return Array.prototype.map.call(this, v => v);
    }

    copy(): Vector {
        return this.map(v => v);
    }

    // iterational

    map(f: Function): Vector {
        return new Vector(map.call(this, f));
    }

    forEach(f: Function): Vector {
        return new Vector(forEach.call(this, f));
    }

    reduce(f: Function): Vector {
        return new Vector(reduce.call(this, f));
    }

    // symmetrical

    toOpposite(): Vector {
        return this.map(v => -v);
    }

    toInverse(): Vector {
        return this.map(v => 1 / v);
    }

    get norm(): number {
        return map.call(this, v => v ** 2).reduce((i, j) => i + j) ** 0.5;
    }

    // mathematical

    normalize(): Vector {
        const norm = this.norm;
        return this.map(v => v / norm);
    }
    
    plus(other: Vector): Vector {
        return this.map((v, i) => v + (other[i] || 0));
    }

    minus(other: Vector): Vector {
        return this.plus(other.toOpposite());
    }

    times(num: number | Vector): Vector {
        if (typeof num === 'number') return this.map(v => v * num);
        if (num.length !== this.length) return null;
        return this.map((v, i) => v * num[i]);
    }

    divide(num: number | Vector): Vector {
        if (typeof num === 'number') return this.map(v => v / num);
        if (num.length !== this.length) return null;
        return this.times(num.toInverse());
    }

    dot(other: Vector): number {
        if (other.length !== this.length) return NaN;
        return map.call(this, (v, i) => v * other[i]).reduce((i, j) => i + j);
    }
}
