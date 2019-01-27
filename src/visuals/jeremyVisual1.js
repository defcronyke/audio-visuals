export default class JeremyVisual1 {
  constructor(name, canvas) {
    this.name = name;
    this.canvas = canvas;
    this.backgroundFillStyle = '';
  }

  init() {
    this.c = this.canvas.getContext('2d');
  }

  draw() {
    let c = this.c;

    c.fillStyle = this.backgroundFillStyle;
    c.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.dataArray.length; i++) {
      let data = this.dataArray[i];

      let rand_r = Math.floor(Math.random() * 255);
      let rand_g = Math.floor(Math.random() * 255);
      let rand_b = Math.floor(Math.random() * 255);

      c.fillStyle = 'rgba(' + rand_r + ', 0, ' + rand_b + ', 1.0)';
      let rectWidth = Math.ceil(this.canvas.width / this.dataArray.length);
      c.fillRect((i + 1) * rectWidth, data, rectWidth, 15);

      c.fillStyle = 'rgba(0, ' + rand_g + ', ' + rand_b + ', 1.0)';
      c.fillRect((i + 1) * rectWidth, this.canvas.height - data, rectWidth, 15);

      if (data <= 8) {
        let rand_r = Math.floor(Math.random() * 255);
        let rand_g = Math.floor(Math.random() * 255);
        let rand_b = Math.floor(Math.random() * 255);

        c.fillStyle = 'rgba(' + this.dataArray[rand_r] + ', ' + this.dataArray[rand_g] + ', ' + this.dataArray[rand_b] + ', 1.0)';
        this.backgroundFillStyle = c.fillStyle;

        if (this.fullscreen) {
          document.getElementsByTagName("body")[0].style = 'background: ' + c.fillStyle;
        }
      }
    }
  }
}
