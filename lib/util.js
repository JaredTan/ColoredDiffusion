const Util = {
  elasticCollision(r1, r2, v1, v2) {
    let mass1 = r1 * r1 * Math.PI;
    let mass2 = r2 * r2 * Math.PI;
    return (v1 * (mass1 - mass2) + (2 * mass2 * v2)) / (mass1 + mass2);
  },

  dist(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
  }
}

export default Util;
