import Turtle from 'turtle-canvas/browser/turtle-canvas.min';

export default class DaphneVisual3 {
  constructor(name) {
    this.name = name;
  }

  init() {
    this.pen = new Turtle.TURTLE(this.canvas);
  }

  draw() {
    let pen = this.pen;
    let c = pen.ctx;

    c.fillStyle = 'rgba(0,0,0,1.0)';
    c.fillRect(0, 0, this.canvas.width, this.canvas.height);
    pen.moveTo(0, this.canvas.height / 3);
    pen.pendown();
    pen.dir = 0;

    for (let i = 0; i < this.dataArray.length - 1; i++) {
      let data = this.dataArray[i];
      let next_data = this.dataArray[i + 1];
      c.lineWidth = Math.abs(data - next_data) * 20;

      if (i < this.dataArray.length / 4) {
        c.strokeStyle = 'rgba(' + data + ',' + Math.abs(data - next_data) * 4 + ',' + next_data + ',0.5)';
      } else if ((i > this.dataArray.length / 4) && (i < (this.dataArray.length / 4) * 2)) {
        c.strokeStyle = 'rgba(0,' + data + ',' + Math.abs(data - next_data) * 14 + ',0.5)';
      } else if ((i > this.dataArray.length / 4) * 2 && (i < (this.dataArray.length / 4) * 3)) {
        c.strokeStyle = 'rgba(0,' + data + ',' + next_data + ',0.5)';
      } else {
        c.strokeStyle = 'rgba(' + Math.abs(data - next_data) * 10 + ',' + next_data + ',' + data + ',0.5)';
      }

      if (i === Math.floor(this.dataArray.length / 4)) {
        pen.penup();
        pen.dir = 0;
        let x = 0;
        let y = (this.canvas.height / 3) * 2;
        pen.moveTo(x, y);
        pen.pendown();
      } else if (i === Math.floor((this.dataArray.length / 4) * 2)) {
        pen.penup();
        pen.dir = 180;
        let x = this.canvas.width;
        let y = this.canvas.height / 3;
        pen.moveTo(x, y);
        pen.pendown();
      } else if (i === Math.floor((this.dataArray.length / 4) * 3)) {
        pen.penup();
        pen.dir = 180;
        let x = this.canvas.width;
        let y = (this.canvas.height / 3) * 2;
        pen.moveTo(x, y);
        pen.pendown();
      }

      pen.right(data - next_data);
      pen.forward(3);
      pen.stroke();
    }
  }
}
