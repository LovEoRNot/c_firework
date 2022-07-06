import getConfig from "../config";
import FireWork from "./FireWork";
import { IPoint } from "./type";

let fireworks: FireWork[] = [];

export function spawnFirework(point?: IPoint) {
  fireworks.push(new FireWork(point));
}

export default function render() {
  if (fireworks.length < getConfig().maxCount) {
    spawnFirework();
  }

  fireworks.forEach((s) => s.update());

  fireworks = fireworks.filter((s) => !s.isStop);
}
