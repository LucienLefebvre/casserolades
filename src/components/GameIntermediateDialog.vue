<template>
  <div>
    <q-card>
      <div class="column container">
        <div style="font-size: 20px">Bravo ! Tu as réussi à faire taire</div>
        <div style="font-size: 30px; color: red">
          {{ soundsStore.activeSonPol.auteur }}
        </div>
        <div style="font-size: 20px">
          en {{ soundsStore.gameData.timeToReachHits.toFixed(1) }}s
        </div>
        <q-btn label="Suivant" @click="nextButtonClicked()" /></div
    ></q-card>
  </div>
</template>

<script setup lang="ts">
import { useSoundsStore } from 'src/stores/sound-store';
const soundsStore = useSoundsStore();

function nextButtonClicked() {
  soundsStore.launchNextPanel();
  //soundsStore.launchGame();
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
</style>
