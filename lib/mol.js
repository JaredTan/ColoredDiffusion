import Util from './util';

class Mol {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.tempMultipler = 1;
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
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;
    if (this.pos[0] < 5) {
      this.pos[0] = 5;
      this.vel[0] *= -1;
    }
    if (this.pos[0] > screenWidth - 5) {
      this.pos[0] = screenWidth - 5;
      this.vel[0] *= -1;
    }
    if (this.pos[1] < 0) {
      this.pos[1] = 0;
      this.vel[1] *= -1;
    }
    if (this.pos[1] > screenHeight - 5) {
      this.pos[1] = screenHeight - 5;
      this.vel[1] *= -1;
    }
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
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
    this.vel[0] = Math.cos(col_angle) * final_xvel_this + Math.cos(col_angle + Math.PI/2)*final_yvel_this;
    this.vel[1] = Math.sin(col_angle) * final_xvel_this + Math.sin(col_angle + Math.PI/2)*final_yvel_this;
    other.vel[0] = Math.cos(col_angle) * final_xvel_other + Math.cos(col_angle + Math.PI/2)*final_yvel_other;
    other.vel[1] = Math.sin(col_angle) * final_xvel_other + Math.sin(col_angle + Math.PI/2)*final_yvel_other;
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
    this.pos[0] -= (overlapDist/15) * dx;
    this.pos[1] -= (overlapDist/15) * dy;
    other.pos[0] += (overlapDist/15) * dx;
    other.pos[1] += (overlapDist/15) * dy;
  }

// https://coderwall.com/p/z8uxzw/javascript-color-blender adapted from here, added own color changes
  blendColors(other) {
    let color1 = this.color;
    let color2 = other.color;
    if (color1.length == 4)
       color1 = color1[1] + color1[1] + color1[2] + color1[2] + color1[3] + color1[3];
   else
       color1 = color1.substring(1);
   if (color2.length == 4)
       color2 = color2[1] + color2[1] + color2[2] + color2[2] + color2[3] + color2[3];
   else
       color2 = color2.substring(1);
    color1 = [parseInt(color1[0] + color1[1], 16), parseInt(color1[2] + color1[3], 16), parseInt(color1[4] + color1[5], 16)];
    color2 = [parseInt(color2[0] + color2[1], 16), parseInt(color2[2] + color2[3], 16), parseInt(color2[4] + color2[5], 16)];
    let color3 = [
        (0.5) * color1[0] + 0.5 * color2[0],
        (0.5) * color1[1] + 0.5 * color2[1],
        (0.5) * color1[2] + 0.5 * color2[2]
    ];
    let color4 = [
        (0.8) * color1[0] + 0.2 * color2[0],
        (0.8) * color1[1] + 0.2 * color2[1],
        (0.8) * color1[2] + 0.2 * color2[2]
    ];
    let color5 = [
        (0.2) * color1[0] + 0.8 * color2[0],
        (0.2) * color1[1] + 0.8 * color2[1],
        (0.2) * color1[2] + 0.8 * color2[2]
    ];

  color3 = '#' + this.int_to_hex(color3[0]) + this.int_to_hex(color3[1]) + this.int_to_hex(color3[2]);
  color4 = '#' + this.int_to_hex(color4[0]) + this.int_to_hex(color4[1]) + this.int_to_hex(color4[2]);
  color5 = '#' + this.int_to_hex(color5[0]) + this.int_to_hex(color5[1]) + this.int_to_hex(color5[2]);

  if (this.radius > other.radius) {
    this.color = color4;
    other.color = color5;
  } else if (this.radius == other.radius) {
    this.color = color3;
    other.color = color3;
  } else {
    this.color = color5;
    other.color = color4;
  }
}

  int_to_hex(num) {
    let hex = Math.round(num).toString(16);
    if (hex.length == 1)
        hex = '0' + hex;
    return hex;
  }


}

export default Mol;
