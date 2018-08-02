import Shape from '../interface/Shape';
import Vector from '../basic/Vector';

export default class Motion {
    private speed: Vector = null;

    constructor(public shape: Shape) {
        this.speed = Vector.zeros(shape.dimension);
    }

    setSpeed(d: Vector) {
        this.speed = this.speed.plus(d);
    }

    move() {
        this.shape.move(this.speed);
    }
}
