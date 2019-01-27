import Turtle from 'turtle-canvas/browser/turtle-canvas.min';

export default class DaphneVisual2 {
  constructor(name, canvas) {
    this.name = name;
    this.canvas = canvas;
  }

  init() {
    this.pen = new Turtle.TURTLE(this.canvas);
  }

  draw() {
    let pen = this.pen;
    let c = pen.ctx;

    c.fillStyle = 'rgba(0,0,0,1.0)';
    c.fillRect(0, 0, this.canvas.width, this.canvas.height);
    c.lineWidth = 3;

    pen.moveTo(0, 0);
    pen.pendown();
    pen.right(90);
    pen.right(45);
    pen.stroke();

    for (let i = 0; i < this.dataArray.length - 1; i++) {
      let data = this.dataArray[i];
      let next_data = this.dataArray[i + 1];
      c.lineWidth = Math.abs(data - next_data) * 4;

      if (i < this.dataArray.length / 3) {
        c.strokeStyle = 'rgba(' + data + ',125,' + Math.abs(data - next_data) + ',1.0)';
      } else if ((i > this.dataArray.length / 3) && (i < (this.dataArray.length / 3) * 2)) {
        c.strokeStyle = 'rgba(' + Math.abs(data - next_data) + ',' + data + ',125,1.0)';
      } else {
        c.strokeStyle = 'rgba(125,' + Math.abs(data - next_data) + ',' + data + ',1.0)';
      }

      if (i === Math.floor(this.dataArray.length / 3)) {
        pen.penup();
        pen.dir = 135;
        let x = this.canvas.width;
        let y = 0;
        pen.moveTo(x, y);
        pen.pendown();
        pen.stroke();
      } else if (i === Math.floor((this.dataArray.length / 3) * 2)) {
        pen.penup();
        pen.dir = 270;
        let x = this.canvas.width / 2;
        let y = this.canvas.height;
        pen.moveTo(x, y);
        pen.pendown();
        pen.stroke();
      }

      pen.right(data - next_data);
      pen.forward(3);
      pen.stroke();
    }
  }
}
