import { context } from ".";
import getConfig from "../config";
import { randomColor, randomNumber, randomSpeed } from "./random";
import Spark from "./Spark";
import { IContainer, IPoint, ISpeed } from "./type";
export default class FireWork extends Spark {
  startPoint: IPoint;
  willBomb = true;
  sparks: Spark[] = [];
  container: IContainer;

  /**
   * @param position 指定绽放的位置，只取x轴方向
   */
  constructor(position?: IPoint) {
    const { canvasHeight, canvasWidth } = context;
    const {
      gravity,
      firework: { radiusRange, speedRange },
    } = getConfig();

    const container: IContainer = {
      position: { x: 0, y: 0 },
      width: canvasWidth,
      height: canvasHeight,
    };
    const radius = randomNumber(radiusRange[0], radiusRange[1]);
    const startPoint = {
      x: position ? position.x : randomNumber(0, canvasWidth),
      y: canvasHeight - radius - 2,
    };
    const speed: ISpeed = {
      vx: randomNumber(-0.5, 0.5, 2),
      vy: randomNumber(speedRange[0], speedRange[1], 1),
      ax: 0,
      ay: gravity,
    };
    const ratio = (100 / radiusRange[1]) * radius;
    const color = randomColor({ s: ratio, l: ratio });

    super(startPoint, speed, container, radius, color);
    this.startPoint = startPoint;
    this.container = container;
    this.willBomb = Math.random() > 0.3;
  }

  initSparks() {
    // 如果已经初始化过的话就不再重新执行
    if (this.sparks.length) return;
    const {
      spark: { maxSpeed, sizeRange, radiusRange },
    } = getConfig();
    const { vy } = this.originSpeed;
    const length = randomNumber(sizeRange[0], sizeRange[1]);
    const frameBasic = -context.fps / 4;

    // 生成若干个火花
    for (let i = 0; i < length; i++) {
      // 颜色基于烟花的颜色，同时增加60度的可选范围
      const color = randomColor({
        h: [this.color.hue - 30, this.color.hue + 30],
        s: this.color.saturation,
        l: this.color.lightness,
      });

      this.sparks.push(
        new Spark(
          { ...this.currentPoint },
          randomSpeed(maxSpeed),
          this.container,
          randomNumber(radiusRange[0], radiusRange[1]),
          color,
          // 火花的停留帧数与烟花的起始速度相关，速度越大，停留时间越长
          randomNumber(frameBasic * vy, frameBasic * 2 * vy)
        )
      );
    }
  }

  checkPosition() {
    if (this.checkInvisible()) {
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
