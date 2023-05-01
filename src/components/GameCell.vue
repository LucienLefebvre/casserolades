<template>
  <div>
    <div
      class="column justify-center"
      @click="soundClicked()"
      style="
        display: flex;
        text-align: center;
        border: 4px solid;
        border-radius: 10px;
      "
      :style="{
        height: getCellHeight(),
        borderColor: getBorderColor(),
      }"
    >
      id: {{ props.id }}
      <div class="image-container">
        <img class="img" draggable="false" ref="imageRef" alt="Casserole" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from 'vue';

import { useSoundsStore } from 'src/stores/sound-store';

const soundsStore = useSoundsStore();

onMounted(() => {
  console.log('props.id', props.id);
});

const props = defineProps({
  id: { type: Number, required: true },
});

function soundClicked() {
  if (props.id === soundsStore.activeCell) {
    soundsStore.activeCellClicked();
  } else {
  }
}

function getCellHeight() {
  return `calc((100vh - ${
    soundsStore.toolBarHeight +
    soundsStore.meterHeight +
    soundsStore.gameInfoHeight
  }px) / ${soundsStore.numberOfGameRows} - 5px)`;
}

function getBorderColor() {
  if (soundsStore.activeCell === props.id) {
    return 'red';
  } else {
    return 'rgba(0, 0, 0, 0.7)';
  }
}
</script>

<style scoped>
.player-style {
  display: flex;
  text-align: center;
  height: 150px;
  border: 5px solid;
}
.text-style {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
}
.img {
  max-width: 100%;
  pointer-events: none;
}

.blur-backdrop {
  backdrop-filter: blur(10px) !important;
  background-color: white !important;
}
</style>
