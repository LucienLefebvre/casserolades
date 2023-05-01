<template>
  <div>
    <q-card>
      <q-btn label="Start Game" @click="startGameButtonClicked()"
    /></q-card>
  </div>
</template>

<script setup lang="ts">
import { start } from 'repl';
import { useSoundsStore } from 'src/stores/sound-store';
const soundsStore = useSoundsStore();

function startGameButtonClicked() {
  soundsStore.launchGame();
}
</script>

<style scoped></style>
