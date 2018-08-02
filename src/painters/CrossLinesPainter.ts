import Painter from '../interface/Painter';
import Line2D from '../atom/Line2D';
import Round from '../atom/Round';
import Vector from '../basic/Vector';
import Distribution from '../basic/Distribution';
import Color from '../basic/Color';
import Canvas from '../atom/Canvas';
import Motion from '../atom/Motion';

interface CrossLinesConfig {
    maxSpeed: Array<number>;
    amount: number;
    roundSize: number;
    lineColor: Array<number>;
    roundColor: Array<number>;
}

export default class CrossLinesPainter implements Painter {
    private lines: Array<Motion> = [];
    private roundPool: Array<Array<Round>>;
    private pointGenerator: Distribution;
    private speedGenerator: Distribution;
    private lineColor: Color;
    private roundColor: Color;

    constructor(
        private canvas: Canvas,
        public readonly config: CrossLinesConfig,
    ) {
        this.lineColor = new Color(config.lineColor);
        this.roundColor = new Color(config.roundColor);
        this.pointGenerator = Distribution.uniform(
            Vector.zeros(2),
            new Vector([canvas.width, canvas.height]),
            Vector.ones(2).times(0.5),
        );
        const maxSpeed = new Vector(config.maxSpeed);
        this.speedGenerator = Distribution.uniform(
            maxSpeed.toInverse(),
            maxSpeed,
            Vector.ones(2).times(0.5),
        );
        const n = config.amount;
        Array(n).fill(null).forEach(() => {
            this.lines.push(this.createLine());
        });
        this.roundPool = Array(n).fill(Array(n).fill(null));
    }

    createLine() {
        const line = Line2D.fromPoints(
            this.pointGenerator.generate(),
            this.pointGenerator.generate(),
        );
        const motion = new Motion(line);
        motion.setSpeed(this.speedGenerator.generate());
        return motion;
    }

    createRound(c: Vector) {
        return new Round(c, this.config.roundSize);
    }

    updateLines() {
        this.lines.forEach(line => line.move());
        this.lines.forEach((line, index) => {
            const lineShape = (line.shape as Line2D);
            if (!this.canvas.contains(lineShape.para)) {
                this.lines[index] = this.createLine();
            }
        });
    }

    updateInteractions() {
        this.lines.forEach((lm1, i) => {
            const l1 = lm1.shape as Line2D;
            this.lines.forEach((lm2, j) => {
                const l2 = lm2.shape as Line2D;
                if (i >= j) return;
                const interaction = l1.interaction(l2);
                if (this.canvas.contains(interaction)) {
                    if (this.roundPool[i][j]) {
                        this.roundPool[i][j].center = interaction;
                    } else {
                        this.roundPool[i][j] = this.createRound(interaction);
                    }
                } else {
                    this.roundPool[i][j] = null;
                }
            });
        });
    }

    animate() {
        const frameWork = () => {
            this.updateLines();
            this.lines.forEach(line => {
                line.shape.render(this.canvas, {
                    strokeStyle: this.lineColor.rgba,
                });
            });
            this.updateInteractions();
            this.roundPool.forEach(row => row.forEach(round => {
                round.render(this.canvas, {
                    fillStyle: this.roundColor.rgba,
                });
            }));
        }
    }
}