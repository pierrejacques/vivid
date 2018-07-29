import Vector from '../basic/Vector';
import Matrix from '../basic/Matrix';

export default interface Formula {
    para: Vector;
    transformation(m: Matrix): void;
}
