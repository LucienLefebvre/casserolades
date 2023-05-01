<template>
  <div>
    <canvas :width="canvasWidth()" class="progress-bar" ref="canvas"> </canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSoundsStore } from 'src/stores/sound-store';
import { lerpRGBAColor } from 'src/composables/color-helpers';
const soundsStore = useSoundsStore();

const canvas = ref<HTMLCanvasElement | null>(null);
var canvasCtx = null as CanvasRenderingContext2D | null;

onMounted(() => {
  if (canvas.value) {
    canvasCtx = canvas.value.getContext('2d');

    const animate = () => {
      drawBar();
      requestAnimationFrame(animate);
    };
    animate();
  }
});

function drawBar() {
  if (!canvasCtx) return;
  if (soundsStore.engine?.audioContext.currentTime === undefined) return;
  if (soundsStore.activeSonPol.length === undefined) return;
  if (soundsStore.activeSonPol.startTime === undefined) return;
  const elapsedTime =
    soundsStore.engine?.audioContext.currentTime -
    soundsStore.activeSonPol.startTime;

  const remainingTime = soundsStore.activeSonPol.length - elapsedTime;
  const remainingTimePercentage =
    remainingTime / soundsStore.activeSonPol.length;

  const barWidth =
    Math.max(remainingTimePercentage, 0) * canvasCtx.canvas.width;

  const barHeight = canvasCtx.canvas.height;

  const barColor = lerpRGBAColor(
    [255, 0, 0, 1],
    [0, 255, 0, 1],
    remainingTimePercentage
  );

  canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
  canvasCtx.fillStyle = barColor;
  canvasCtx.fillRect(0, 0, barWidth, barHeight);
}

function canvasWidth() {
  return canvas.value?.clientWidth ?? 0;
}
</script>

<style scoped>
.progress-bar {
  width: 100%;
  height: 20px;
}
</style>
