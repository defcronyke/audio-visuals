import Turtle from 'turtle-canvas/browser/turtle-canvas.min';

export default class DaphneVisual1 {
  constructor(name, canvas) {
    this.name = name;
    this.canvas = canvas;
    this.pen = null;
  }

  init() {
    this.pen = new Turtle.TURTLE(this.canvas);
    this.pen.right(270);
  }

  draw() {
    let pen = this.pen;
    let c = pen.ctx;

    c.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let lowest_freq1 = this.dataArray[0];
    let highest_freq1 = this.dataArray[0];

    let lowest_freq2 = this.dataArray[0];
    let highest_freq2 = this.dataArray[0];

    let lowest_freq3 = this.dataArray[0];
    let highest_freq3 = this.dataArray[0];

    let third = Math.floor(this.dataArray.length / 3);

    let opac = 1.0;

    for (let i = 0; i < this.dataArray.length; i++) {
      let data = this.dataArray[i];

      if (i < third) {
        if (data > highest_freq1) {
          highest_freq1 = data;
        } else if (data < lowest_freq1) {
          lowest_freq1 = data;
        }
      } else if ((i > third) && (i < (third * 2))) {
        if (data > highest_freq2) {
          highest_freq2 = data;
        } else if (data < lowest_freq2) {
          lowest_freq2 = data;
        }
      } else if (i > (third * 2)) {
        if (data > highest_freq3) {
          highest_freq3 = data;
        } else if (data < lowest_freq3) {
          lowest_freq3 = data;
        }
      }
    }

    c.fillStyle = "rgba(0,0,0,1.0)";
    c.fillRect(0, 0, this.canvas.width, this.canvas.height);

    opac = (Math.abs(highest_freq3 - lowest_freq1) / 255);

    c.strokeStyle = "rgba(" + lowest_freq1 + ",255,0," + opac + ")";
    c.lineWidth = (1.0 - opac) * 12;

    let sides = 3 + Math.floor(((highest_freq1 - lowest_freq1) / 2) / 8);
    let dist = 100;
    let angle = 360 / sides;
    let rads = (180 / sides) * (Math.PI / 180);
    let r = dist / (2 * Math.sin(rads));
    let startX = (this.canvas.width / 2) - r;
    let startY = (this.canvas.height / 2) + (dist / 2);
    pen.moveTo(startX, startY);
    pen.pendown();
    let positions1 = [];

    for (let i = 0; i < sides; i++) {
      positions1.push([pen.x, pen.y]);
      pen.forward(dist);
      pen.right(angle);
    }
    pen.stroke();
    pen.penup();

    for (let i = 0; i < positions1.length; i++) {
      let current_x = positions1[i][0];
      let current_y = positions1[i][1];

      for (let j = 0; j < (positions1.length - i); j++) {
        let next_x = positions1[i + j][0];
        let next_y = positions1[i + j][1];
        pen.moveTo(current_x, current_y);
        pen.pendown();
        c.lineTo(next_x, next_y);
        pen.penup();
      }
    }

    pen.penup();
    opac = (Math.abs(highest_freq1 - lowest_freq2) / 255);

    c.strokeStyle = "rgba(0," + lowest_freq2 + ",255," + opac + ")";
    c.lineWidth = (1.0 - opac) * 10;

    sides = 3 + Math.floor(((highest_freq2 - lowest_freq2) / 2) / 8);
    dist = 100;
    angle = 360 / sides;
    rads = (180 / sides) * (Math.PI / 180);
    r = dist / (2 * Math.sin(rads));
    startX = (this.canvas.width / 2) - r;
    startY = (this.canvas.height / 2) + (dist / 2);
    pen.moveTo(startX, startY);
    pen.pendown();
    let positions2 = [];

    for (let i = 0; i < sides; i++) {
      positions2.push([pen.x, pen.y]);
      pen.forward(dist);
      pen.right(angle);
    }
    pen.stroke();
    pen.penup();

    for (let i = 0; i < positions2.length; i++) {
      let current_x = positions2[i][0];
      let current_y = positions2[i][1];

      for (let j = 0; j < (positions2.length - i); j++) {
        let next_x = positions2[i + j][0];
        let next_y = positions2[i + j][1];
        pen.moveTo(current_x, current_y);
        pen.pendown();
        c.lineTo(next_x, next_y);
        pen.penup();
      }
    }

    pen.penup();
    opac = (Math.abs(highest_freq2 - lowest_freq3) / 255);

    c.strokeStyle = "rgba(255,0," + lowest_freq3 + "," + opac + ")";
    c.lineWidth = (1.0 - opac) * 8;

    sides = 3 + Math.floor(((highest_freq3 - lowest_freq3) / 2) / 8);
    dist = 100;
    angle = 360 / sides;
    rads = (180 / sides) * (Math.PI / 180);
    r = dist / (2 * Math.sin(rads));
    startX = (this.canvas.width / 2) - r;
    startY = (this.canvas.height / 2) + (dist / 2);
    pen.moveTo(startX, startY);
    pen.pendown();
    let positions3 = [];

    for (let i = 0; i < sides; i++) {
      positions3.push([pen.x, pen.y]);
      pen.forward(dist);
      pen.right(angle);
    }
    pen.stroke();
    pen.penup();

    for (let i = 0; i < positions3.length; i++) {
      let current_x = positions3[i][0];
      let current_y = positions3[i][1];

      for (let j = 0; j < (positions3.length - i); j++) {
        let next_x = positions3[i + j][0];
        let next_y = positions3[i + j][1];
        pen.moveTo(current_x, current_y);
        pen.pendown();
        c.lineTo(next_x, next_y);
        pen.penup();
      }
    }
  }
}
