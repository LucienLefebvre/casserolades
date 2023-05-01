<template>
  <q-btn
    @click="soundsStore.showMelodyPanel = false"
    icon="close"
    color="white"
    flat
    round
    dense
    size="20px"
  />
  <q-card class="dialog">
    <div style="justify-content: center">
      <div style="display: flex; justify-content: center">
        <SoundSelector />
      </div>
      <div class="separator"></div>
      <div style="display: flex; justify-content: center">
        <q-btn
          class="button"
          label="♫ On est là ♫"
          @click="onEstLaButtonClicked()"
          :style="{
            color:
              soundsStore.melodyLaunched && soundsStore.playingMelodyID === 1
                ? 'green'
                : 'white',
          }"
        />
      </div>
      <div class="separator"></div>
      <div style="display: flex; justify-content: center">
        <q-btn
          class="button"
          label="♫ L'internationale ♫"
          @click="linternationaleButtonClicked()"
          :style="{
            color:
              soundsStore.melodyLaunched && soundsStore.playingMelodyID === 2
                ? 'green'
                : 'white',
          }"
        />
      </div>
      <div class="separator"></div>

      <div style="display: flex; justify-content: center">
        <q-btn
          class="button"
          label="♫ La retraite ♫"
          @click="laRetraiteButtonClicked()"
          :style="{
            color:
              soundsStore.melodyLaunched && soundsStore.playingMelodyID === 0
                ? 'green'
                : 'white',
          }"
        />
      </div>
      <div class="separator"></div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { useSoundsStore } from 'src/stores/sound-store';
import SoundSelector from 'src/components/SoundSelector.vue';
const soundsStore = useSoundsStore();

function onEstLaButtonClicked() {
  if (soundsStore.melodyLaunched) {
    soundsStore.shouldStopMelody = true;
  } else soundsStore.launchOnEstLaMelody();
}

function laRetraiteButtonClicked() {
  if (soundsStore.melodyLaunched) {
    soundsStore.shouldStopMelody = true;
  } else soundsStore.launchLaRetraiteMelody();
}

function linternationaleButtonClicked() {
  if (soundsStore.melodyLaunched) {
    soundsStore.shouldStopMelody = true;
  } else soundsStore.launchLinternationaleMelody();
}
</script>

<style scoped>
.dialog {
  width: 80vw;
  justify-content: center;
  padding: 10px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.5);
}
.button {
  background-color: red;
}
.separator {
  height: 20px;
}
</style>
