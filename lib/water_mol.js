import Util from './util';
import Mol from './mol';

const COLORS = () => {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

const RADIUS = () => {
  return 6;
}

const VELOCITY = 0.3;

const screenWidth = document.documentElement.clientWidth;
const screenHeight = document.documentElement.clientHeight;

class WaterMol extends Mol {
  constructor(options = {}) {
    options.color = '#f8fdff';
    options.radius = RADIUS();
    options.pos = [
      Math.floor(Math.random() * screenWidth),
      Math.floor(Math.random() * screenHeight)
    ];
    options.vel = [
      (Math.random() - 0.5) * VELOCITY,
      (Math.random() - 0.5) * VELOCITY
    ];
    super(options);
  }
}

export default WaterMol;
