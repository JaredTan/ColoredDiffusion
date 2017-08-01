# Colored Diffusion

## Background

This 2D Simulation written in Javascript will demonstrate the erratic motion a drop of food coloring will disperse in a glass of water.

This phenomena is called Brownian motion - where particles will drift apart as there are more ways to drift apart than there are to drift back together. This can also be explained through the Second Law of Thermodynamics, which states that systems naturally tend towards maximum disorder.

This motion can be summed up in 3 parts -

+ 1) Diffusion / Mass Transfer: Defined by Fick's Law, where the rate of motion (J, or flux) is proportional to the concentration difference and inversely proportional to the distance needed to travel.

<!-- ![Fick's Law](http://res.cloudinary.com/jaredtan/image/upload/v1501481918/ficks_law_2_wdsqr6.png) -->

+ 2) Heat Transfer: Defined by Fourier's Law, where heat moves down a temperature gradient, and the heat flux (q) is proportional to the thermal conductivity of the solutes.

<!-- ![Fourier's Law](http://res.cloudinary.com/jaredtan/image/upload/v1501481917/fouriers_law_n8ogob.png) -->

+ 3) Momentum Transfer: Defined by Newton's Law, a fluid can be considered a distribution of matter. Similar to a ball bouncing off another, momentum must be conserved when other particles collide with it.

However, this simulation will simplify the core components of gradient transport into a user friendly simulation.

## Functionality and MVP

This simulation will allow a user to change different variables in this environment, which will pertain to the three ways that particles are affected in a fluid environment.

These variables will be:

- [ ] Temperature (Average energy of the water)

- [ ] Size Ratio between the coloring and water

- [ ] Mass Ratio between the coloring and water

Also, to accompany the simulation, there will also be

- [ ] Instructions

- [ ] Short description of processes occurring.

- [ ] Production README

## Wireframe

![wireframe](http://res.cloudinary.com/jaredtan/image/upload/v1501483754/Colored_Diffusion_Wireframe_pfsipl.png)

## Technologies

Easel JS will be used to render high performance 2D graphics.

## Implementation Timeline

### Day 1

+ Set Up Canvas
+ Learn EaselJS and how to effectively display particle interactions
+ Begin writing OOP Javascript for the particles

### Day 2

+ Continue learning EaselJS
+ Continue writing vanilla javascript
+ Add user input scroll bars

### Day 3

+ Touch up simulation and check that particles are moving correctly
+ Create functioning drop! and reset controls
+ Start styling

### Day 4

+ Style with more Easel
+ Check that all functions are working correctly
+ Add Github link

## Bonus

- [ ] Allow multiple drops of coloring

- [ ] Add solvent effects - such as using other solvents than water such as oil or soap.

- [ ] Turn into some sort of interactive game.
