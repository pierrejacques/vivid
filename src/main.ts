import Canvas from './atom/Canvas';
import Vector from './basic/Vector';
import Line2D from './atom/Line2D';
import CrossLinesPainter from './painters/CrossLinesPainter';

const canvas = new Canvas(
    document.getElementById('canvas') as HTMLCanvasElement,
).setSize(
    new Vector([1300, 700]),
);

const painter = new CrossLinesPainter(
    canvas,
    {
        maxSpeed: [20, 5],
        amount: 10,
        roundSize: 5,
        lineColor: [200, 200, 200],
        roundColor: [200, 200, 250]
    }
);

const $stop = document.getElementById('stop')
$stop.addEventListener('click', () => {
    if (painter.isAnimating) {
        painter.stop();
        $stop.innerText = 'Animate';
    } else {
        painter.animate();
        $stop.innerText = 'Stop';
    }
});
