
class SimView {
  constructor(simulation, ctx) {
    this.simulation = simulation;
    this.ctx = ctx;
  }

  start() {
    setInterval( () => this.movement(), Math.floor(1000/30));
    setInterval( () => this.simulation.draw(this.ctx), Math.floor(1000/30));
  }

  movement() {
    this.simulation.moveObjects();
    this.simulation.checkCollisions();
  }

  addDrop() {
    this.simulation.addDrop();
  }
}

export default SimView;
