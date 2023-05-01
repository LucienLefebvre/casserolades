<template>
  <div>
    <GameRemainingTime />
    <GameHitsDisplay />
  </div>
</template>

<script setup lang="ts">
import { useSoundsStore } from 'src/stores/sound-store';
import GameRemainingTime from './GameRemainingTime.vue';
import GameHitsDisplay from './GameHitsDisplay.vue';
const soundsStore = useSoundsStore();
</script>

<style scoped></style>
