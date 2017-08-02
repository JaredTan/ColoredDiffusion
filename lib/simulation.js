import WaterMol from './water_mol';
import ColorDropMol from './color_drop_mol';

class Sim {

  constructor(DIM_X = 1000, DIM_Y = 1000, NUM_WATER_MOLECULES = 300) {
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.mols = [];

    while(this.mols.length < NUM_WATER_MOLECULES) {
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

  addDrop() {
    let numDrops = document.getElementById('drop-count').value;
    if (numDrops > 500) {
      numDrops = 500;
    } else if (numDrops < 0) {
      numDrops = 0;
    }
    for (var i = 0; i < numDrops; i++) {
      let newDrop = new ColorDropMol();
      this.mols.push(newDrop);
    }
    // newDrop.colorDrop.forEach(mol => this.mols.push(mol));
  }

  addDropEvent(e) {
    let numDrops = document.getElementById('drop-count').value;
    if (numDrops > 500) {
      numDrops = 500;
    } else if (numDrops < 0) {
      numDrops = 0;
    }
    for (var i = 0; i < numDrops; i++) {
      let newDrop = new ColorDropMol({pos: [e.clientX, e.clientY]});
      this.mols.push(newDrop);
    }
  }

// Temp ~ K.E. KE = 1/2 * m * v^2
// v^2 = 2KE/m
// v = sqrt2KE/m
  handleTempChange(newTemp) {
    let multiplier = (1+(newTemp-10) / 25);
    let energyRatio = multiplier / this.mols[0].tempMultipler;
    this.mols.forEach(mol => {
      mol.vel[0] *= energyRatio;
      mol.vel[1] *= energyRatio;
      mol.tempMultipler = multiplier;
    })
  }

  draw(ctx) {
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;
    ctx.clearRect(0,0,screenWidth,screenHeight);
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
          mol1.blendColors(mol2);
      }
    }
  }
}

}

export default Sim;
