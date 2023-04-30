<template>
  <div style="background-color: red" @click="stopCartonRougeMode()"></div>
</template>

<script setup lang="ts">
import { useSoundsStore } from 'src/stores/sound-store';
const soundsStore = useSoundsStore();

function stopCartonRougeMode() {
  soundsStore.cartonRougeMode = false;
  soundsStore.stopAllSounds();
}
</script>

<style scoped></style>
