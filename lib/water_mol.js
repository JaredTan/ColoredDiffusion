import Util from './util';
import Mol from './mol';

const COLORS = () => {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

const RADIUS = () => {
  return 3;
}

const VELOCITY = 1;

class WaterMol extends Mol {
  constructor(options = {}) {
    options.color = '#D3D3D3';
    options.radius = RADIUS();
    options.pos = [
      Math.floor(Math.random() * 500),
      Math.floor(Math.random() * 500)
    ];
    options.vel = [
      (Math.random() - 0.5) * VELOCITY,
      (Math.random() - 0.5) * VELOCITY
    ]
    super(options);
  }
}

export default WaterMol;