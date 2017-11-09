import Util from './util';
import Mol from './mol';

const RADIUS = 8;
const VELOCITY = 2;
const screenWidth = document.documentElement.clientWidth;

class ColorDropMol extends Mol {
  constructor(options = {}) {
    options.color = document.getElementById('color').value;
    options.radius = RADIUS;
    options.pos = options.pos || [
      Math.floor(Math.random()) + screenWidth/2,
      6
    ];
    options.vel = [
      0,
      VELOCITY
    ];
    super(options)
  }

}

export default ColorDropMol;
