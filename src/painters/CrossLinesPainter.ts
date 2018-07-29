import Painter from '../interface/Painter';
import Line2D from '../atom/Line2D';
import Round from '../atom/Round';
import Vector from '../basic/Vector';
import Distribution from '../basic/Distribution';

export default class CrossLinesPainter implements Painter {
    private lines: Array<Line2D> = [];
    private roundPool: Array<Array<Round>> = [];
    private pointGenerator: Distribution = null;

    constructor(private canvas: HTMLCanvasElement) {
        this.pointGenerator = Distribution.uniform(
            Vector.zeros(2),
            new Vector([]),
            Vector.ones(2).times(0.1),
        )
    }

    createLines(n: number) {
        Array(n).fill(null).forEach(() => {
            this.lines.push(Line2D.fromPoints(
                this.pointGenerator.generate(),
                this.pointGenerator.generate(),
            ));
        });
    }

    animate() {
        const frameWork = () => {

        }
    }
}