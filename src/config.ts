import { context } from "./util";

const config = {
  gravity: 0.01,
  maxCount: 30, // 同屏最大的烟花数量
  firework: {
    radiusRange: [1, 3], // 发射杆半径
    speedRange: [-1, -5], // 发射杆速度
  },
  spark: {
    radiusRange: [1, 3], // 火花半径
    maxSpeed: -4, // 火花最大速度
    sizeRange: [10, 200], // 火花数量
  },
};

const {
  firework: { speedRange },
  spark: { maxSpeed },
  gravity,
} = config;
function changeSpeed() {
  // 物体运动的速度根据帧率进行换算，换算公式满足(60,1),(120,0.75),以60帧为基础
  // 120帧时为基础的0.75倍，不然帧率过大会导致烟花的持续时间被缩短
  const ratio = 1.25 - context.fps / 240;
  config.firework.speedRange = speedRange.map((s) => s * ratio);
  config.spark.maxSpeed = maxSpeed * ratio;
  config.gravity = gravity * ratio;
  return config;
}

export default function getConfig() {
  // 矫正速度
  changeSpeed();
  return config;
}
