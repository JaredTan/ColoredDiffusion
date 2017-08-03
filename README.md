# Colored Diffusion

[Link to Live Site](https://jaredtan.github.io/ColoredDiffusion/)

Inspired by the entropy of nature, this quirky 2D simulation written purely in vanilla JavaScript demonstrates the erratic motion a drop of food coloring undergoes when dispersed in a glass of water, while providing a delighting display of blended colors. :)

![drop](http://res.cloudinary.com/jaredtan/image/upload/v1501744324/Screen_Shot_2017-08-03_at_12.06.37_AM_ymjnsf.png)


## Background

This motion (Brownian motion) can be summed up in 3 parts -

+ 1) Diffusion / Mass Transfer: Defined by Fick's Law, where the rate of motion (J, or flux) is proportional to the concentration difference and inversely proportional to the distance needed to travel.

+ 2) Heat Transfer: Defined by Fourier's Law, where heat moves down a temperature gradient, and the heat flux (q) is proportional to the thermal conductivity of the solutes.

+ 3) Momentum Transfer: Defined by Newton's Law, a fluid can be considered a distribution of matter. Similar to a ball bouncing off another, momentum must be conserved when other particles collide with it.

## Implementations

Colored Diffusion emulates the nature of this motion through momentum transfer and heat.
### Conservation of Momentum / Angled Collisions
```javascript
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

const Util = {

  elasticCollision(r1, r2, v1, v2) {
    let mass1 = r1 * r1 * Math.PI;
    let mass2 = r2 * r2 * Math.PI;
    return (v1 * (mass1 - mass2) + (2 * mass2 * v2)) / (mass1 + mass2);
  },
  ...
}
```


### Heat Change
Temperature is by definition the average kinetic energy of the system, which can be represented by the velocity of the system's molecules. The velocity of the molecules are incremented proportionally as the user changes the temperature setting.

```javascript
handleTempChange(newTemp) {
  let multiplier = (1+(newTemp-10) / 25);
  let energyRatio = multiplier / this.mols[0].tempMultipler;
  this.mols.forEach(mol => {
    mol.vel[0] *= energyRatio;
    mol.vel[1] *= energyRatio;
    mol.tempMultipler = multiplier;
  });
}
```

### Color Blending

In order to nicely display the blending of colors as the colored molecules start to disperse and fill the environment, I implemented a blending function which is called whenever two molecules collide.

*Idea adapted from [coderwall](https://coderwall.com/p/z8uxzw/javascript-color-blender), but altered for this project's purposes.*

```javascript
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
    (0.75) * color1[0] + 0.25 * color2[0],
    (0.75) * color1[1] + 0.25 * color2[1],
    (0.75) * color1[2] + 0.25 * color2[2]
  ];
  let color5 = [
    (0.25) * color1[0] + 0.75 * color2[0],
    (0.25) * color1[1] + 0.75 * color2[1],
    (0.25) * color1[2] + 0.75 * color2[2]
  ];

  color3 = '#' + this.int_to_hex(color3[0]) + this.int_to_hex(color3[1]) + this.int_to_hex(color3[2]);
  color4 = '#' + this.int_to_hex(color4[0]) + this.int_to_hex(color4[1]) + this.int_to_hex(color4[2]);
  color5 = '#' + this.int_to_hex(color5[0]) + this.int_to_hex(color5[1]) + this.int_to_hex(color5[2]);

  if (this.radius < other.radius) {
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

```

## Future Plans

### JS Library / 3D

Though the simulation looks appealing in 2D, a physics engine such as Matter.js / Easel.js would allow for much more nicely rendered molecules conpared to vanilla javascript canvas. Also, using WebGL / Three.js would allow the creation of a beautiful 3D model environment for the colored diffusion to take place.

### Mass Transfer

A portion of Brownian motion that was not addressed is the movement change based on concentration gradients. With an engine such as Web GL to calculate differential equations / matrix math, this could be implemented.

### Solvent Effects

This simulation does not account for the interaction of polarized molecules, which would cause fluctuations in particle velocities as compounds such as water would attract each other through hydrogen bonding. Addition of different types of solutes with different polarities would be exciting.
