<template>
  <div v-if="soundsStore.soundsLoaded">
    <PeakMeter
      :analyser-object="soundsStore.stereoAnalyser"
      class="metersStyle"
    />
    <div class="row">
      <div class="player-row" v-for="index in soundsStore.rows" :key="index">
        <SinglePlayer :sound="soundsStore.sounds[index - 1]" />
      </div>
      <div class="player-row" v-for="index in soundsStore.rows" :key="index">
        <SinglePlayer :sound="soundsStore.sounds[index + 5]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import SinglePlayer from './SinglePlayer.vue';
import { useSoundsStore } from 'src/stores/sound-store';
import PeakMeter from './PeakMeter.vue';
const soundsStore = useSoundsStore();

watch(
  () => soundsStore.showMelodyPanel,
  () => {
    if (!soundsStore.showMelodyPanel) {
      soundsStore.shouldStopMelody = true;
    }
  }
);
</script>

<style scoped>
.player-column {
  display: flex;
}

.player-row {
  padding: 2px;
  width: 50vw;
}
.metersStyle {
  height: 30px;
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 2px;
}
</style>
