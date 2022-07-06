import getConfig from "../config";
import Color from "./Color";
import { ISpeed } from "./type";

// get a random number between min and max,
export function randomNumber(min: number, max: number, floatNumber = 0) {
  const _min = Math.min(min * 100) | 0;
  const _max = Math.max(max * 100) | 0;
  const num = (Math.random() * (_max - _min) + _min) / 100;

  return +num.toFixed(floatNumber);
}

type ColorConfig = {
  h?: number | number[];
  s?: number | number[];
  l?: number | number[];
};

export function randomColor(config?: ColorConfig) {
  const { h, s, l } = config || {};

  const f = (n: number | number[] | undefined, range: number[]) => {
    if (n === undefined) return randomNumber(range[0], range[1]);
    return Array.isArray(n) ? randomNumber(n[0], n[1]) : n;
  };

  const _h = f(h, [0, 360]);
  const _s = f(s, [0, 100]);
  const _l = f(l, [0, 100]);
  return new Color(_h, _s, _l);
}

// 随即生成一个速度信息
export function randomSpeed(maxSpeed = 5): ISpeed {
  // 生成一个随机的飞行角度
  const randomAngle = (randomNumber(0, 360) / 180) * Math.PI;
  // 生成一个随机的速度值，然后根据飞行角度计算出对应的横纵向速度
  const speed = randomNumber(0, maxSpeed, 2);
  const vx = speed * Math.sin(randomAngle);
  const vy = speed * Math.cos(randomAngle);
  return {
    vx,
    vy,
    ax: 0, // 默认无水平方向加速度
    ay: getConfig().gravity,
  };
}
