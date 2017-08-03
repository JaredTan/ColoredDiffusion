
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

  addDropEvent(e) {
    this.simulation.addDropEvent(e);
  }
  toggleWater() {
    this.simulation.toggleWater();
  }

  handleTempChange(newTemp) {
    this.simulation.handleTempChange(newTemp);
  }
}

export default SimView;
