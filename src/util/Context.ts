import render from "./render";
import { iContextConfig, SpeedContext } from "./type";

export default class Context {
  canvasWidth = 0;
  canvasHeight = 0;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  speedContext: SpeedContext;
  gravity = 0;

  raf?: number;

  constructor(canvas: HTMLCanvasElement, config: iContextConfig) {
    this.canvas = canvas;
    this.updateCanvas(config);
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.speedContext = {
      h_revert: false,
      v_revert: true,
    }
    this.gravity = 0.01
  }

  changeSpeedContext(speedContext: SpeedContext) {
    this.speedContext = speedContext;
  }

  changeGravity(gravity: number) {
    this.gravity = gravity;
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

  update = () => {
    this.drawContainer();
    render();
    this.raf = requestAnimationFrame(this.update);
  };

  drawContainer = () => {
    // this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.context.fillStyle = "rgba(0,0,0,0.2)";
    this.context.rect(0, 0, this.canvasWidth, this.canvasHeight);
    this.context.fill();
  }
}
