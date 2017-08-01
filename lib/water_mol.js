import Util from './util.js';
import Mol from './mol.js';

COLORS() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

RADIUS() {
  return 15 + (Math.random() * 100) % 25;
}

const VELOCITY = 1;

class WaterMol extends Mol {
  constructor(options = {}) {
    super(options);
    options.color = COLORS();
    options.radius = RADIUS();
    options.pos = [
      Math.floor(Math.random() * 1000),
      Math.floor(Math.random() * 1000)
    ];
    options.vel = [
      (Math.random() - 0.5) * VELOCITY,
      (Math.random() - 0.5) * VELOCITY
    ]
}

export default WaterMol;
