import SimView from './sim_view';
import Sim from './simulation';

document.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  const dropButton = document.getElementById('drop-btn');
  const hideButton = document.getElementById('hide-btn');
  const resetButton = document.getElementById('reset-btn');
  const tempBar = document.getElementById('range-bar');
  let simView = new SimView(new Sim(), ctx);
  simView.start();
  dropButton.addEventListener('click', () => simView.addDrop());
  hideButton.addEventListener('click', () => simView.toggleWater());
  resetButton.addEventListener('click', () => location.reload());
  tempBar.addEventListener('change', (e) => {
    e.preventDefault();
    let newTemp = parseInt(e.currentTarget.value);
    simView.handleTempChange(newTemp);
  });
});
