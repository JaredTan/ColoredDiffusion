import Util from './util';
import Mol from './mol';

const RADIUS = () => {
  return 3;
}

const VELOCITY = 2;

class ColorDropMol extends Mol {
  constructor(options = {}) {
    options.color = document.getElementById('color').value;
    options.radius = RADIUS();
    options.pos = [
      Math.floor(Math.random() * 10) + 225,
      0
    ];
    options.vel = [
      0,
      (-1) * VELOCITY
    ]
    super(options)
  }

}

export default ColorDropMol;
