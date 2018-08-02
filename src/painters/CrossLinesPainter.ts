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
    public isAnimating = false;
    private lines: Array<Motion> = [];
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
            maxSpeed.toOpposite(),
            maxSpeed,
            Vector.ones(2).times(0.5),
        );
        const n = config.amount;
        Array(n).fill(null).forEach(() => {
            this.lines.push(this.createLine());
        });
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

    renderLines() {
        this.lines.forEach(line => line.move());
        this.lines.forEach((line, index) => {
            const lineShape = (line.shape as Line2D);
            if (!this.canvas.containsLine(lineShape.para)) {
                this.lines[index] = this.createLine();
            }
            this.lines[index].shape.render(this.canvas, {
                strokeStyle: this.lineColor.rgba,
            });
        });
    }

    renderInteractions() {
        this.lines.forEach((lm1, i) => {
            const l1 = lm1.shape as Line2D;
            this.lines.forEach((lm2, j) => {
                const l2 = lm2.shape as Line2D;
                if (i >= j) return;
                const interaction = l1.interaction(l2);
                if (this.canvas.contains(interaction)) {
                    this.createRound(interaction).render(this.canvas, {
                        fillStyle: this.roundColor.rgba,
                    });
                }
            });
        });
    }

    stop() {
        this.isAnimating = false;
    }

    animate(frameRate: number = 1) {
        this.isAnimating = true;
        let count = 0;
        const frameWork = () => {
            count = (count + 1) % frameRate;
            if (count === 0) {
                this.canvas.clear();
                this.renderLines();
                this.renderInteractions();
            }
            if (this.isAnimating) {
                window.requestAnimationFrame(frameWork);
            }
        }
        frameWork();
    }
}
