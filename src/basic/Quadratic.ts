import Formula from '../interface/Formula';
import Matrix from './Matrix';

export default class Quadratic implements Formula {
    constructor(public para: Matrix) {}

    transformation(m: Matrix) {}
}
