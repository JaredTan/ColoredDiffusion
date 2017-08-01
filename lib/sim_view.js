
class SimView(simulation, ctx) {
  constructor(props) {
    this.simulation = simulation;
    this.ctx = ctx;
  }

  start() {
    setInterval( () => this.movement(), Math.floor(1000/120));
    setInterval( () => this.simulation.draw(this.ctx), Math.floor(1000/120));
  }

  movement() {
    this.simulation.moveObjects();
    this.simulation.checkCollisions();
  }
}

export default SimView;
