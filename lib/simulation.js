import WaterMol from './water_mol';
import Util from './util';

class Sim {

  constructor(DIM_X = 1000, DIM_Y = 1000, NUM_MOLECULES = 3000 ) {
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.waterMols = [];

    while(this.waterMols.length < NUM_MOLECULES) {
      let newMol = this.addWater();
      for (let i = 0; i < this.waterMols.length - 1; i++) {
        if (newMol.isCollidedWith(this.waterMols[i])) {
          this.waterMols.pop();
        }
      }
    }

  }

  addWater() {
    let waterMol = new WaterMol();
    this.waterMols.push(waterMol);
    return waterMol;
  }

  draw(ctx) {
    ctx.clearRect(0,0,1000,1000);
    this.waterMols.forEach( mol => mol.draw(ctx));
  }

  moveObjects() {
    this.waterMols.forEach( mol => mol.move());
  }

  checkCollisions() {
    for (let i = 0; i < this.water.length; i++) {
      for let j = i+1; i < this.water.length; i++) {
        let mol1 = this.water[i];
        let mol2 = this.water[j];
        if (mol1.isCollidedWith(mol2)) {
          mol1.separateObjects(mol2);
          mol1.newVel(mol2);
        }
      }
    }
  }

}

export default Sim;
