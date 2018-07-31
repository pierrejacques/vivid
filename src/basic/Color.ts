export default class Color {
    constructor(
        public r: number,
        public g: number,
        public b: number,
        public a: number = 1,
    ) {}
    
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
