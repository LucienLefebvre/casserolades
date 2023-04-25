<template>
  <q-btn
    @click="soundsStore.showEditWindow = false"
    icon="close"
    color="white"
    flat
    round
    dense
    size="20px"
  />
  <q-card class="dialog">
    <div style="justify-content: center">
      Volume
      <q-slider
        color="red"
        v-model="sound.volume"
        :min="-12"
        :max="12"
        :step="0.1"
        label
        :label-value="sound.volume + 'dB'"
      />
      <div class="row">
        <div class="column" style="width: 50%">Aléatoire</div>
        <div class="column" style="width: 50%">
          <q-slider
            color="red"
            v-model="sound.volumeRandomness"
            :min="0"
            :max="100"
            :step="1"
            style="width: 100%"
            label
            :label-value="sound.volumeRandomness + '%'"
          />
        </div>
      </div>
      <div class="separator"></div>
      Fréquence de répétiton
      <q-slider
        color="red"
        v-model="sound.repetitionRateMS"
        :min="50"
        :max="5000"
        :step="10"
        label
        :label-value="sound.repetitionRateMS / 1000 + 's'"
      />
      <div class="row">
        <div class="column" style="width: 50%">Aléatoire</div>
        <div class="column" style="width: 50%">
          <q-slider
            color="red"
            v-model="sound.repetitionRateRandomness"
            :min="0"
            :max="100"
            :step="1"
            style="width: 100%"
            label
            :label-value="sound.repetitionRateRandomness + '%'"
          />
        </div>
      </div>
    </div>
    <div class="separator"></div>
    <div>
      Pitch
      <q-slider
        color="red"
        v-model="sound.pitchCT"
        :min="-12"
        :max="+12"
        :step="1"
        label
        :label-value="sound.pitchCT"
      />
      <div class="row">
        <div class="column" style="width: 50%">Aléatoire</div>
        <div class="column" style="width: 50%">
          <q-slider
            color="red"
            v-model="sound.pitchRandomness"
            :min="0"
            :max="100"
            :step="1"
            style="width: 100%"
            label
            :label-value="sound.pitchRandomness + '%'"
          />
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { useSoundsStore } from 'src/stores/sound-store';

const soundsStore = useSoundsStore();
const sound = soundsStore.editedSound;
</script>

<style scoped>
.dialog {
  width: 80vw;
  justify-content: center;
  padding: 10px;
}
.separator {
  height: 1px;
  border: 1px solid;
  opacity: 0.5;
}
</style>
