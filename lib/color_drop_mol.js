import Util from './util';
import Mol from './mol';

const RADIUS = () => {
  return 5;
}

const VELOCITY = 1;

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
      (-0.5) * VELOCITY
    ]
    super(options)
  }

}

export default ColorDropMol;
