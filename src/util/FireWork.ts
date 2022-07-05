import { context } from ".";
import { randomColor, randomNumber, randomSpeed } from "./random";
import Spark from "./Spark";
import { IContainer, IPoint, ISpeed } from "./type";

export default class FireWork extends Spark {
  startPoint: IPoint;
  willBomb = true;
  sparks: Spark[] = [];
  container: IContainer;

  constructor() {
    const { canvasHeight, canvasWidth } = context;
    const container: IContainer = {
      position: { x: 0, y: 0 },
      width: canvasWidth,
      height: canvasHeight,
    };
    const radius = randomNumber(1, 3);
    const startPoint = {
      x: randomNumber(0, canvasWidth),
      y: canvasHeight - radius - 2,
    };
    const speed: ISpeed = { vx: 0, vy: -randomNumber(3, 6), ax: 0, ay: 0.03 };
    super(
      startPoint,
      speed,
      container,
      radius,
      randomColor(randomNumber(25 * radius, 30 * radius))
    );
    this.startPoint = startPoint;
    this.container = container;
    this.willBomb = Math.random() > 0.5;
  }

  initSparks() {
    if (this.sparks.length) return;
    const { vy } = this.originSpeed;
    console.log(vy);
    const length = randomNumber(100, 150);
    for (let i = 0; i < length; i++) {
      const speed = randomSpeed(5);
      this.sparks.push(
        new Spark(
          { ...this.currentPoint },
          speed,
          this.container,
          this.radius,
          this.color,
          randomNumber(-10 * vy, -20 * vy)
        )
      );
    }
  }

  checkPosition() {
    if (this.checkOutOfBounds()) {
      this.isStop = true;
    } else {
      if (this.sparks.length && this.sparks.every((s) => s.isStop)) {
        this.isStop = true;
      }
    }
  }

  update() {
    if (this.isStop) return;
    this.move();
    if (Math.abs(this.speed.vy) > Math.abs(this.speed.ay)) {
      this.draw();
    } else if (this.willBomb) {
      this.initSparks();
      this.sparks.forEach((spark) => {
        spark.update();
      });
      this.clearSpeed();
    } else {
      this.clearSpeed();
      this.isStop = true;
    }
    this.checkPosition();
  }
}
