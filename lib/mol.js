import Util from './util';

class Mol {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  }

  move() {
    console.log(window.innerHeight);
    if (this.pos[0] < 0) {
      this.pos[0] = 0;
      this.vel[0] *= -1;
    }
    if (this.pos[0] > window.innerWidth-20) {
      this.pos[0] = window.innerWidth-20;
      this.vel[0] *= -1;
    }
    if (this.pos[1] < 0) {
      this.pos[1] = 0;
      this.vel[1] *= -1;
    }
    if (this.pos[1] > window.innerHeight-20) {
      this.pos[1] = window.innerHeight-20;
      this.vel[1] *= -1;
    }
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    // this.pos[0] = (this.pos[0] + this.vel[0]) % 1000;
    // this.pos[0] < 0 ? this.pos[0] += 1000 : this.pos[0] ;
    // this.pos[1] = (this.pos[1] + this.vel[1]) % 1000;
    // this.pos[1] < 0 ? this.pos[1] += 1000 : this.pos[1];
  }

  isCollidedWith(other) {
    let x1 = this.pos[0];
    let y1 = this.pos[1];
    let x2 = other.pos[0];
    let y2 = other.pos[1];
    let dist = Util.dist(x1, x2, y1, y2);
    let r1 = this.radius;
    let r2 = other.radius;
    return dist <= (r1 + r2) + 5;
  }

  handleElasticCollision(other) {
    let thisOldX = this.vel[0];
    let thisOldY = this.vel[1];
    let otherOldX = this.vel[0];
    let otherOldY = this.vel[1];
    this.vel[0] = Util.newVel(this.radius, other.radius, thisOldX, otherOldX);
    this.vel[1] = Util.newVel(this.radius, other.radius, thisOldY, otherOldY);
    other.vel[0] = Util.newVel(other.radius, this.radius, otherOldX, thisOldX);
    other.vel[1] = Util.newVel(other.radius, this.radius, otherOldY, thisOldY);
  }

  separateObjects(other) {
    let x1 = this.pos[0];
    let y1 = this.pos[1];
    let x2 = other.pos[0];
    let y2 = other.pos[1];
    let distBetween = Util.dist(x1, x2, y1, y2);
    let r1 = this.radius;
    let r2 = other.radius;
    let overlapDist = r1 + r2 - distBetween;
    let dx = (x2 - x1) / overlapDist ;
    let dy = (y2 - y1) / overlapDist ;
    this.pos[0] -= (overlapDist/20) * dx;
    this.pos[1] -= (overlapDist/20) * dy;
    other.pos[0] += (overlapDist/20) * dx;
    other.pos[1] += (overlapDist/20) * dy;
  }


}

export default Mol;
