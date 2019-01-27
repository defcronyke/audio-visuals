import Turtle from 'turtle-canvas/browser/turtle-canvas.min';

export default class JeremyVisual2 {
  constructor(name, canvas) {
    this.name = name;
    this.canvas = canvas;
    this.pen = null;
  }

  init() {
    this.pen = new Turtle.TURTLE(this.canvas);
    this.pen.moveTo(this.canvas.width / 2, this.canvas.height / 2);
    this.pen.right(90);

    this.n = 0;
    this.nMax = 1000;
  }

  draw() {
    let p = this.pen;
    let c = p.ctx;
    let n = this.n;
    let nMax = this.nMax;
    let dataAverage = 0;
    let dataSum = 0;
    let dataDifference = Math.abs(this.dataArray[0] - this.dataArray[this.dataArray.length - 1]);
    let dataHighest = 0;
    let dataLowest = 255;
    let dataHighAvg = 0;
    let dataHighSum = 0;
    let dataMidAvg = 0;
    let dataMidSum = 0;
    let dataLowAvg = 0;
    let dataLowSum = 0;

    c.fillStyle = 'rgba(0, 0, 0, 1.0)';
    c.fillRect(0, 0, this.canvas.width, this.canvas.height);
    c.strokeStyle = 'rgba(255, 255, 255, 1.0)';
    c.lineWidth = 1;

    for (let i = 0; i < this.dataArray.length; i++) {
      let data = this.dataArray[i];
      dataSum += data;

      if (data > dataHighest) {
        dataHighest = data;
      }

      if (data < dataLowest) {
        dataLowest = data;
      }

      if (i < (this.dataArray.length / 3)) {
        dataLowSum += data;

      } else if (i < (this.dataArray.length / 3 * 2)) {
        dataMidSum += data;

      } else {
        dataHighSum += data;
      }
    }

    dataAverage = Math.floor(dataSum / this.dataArray.length);
    dataLowAvg = Math.floor(dataLowSum / (this.dataArray.length / 3));
    dataMidAvg = Math.floor(dataMidSum / (this.dataArray.length / 3));
    dataHighAvg = Math.floor(dataHighSum / (this.dataArray.length / 3));

    p.moveTo(this.canvas.width / 2, this.canvas.height / 2 - dataDifference);
    p.pendown();
    c.strokeStyle = 'rgba(' + (dataLowAvg + dataAverage) % 255 + ', ' + (dataMidAvg + dataAverage) % 255 + ', ' + (dataHighAvg + dataAverage) % 255 + ', 1.0)';

    for (let i = n; i > 0; i--) {
      p.right(dataAverage);
      p.forward(dataHighest);

      p.right(-(dataAverage * 2));
      p.forward(255 - dataLowest);

      p.right(-(dataLowAvg * 2));
      p.forward(dataMidAvg / 3);

      p.right(Math.abs(dataHighAvg * 2 - dataLowAvg));
      p.forward(dataMidAvg / 2);
    }

    p.stroke();
    p.penup();
    p.moveTo(this.canvas.width / 2, this.canvas.height / 2);

    this.n = (n + 1) % nMax;
  }
}
