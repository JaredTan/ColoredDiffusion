import SimView from './sim_view';
import Sim from './simulation';

document.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  const dropButton = document.getElementById('drop-btn');
  const $hideButton = document.getElementById('hide-btn');
  const $resetButton = document.getElementById('reset-btn');

  let diffusion = new SimView(new Sim(), ctx);
  diffusion.start();
  dropButton.addEventListener('click', () => {
    diffusion.addDrop();
  })
  $hideButton.addEventListener('click', () => diffusion.toggleWater())
  $resetButton.addEventListener('click', () => location.reload());
});
