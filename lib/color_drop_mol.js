import Util from './util';
import Mol from './mol';

const RADIUS = () => {
  return 5;
}

const VELOCITY = 3;

class ColorDropMol extends Mol {
  constructor(options = {}) {
    options.color = '#ae1e1e';
    options.radius = RADIUS();
    options.pos = [
      Math.floor(Math.random() * 50) + 225,
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
