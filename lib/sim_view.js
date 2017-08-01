
class SimView {
  constructor(simulation, ctx) {
    this.simulation = simulation;
    this.ctx = ctx;
  }

  start() {
    setInterval( () => this.movement(), Math.floor(1000/60));
    setInterval( () => this.simulation.draw(this.ctx), Math.floor(1000/60));
  }

  movement() {
    this.simulation.moveObjects();
    this.simulation.checkCollisions();
  }
}

export default SimView;
