<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

import initCanvas, { context } from "../util";
import { spawnFirework } from "../util/render";

interface Props {
  width?: number; // canvas width
  height?: number; // canvas height
}

const props = withDefaults(defineProps<Props>(), {
  width: 100,
  height: 100,
});

const canvasRef = ref<HTMLCanvasElement>();

// watch the change of width and height to change the canvas instantly
watch([() => props.width, () => props.height], ([width, height]) => {
  initCanvas(canvasRef.value!, { width, height });
});

onMounted(() => {
  window.addEventListener("click", spawnFirework);
});
onBeforeUnmount(() => {
  window.removeEventListener("click", spawnFirework);
  context.stop();
});
</script>
