import SimView from './sim_view';
import Sim from './simulation';


document.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  let simulation = new SimView(new Sim(), ctx);
  simulation.start;
});
