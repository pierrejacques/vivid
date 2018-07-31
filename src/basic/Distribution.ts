import Vector from './Vector';

export default class Distribution {
    static uniform(inf: Vector, sup: Vector, step?: Vector): Distribution {
        if (!step) {
            step = Vector.ones(inf.length);
        }
        if (inf.length !== sup.length || inf.length !== step.length) throw new Error('length unmatched');
        return new Distribution(() => inf.map((min, index) => {
            const max = sup[index];
            const gap = step[index];
            return Math.floor(Math.random() * (max - min) / gap) * gap + min;
        }));
    }

    constructor(private generator: () => Vector) {}

    generate() {
        return this.generator();
    }
}
