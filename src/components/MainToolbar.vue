<template>
  <q-toolbar
    class="main-toolbar"
    :style="{ height: soundsStore.toolBarHeight + 'px' }"
  >
    <q-toolbar-title> Casserolades </q-toolbar-title>
    <q-btn-dropdown
      v-if="soundsStore.engine?.mode === PlayerMode.Notes"
      label="Son"
      color="green"
    >
      <q-list>
        <div v-for="index in 12" :key="index">
          <q-item
            clickable
            v-close-popup
            @click="soundSelectorClicked(index - 1)"
          >
            <q-item-section>
              <q-item-label>Son {{ index }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-btn-dropdown>
    <q-btn
      v-if="soundsStore.engine?.mode === PlayerMode.Casserolade"
      flat
      round
      dense
      icon="restart_all"
      @click="stopButtonClicked()"
    />
    <q-btn
      v-if="soundsStore.engine?.mode === PlayerMode.Casserolade"
      flat
      round
      dense
      icon="stop"
      @click="stopButtonClicked()"
    />
    <q-btn
      v-if="soundsStore.engine?.mode === PlayerMode.Casserolade"
      color="green"
      label="Générer"
      @click="generateButtonClicked()"
    />
    <q-btn
      flat
      round
      dense
      :icon="
        soundsStore.engine?.mode === PlayerMode.Casserolade
          ? 'music_note'
          : 'repeat_on'
      "
      @click="toggleModeButtonClicked()"
    />
    <q-btn flat round dense icon="help" @click="aboutButtonClicked()" />
  </q-toolbar>
</template>

<script setup lang="ts">
import { PlayerMode } from 'src/components/models';
import { useSoundsStore } from 'src/stores/sound-store';
const soundsStore = useSoundsStore();
function generateButtonClicked() {
  soundsStore.generateRandomCasserolade();
}

function stopButtonClicked() {
  soundsStore.stopAllSounds();
}

function toggleModeButtonClicked() {
  if (soundsStore.engine?.mode === PlayerMode.Casserolade) {
    soundsStore.launchTonalMode();
  } else if (soundsStore.engine?.mode === PlayerMode.Notes) {
    soundsStore.launchCasseroladeMode();
  }
}

function soundSelectorClicked(id: number) {
  soundsStore.tonalSoundID = id;
}

function aboutButtonClicked() {
  soundsStore.showAboutWindow = true;
}
</script>

<style scoped></style>
