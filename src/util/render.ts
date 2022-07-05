import FireWork from "./FireWork";
import Spark from "./Spark";

let sparks: Spark[] = [];

export default function render() {
  if (sparks.length < 20) {
    sparks.push(new FireWork());
  }

  sparks.forEach(s => s.update())

  sparks = sparks.filter(s => !s.isStop);
}
