import SimView from './sim_view';
import Sim from './simulation';

document.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById('canvas');
  const dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];
  canvas.width = dimension[0];
  canvas.height = dimension[1];
  let ctx = canvas.getContext('2d');
  const resetButton = document.getElementById('reset-btn');
  const tempBar = document.getElementById('range-bar');
  let simView = new SimView(new Sim(), ctx);
  simView.start();
  resetButton.addEventListener('click', () => location.reload());
  tempBar.addEventListener('input', (e) => {
    e.preventDefault();
    let newTemp = parseInt(e.currentTarget.value);
    simView.handleTempChange(newTemp);
  });
  canvas.addEventListener('click', (e) => simView.addDropEvent(e), false)
});
