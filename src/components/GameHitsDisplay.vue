<template>
  <div>
    <canvas :width="canvasWidth()" class="progress-bar" ref="canvas"> </canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSoundsStore } from 'src/stores/sound-store';
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
  const hitsPercentage =
    soundsStore.gameData.numberOfHits /
    soundsStore.activeSonPol.numberOfHitsRequired;

  const barWidth = Math.max(hitsPercentage, 0) * canvasCtx.canvas.width;

  const barHeight = canvasCtx.canvas.height;

  canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
  canvasCtx.fillStyle = 'red';
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
