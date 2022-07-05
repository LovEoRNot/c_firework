<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive } from "vue";
import FireworkVue from "./components/Firework.vue";

const state = reactive({
  width: 0,
  height: 0,
});

// eslint-disable-next-line @typescript-eslint/ban-types
const simpleDebounce = (fn: Function, time = 300, immediate = false) => {
  let t: number;
  return (...args: unknown[]) => {
    clearTimeout(t);

    if (!immediate) {
      immediate = true;
      fn(...args);
      t = setTimeout(() => {
        // 设一个假的定时器
      }, time);
    } else {
      t = setTimeout(() => {
        fn(...args);
      }, time);
    }
  };
};

const updateSize = simpleDebounce(() => {
  const { innerHeight, innerWidth } = window;
  state.height = innerHeight;
  state.width = innerWidth;
});

onMounted(() => {
  updateSize();
  window.addEventListener("resize", updateSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateSize);
});
</script>

<template>
  <FireworkVue v-bind="state" />
</template>

<style>
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  overflow: hidden;
}
</style>
