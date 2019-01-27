import React, { Component } from 'react';
import Turtle from 'turtle-canvas/browser/turtle-canvas.min';
import JeremyVisual1 from './visuals/jeremyVisual1';
import JeremyVisual2 from './visuals/jeremyVisual2';
import DaphneVisual1 from './visuals/daphneVisual1';
import DaphneVisual2 from './visuals/daphneVisual2';
import DaphneVisual3 from './visuals/daphneVisual3';
import DaphneVisual4 from './visuals/daphneVisual4';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visuals: []
    };

    this.audioPlayer = null;
    this.audioContext = null;
    this.audioPlayerSource = null;
    this.audioAnalyser = null;
    this.bufferLength = 0;
    this.dataArray = null;
    this.canvas = null;
    this.canvasContext = null;
    this.backgroundFillStyle = '';
    this.pen = null;
    this.processAudioHandle = null;
    this.selectedVisual = 0;
    this.audioPlayerFile = null;
    this.fullscreen = false;
    this.visualsList = null;
  }

  componentDidMount() {
    this.canvas.width = 800;
    this.canvas.height = 600;

    this.canvas.addEventListener('click', () => {
      if (!this.fullscreen) {
        this.audioPlayer.style = 'display: none';
        this.audioPlayerFile.style = 'display: none';
        this.visualsList.style = 'display: none';
        this.canvas.style = 'border: none';
        document.getElementsByTagName("body")[0].style = 'background: #000000';
        document.documentElement.requestFullscreen();
        this.fullscreen = true;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      }
    });

    this.exitFullscreen = this.exitFullscreen.bind(this);

    document.addEventListener('fullscreenchange', this.exitFullscreen);
    document.addEventListener('webkitfullscreenchange', this.exitFullscreen);
    document.addEventListener('mozfullscreenchange', this.exitFullscreen);
    document.addEventListener('MSFullscreenChange', this.exitFullscreen);

    this.setState(() => ({
      visuals: [
        new JeremyVisual1('Jeremy Visual 1', this.canvas),
        new JeremyVisual2('Jeremy Visual 2', this.canvas),
        new DaphneVisual1('Daphne Visual 1', this.canvas),
        new DaphneVisual2('Daphne Visual 2', this.canvas),
        new DaphneVisual3('Daphne Visual 3', this.canvas),
        new DaphneVisual4('Daphne Visual 4', this.canvas),
      ]
    }));

    this.createAudioPlayer();
    this.createAudioContext(() => {
      this.createAudioPlayerSource();
      this.createAudioAnalyzer(2048);
      this.createAudioBuffer();
      this.fillAudioBuffer();
      this.connectAudioPlayerSourceToAudioAnalyzer();
      this.connectAudioAnalyzerToDestination();
      this.createCanvasContext();
      this.createTurtle();
      this.changeVisual(this.selectedVisual);
      this.audioPlayerFile.onchange = this.changeAudioFile.bind(this);
      this.processAudio();
    });
  }

  exitFullscreen() {
    if (this.fullscreen && !document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
      this.audioPlayer.style = 'display: inline-block';
      this.audioPlayerFile.style = 'display: inline-block';
      this.visualsList.style = 'display: block';
      this.canvas.style = 'border: 1px solid silver';
      document.getElementsByTagName("body")[0].style = 'background: #FFFFFF';
      this.fullscreen = false;
      this.canvas.width = 800;
      this.canvas.height = 600;
    }
  }

  createAudioPlayer() {
    this.audioPlayer.src = 'audio/defcronyke-bucket_dumpster-02-touch_you.ogg';
    this.audioPlayer.setAttribute('type', 'audio/ogg');
    this.audioPlayer.setAttribute('controls', '');
    this.audioPlayer.id = 'audio-player';
  }

  createAudioContext(callback) {
    this.audioPlayer.onplay = () => {
      if (!this.audioContext) {
        this.audioContext = new AudioContext();

        if (typeof callback === 'function') {
          callback();
        }
      }
    };
  }

  createAudioPlayerSource() {
    this.audioPlayerSource = this.audioContext.createMediaElementSource(this.audioPlayer);
  }

  createAudioAnalyzer(fftSize) {
    this.audioAnalyser = this.audioContext.createAnalyser();
    this.audioAnalyser.fftSize = fftSize;
    this.bufferLength = this.audioAnalyser.frequencyBinCount;
  }

  createAudioBuffer() {
    this.dataArray = new Uint8Array(this.bufferLength);
  }

  fillAudioBuffer() {
    this.audioAnalyser.getByteTimeDomainData(this.dataArray);
  }

  connectAudioPlayerSourceToAudioAnalyzer() {
    this.audioPlayerSource.connect(this.audioAnalyser);
  }

  connectAudioAnalyzerToDestination() {
    this.audioAnalyser.connect(this.audioContext.destination);
  }

  createCanvasContext() {
    this.canvasContext = this.canvas.getContext('2d');
    this.canvasContext.fillStyle = 'rgba(0, 0, 0, 1.0)';
    this.canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.backgroundFillStyle = 'rgba(0, 0, 0, 1.0)';
  }

  createTurtle() {
    this.pen = new Turtle.TURTLE(this.canvas);
    this.pen.moveTo(this.canvas.width / 2, this.canvas.height / 2);
  }

  processAudio() {
    this.processAudioHandle = requestAnimationFrame(this.processAudio.bind(this));
    this.audioAnalyser.getByteTimeDomainData(this.dataArray);
    let skip = true;

    for (let i = 0; i < this.bufferLength; i++) {
      let data = this.dataArray[i];

      if (data !== 128) {
        skip = false;
      }
    }

    if (skip) {
      return;
    }

    if (this.state.visuals.length > this.selectedVisual) {
      this.state.visuals[this.selectedVisual].draw.bind(this)();
    }
  }

  changeVisual(visualNum) {
    this.selectedVisual = visualNum;

    if (this.state.visuals.length > visualNum) {
      console.log('Changing to visual: ' + this.state.visuals[this.selectedVisual].name);
      this.state.visuals[this.selectedVisual].init.bind(this)();
    }
  }

  changeAudioFile() {
    if (this.audioPlayerFile.files[0]) {
      this.audioPlayer.src = URL.createObjectURL(this.audioPlayerFile.files[0]);
      this.createAudioContext();
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <canvas ref={e => this.canvas = e} style={{ border: '1px solid silver' }} />
        </div>
        <div>
          <audio ref={e => this.audioPlayer = e} />
        </div>
        <div>
          <input ref={e => this.audioPlayerFile = e} type="file" />
        </div>
        <div ref={e => this.visualsList = e}>
          {this.state.visuals.map((v, i) => {
            return (
              <p key={i}>
                <span onClick={() => this.changeVisual(i)} style={{ cursor: 'pointer' }}>{v.name}</span>
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}
