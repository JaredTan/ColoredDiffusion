import WaterMol from './water_mol';
import ColorDropMol from './color_drop_mol';

class Sim {

  constructor(DIM_X = 1000, DIM_Y = 1000, NUM_WATER_MOLECULES = 200) {
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.NUM_WATER_MOLECULES = NUM_WATER_MOLECULES
    this.mols = [];
    for (let i = 0; i < NUM_WATER_MOLECULES; i++) {
      this.addWater();
    }
  }

  addWater() {
    let waterMol = new WaterMol();
    this.mols.push(waterMol);
    return waterMol;
  }

  addDropEvent(e) {
    let numDrops = document.getElementById('drop-count').value;
    if (numDrops > 250) {
      numDrops = 250;
    } else if (numDrops < 0) {
      numDrops = 0;
    }
    if (this.mols.length > 1500) {
      for ( var j = this.mols.length - 1 - this.NUM_WATER_MOLECULES; j>=1500; j-- ) {
        this.mols.splice(this.NUM_WATER_MOLECULES + Math.floor(Math.random()*this.mols.length), 1);
      }
    }
    for (var i = 0; i < numDrops; i++) {
      let newDrop = new ColorDropMol({pos: [e.clientX + (50*(0.5*Math.random())), e.clientY + (50*(0.5*Math.random()))]});
      this.mols.push(newDrop);
    }
  }

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
