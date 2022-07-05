import { context } from ".";
import { IContainer, IPoint, ISpeed } from "./type";

/**
 * calculate correct speed
 * @param v current velocity
 * @param _v old velocity
 * @param isRevert allow revert
 */
function getSpeed(v: number, _v: number, isRevert: boolean) {
  if (isRevert) return v;

  if ((_v > 0 && v < 0) || (_v < 0 && v > 0)) {
    return 0;
  }

  return v;
}

function correctSpeed(speed: ISpeed) {
  const { ax, ay, vx, vy } = speed;
  const { h_revert, v_revert } = context.speedContext;
  const _vx = vx + ax;
  const _vy = vy + ay;

  speed.vx = getSpeed(_vx, vx, h_revert);
  speed.vy = getSpeed(_vy, vy, v_revert);

  if (!h_revert && speed.vx === 0) speed.ax = 0;
  if (!v_revert && speed.vy === 0) speed.ay = 0;
}

class Particle {
  startPoint: IPoint; // start point
  currentPoint: IPoint;
  speed: ISpeed; // move speed
  originSpeed: ISpeed;
  container: IContainer;
  isStop = false; // is the particle is stop

  constructor(startPoint: IPoint, speed: ISpeed, container: IContainer) {
    this.startPoint = { ...startPoint };
    this.currentPoint = startPoint;
    this.speed = speed;
    this.originSpeed = { ...speed };
    this.container = container;
  }

  move() {
    if (this.isStop) return;

    correctSpeed(this.speed);
    this.currentPoint.x += this.speed.vx;
    this.currentPoint.y += this.speed.vy;
  }

  clearSpeed() {
    this.speed.ax = 0;
    this.speed.ay = 0;
    this.speed.vx = 0;
    this.speed.vy = 0;
  }

  checkPosition() {
    //
  }

  draw() {
    console.error("don' called this function directly");
  }
}

export default Particle;
