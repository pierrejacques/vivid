import Vector from './Vector';
import Matrix from './Matrix';
import Formula from '../interface/Formula';

export default class Linear implements Formula {
    constructor(public para: Vector) {}
    transformation(m: Matrix): void {}
}