import Util from './util';

class Mol {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.tempMultipler = 0;
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
    if (this.pos[0] < 5) {
      this.pos[0] = 5;
      this.vel[0] *= -1;
    }
    if (this.pos[0] > 495) {
      this.pos[0] = 495;
      this.vel[0] *= -1;
    }
    if (this.pos[1] < 0) {
      this.pos[1] = 0;
      this.vel[1] *= -1;
    }
    if (this.pos[1] > 495) {
      this.pos[1] = 495;
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
    return dist <= (r1 + r2) + .5;
  }

  // handleElasticCollision(other) {
  //   let thisOldX = this.vel[0];
  //   let thisOldY = this.vel[1];
  //   let otherOldX = this.vel[0];
  //   let otherOldY = this.vel[1];
  //   this.vel[0] = Util.newVel(this.radius, other.radius, thisOldX, otherOldX);
  //   this.vel[1] = Util.newVel(this.radius, other.radius, thisOldY, otherOldY);
  //   other.vel[0] = Util.newVel(other.radius, this.radius, otherOldX, thisOldX);
  //   other.vel[1] = Util.newVel(other.radius, this.radius, otherOldY, thisOldY);
  // }

  handleElasticCollision(other) {
    let dx = this.pos[0] - other.pos[0];
    let dy = this.pos[1] - other.pos[1];
    let col_angle = Math.atan2(dy, dx);
    let magnitude_this = Math.sqrt(this.vel[0] * this.vel[0] + this.vel[1] * this.vel[1]);
    let magnitude_other = Math.sqrt(other.vel[0] * other.vel[0] + other.vel[1] * other.vel[1]);
    let dir_this = Math.atan2(this.vel[1], this.vel[0]);
    let dir_other = Math.atan2(other.vel[1], other.vel[0]);
    let new_xvel_this = magnitude_this*Math.cos(dir_this - col_angle);
    let new_yvel_this = magnitude_this*Math.sin(dir_this - col_angle);
    let new_xvel_other = magnitude_other*Math.cos(dir_other - col_angle);
    let new_yvel_other = magnitude_other*Math.sin(dir_other - col_angle);
    let final_xvel_this = Util.elasticCollision(this.radius, other.radius, new_xvel_this, new_xvel_other);
    let final_xvel_other = Util.elasticCollision(other.radius, this.radius, new_xvel_other, new_xvel_this);
    let final_yvel_this = new_yvel_this;
    let final_yvel_other = new_yvel_other;

    // let final_yvel_this = Util.elasticCollision(this.radius, other.radius, new_yvel_this, new_yvel_other);
    // let final_yvel_other = Util.elasticCollision(other.radius, this.radius, new_yvel_other, new_yvel_this);
    this.vel[0] = Math.cos(col_angle) * final_xvel_this + Math.cos(col_angle + Math.PI/2)*final_yvel_this;
    this.vel[1] = Math.sin(col_angle) * final_xvel_this + Math.sin(col_angle + Math.PI/2)*final_yvel_this;
    other.vel[0] = Math.cos(col_angle) * final_xvel_other + Math.cos(col_angle + Math.PI/2)*final_yvel_other;
    other.vel[1] = Math.sin(col_angle) * final_xvel_other + Math.sin(col_angle + Math.PI/2)*final_yvel_other;
;  }

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
    this.pos[0] -= (overlapDist/15) * dx;
    this.pos[1] -= (overlapDist/15) * dy;
    other.pos[0] += (overlapDist/15) * dx;
    other.pos[1] += (overlapDist/15) * dy;
  }


}

export default Mol;
