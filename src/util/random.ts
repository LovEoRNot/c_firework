import { context } from ".";
import Color from "./Color";
import { ISpeed } from "./type";

// get a random number between min and max,
export function randomNumber(min: number, max: number, floatNumber = 0) {
  const _min = Math.min(min * 100) | 0;
  const _max = Math.max(max * 100) | 0;
  const num = (Math.random() * (_max - _min) + _min) / 100;

  return +num.toFixed(floatNumber);
}

export function randomColor(light = 100) {
  return new Color(randomNumber(0, 360), 100, light);
}

export function pos(): 1 | -1 {
  return Math.random() > 0.5 ? 1 : -1;
}

export function randomSpeed(maxSpeed = 5): ISpeed {
  const randomAngle = (randomNumber(0, 360) / 180) * Math.PI;
  const speed = randomNumber(0, maxSpeed, 2);
  const vx = speed * Math.sin(randomAngle);
  const vy = speed * Math.cos(randomAngle);
  return {
    vx,
    vy,
    ax: 0,
    ay: context.gravity,
  };
}
