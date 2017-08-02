import WaterMol from './water_mol';
import ColorDrop from './color_drop';
import ColorDropMol from './color_drop_mol';

class Sim {

  constructor(DIM_X = 1000, DIM_Y = 1000, NUM_MOLECULES = 600) {
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.mols = [];

    while(this.mols.length < NUM_MOLECULES) {
      let newWaterMol = this.addWater();
      for (let i = 0; i < this.mols.length - 1; i++) {
        if (newWaterMol.isCollidedWith(this.mols[i])) {
          this.mols.pop();
        }
      }
    }

  }

  addWater() {
    let waterMol = new WaterMol();
    this.mols.push(waterMol);
    return waterMol;
  }

  toggleWater() {
    this.mols.forEach(mol => {
      if (mol.constructor.name == 'WaterMol') {
        mol.color = mol.color == '#e7fafe' ? '#dae1e2' : '#e7fafe';
      }
    })
  }

  addDrop() {
    let newDrop = new ColorDropMol();
    this.mols.push(newDrop);
    // newDrop.colorDrop.forEach(mol => this.mols.push(mol));
  }

// Temp ~ K.E. KE = 1/2 * m * v^2
// v^2 = 2KE/m
// v = sqrt2KE/m
  handleTempChange(newTemp) {
    console.log(newTemp);
    let multiplier = (1+(newTemp-10) / 25);
    this.mols.forEach(mol => {
      let energyRatio = multiplier / mol.tempMultipler;
      mol.vel[0] *= x;
      mol.vel[1] *= x;
      mol.tempMultipler = multiplier;
    })
  }

  draw(ctx) {
    ctx.clearRect(0,0,1000,1000);
    this.mols.forEach( mol => mol.draw(ctx));
  }

  moveObjects() {
    this.mols.forEach( mol => mol.move());
  }

  checkCollisions() {
    for (let i = 0; i < this.mols.length - 1; i++) {
      for (let j = i+1; j < this.mols.length; j++) {
        let mol1 = this.mols[i];
        let mol2 = this.mols[j];
        if (mol1.isCollidedWith(mol2)) {
          mol1.separateObjects(mol2);
          mol1.handleElasticCollision(mol2);
        }
      }
    }
  }

}

export default Sim;
