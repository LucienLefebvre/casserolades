<template>
  <div>
    <PeakMeter
      :analyser-object="soundsStore.stereoAnalyser"
      class="metersStyle"
    />
    <GameInfo />
    <div class="row">
      <div
        class="player-row"
        v-for="index in soundsStore.numberOfGameRows"
        :key="index"
      >
        <GameCell :id="index - 1" />
      </div>
      <div
        class="player-row"
        v-for="index in soundsStore.numberOfGameRows"
        :key="index"
      >
        <GameCell :id="index + 4" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSoundsStore } from 'src/stores/sound-store';
import GameCell from './GameCell.vue';
import PeakMeter from './PeakMeter.vue';
import GameInfo from './GameInfo.vue';
const soundsStore = useSoundsStore();
</script>

<style scoped>
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
