import Vector from './Vector';

export default class Color {
    private r: number;
    private g: number;
    private b: number;
    private a: number;

    constructor(v: Vector | Array<number>) {
        this.r = v[0];
        this.g = v[1];
        this.b = v[2];
        this.a = v[3] || 1;
    }
    
    get hex() {
        const opacityHex = Math.round(this.a * 255);
        return '#' + [this.r, this.g, this.b, opacityHex].map(v => {
            const str = v.toString(16);
            return str.length === 2 ? str : `0${str}`;
        }).join('');
    }
    
    get rgba() {
        return 'rgba(' + ['r', 'g', 'b', 'a'].map(k => this[k]).join(',') + ')';
    }
}
