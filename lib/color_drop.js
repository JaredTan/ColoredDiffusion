import ColorDropMol from './color_drop_mol';

class ColorDrop {
  constructor(X_POS = 250, mols = 5) {
    this.pos = X_POS,
    this.mols = mols
    this.colorDrop = this.createMols();
  }

  createMols() {
    let colorDrops = [];

    let newMol = new ColorDropMol();
    while (colorDrops.length < this.mols) {
      colorDrops.push(newMol);
      for (let i = 0; i < colorDrops.length - 1; i++) {
        if (newMol.isCollidedWith(colorDrops[i])) {
          colorDrops.pop;
        }
      }
    }
    return colorDrops;
  }
}

export default ColorDrop;
