import Particle from "./Particle";
import { context } from ".";
import Color from "./Color";
import { IContainer, IPoint, ISpeed } from "./type";

class Spark extends Particle {
  radius: number;
  color: Color;
  currentFrame = 0;
  stayFrame: number;

  constructor(
    startPoint: IPoint,
    speed: ISpeed,
    container: IContainer,
    radius: number,
    color: Color,
    stayFrame = 1000,
  ) {
    super(startPoint, speed, container);
    this.radius = radius;
    this.color = color;
    this.stayFrame = stayFrame
  }

  draw(): void {
    const ctx = context.getContext();
    const { x, y } = this.currentPoint;

    ctx.beginPath();
    const ratio = Math.floor((1 - (this.currentFrame / this.stayFrame) ** 2) * 50);
    this.color.lightness = ratio;
    ctx.fillStyle = this.color.getColor();
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  checkOutOfBounds() {
    const { x, y } = this.currentPoint;
    const {
      position: { x: startPointX, y: startPointY },
      width,
      height,
    } = this.container;
    if (
      x <= startPointX - this.radius ||
      y <= startPointY + this.radius ||
      x >= startPointX + width - this.radius ||
      y >= startPointY + height + this.radius
    ) {
      return true;
    }

    if (this.currentFrame > this.stayFrame) return true;

    return false;
  }

  checkPosition(): void {
    this.isStop = this.checkOutOfBounds();
  }

  update() {
    if (this.isStop) return;
    this.currentFrame++;
    this.move();
    this.draw();
    this.checkPosition();
  }
}

export default Spark;
