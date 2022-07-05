import Context from "./Context";
import { iContextConfig } from "./type";

export let context: Context;

export default function init(
  canvas: HTMLCanvasElement,
  config: iContextConfig
) {
  if (!context) {
    context = new Context(canvas, config);
    context.update();
  }
  context.updateCanvas(config);
}

