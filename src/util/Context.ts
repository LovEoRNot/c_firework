import render from "./render";
import { iContextConfig, SpeedContext } from "./type";

let now: number;

export default class Context {
  canvasWidth = 0;
  canvasHeight = 0;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  speedContext: SpeedContext;
  fps = 60; // 刷新率
  frame = 0; // 统计当前的刷新率

  raf?: number;

  constructor(canvas: HTMLCanvasElement, config: iContextConfig) {
    this.canvas = canvas;
    this.updateCanvas(config);
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.speedContext = {
      h_revert: false,
      v_revert: true,
    };

    now = Date.now();
  }

  changeSpeedContext(speedContext: SpeedContext) {
    this.speedContext = speedContext;
  }

  updateCanvas({ width, height }: iContextConfig) {
    this.canvasHeight = height;
    this.canvasWidth = width;
    this.canvas.height = height;
    this.canvas.width = width;
  }

  getContext() {
    return this.context;
  }

  stop = () => {
    this.raf && cancelAnimationFrame(this.raf);
  };

  start = () => {
    this.update();
  };

  update = () => {
    if (!this.context) return;

    this.getFPS();
    this.drawContainer();
    this.showFPS();
    render();
    this.raf = requestAnimationFrame(this.update);
  };

  // 简单计算一下当前屏幕的刷新率，因为烟花的持续时间需要通过这个来计算
  getFPS = () => {
    this.frame++;
    if (Date.now() - now > 1000) {
      this.fps = this.frame;
      this.frame = 0;
      now = Date.now();
    }
  };

  showFPS = () => {
    this.context.font = "16px sans-serif";
    this.context.fillStyle = "#fff";
    this.context.fillText(`fps: ${this.fps}`, 20, 30, 100);
  };

  drawContainer = () => {
    this.context.fillStyle = "rgba(0,0,0,0.2)";
    this.context.rect(0, 0, this.canvasWidth, this.canvasHeight);
    this.context.fill();
  };
}
