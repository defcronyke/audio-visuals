export default class DaphneVisual4 {
  constructor(name, canvas) {
    this.name = name;
    this.canvas = canvas;
  }

  init() {
    this.c = this.canvas.getContext('2d');
  }

  draw() {
    let c = this.c;

    c.fillStyle = 'rgba(0,0,0,1.0)';
    c.fillRect(0, 0, this.canvas.width, this.canvas.height);
    let x = -20;
    let y = 20;

    for (let i = 0; i < this.dataArray.length; i++) {
      let data = this.dataArray[i];

      if ((x + 40) < this.canvas.width) {
        x = x + 40;
      } else {
        x = 20;
        y = y + 40;
      }

      let r = (1.0 - (Math.abs(128 - data) / 128)) * 20;
      let antiData = Math.floor((1.0 - (data / 256)) * 255);
      this.canvasContext.fillStyle = "rgba(" + data + "," + Math.abs(data - antiData) * 2 + "," + antiData + ",1.0)";
      this.canvasContext.beginPath();
      this.canvasContext.arc(x, y, r, 0, 2 * Math.PI, false);
      this.canvasContext.fill();

      this.canvasContext.fillStyle = "rgba(" + Math.abs(data - antiData) + "," + data + "," + antiData + ",1.0)";
      this.canvasContext.beginPath();
      this.canvasContext.arc(x, y, r / 2, 0, 2 * Math.PI, false);
      this.canvasContext.fill();
    }
  }
}
