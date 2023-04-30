<template>
  <q-layout view="hhh Lpr lFf">
    <q-header elevated>
      <q-toolbar
        class="main-toolbar"
        :style="{ height: soundsStore.toolBarHeight + 'px' }"
      >
        <q-toolbar-title
          v-if="soundsStore.engine?.mode === PlayerMode.Casserolade"
        >
          Casserolades
        </q-toolbar-title>
        <q-toolbar-title v-if="soundsStore.engine?.mode === PlayerMode.Notes">
          Mélodie
        </q-toolbar-title>
        <q-btn
          v-if="soundsStore.engine?.mode === PlayerMode.Notes"
          label="Mélodies"
          @click="openMelodyPanel()"
        />
        <SoundSelector />
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
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <q-dialog v-model="soundsStore.showEditWindow">
    <div class="column justify-center align-center">
      <SoundOptions />
    </div>
  </q-dialog>
  <q-dialog v-model="soundsStore.showAboutWindow">
    <div class="column justify-center align-center">
      <AboutWindow />
    </div>
  </q-dialog>
  <q-dialog v-model="soundsStore.showMelodyPanel">
    <div class="column justify-center align-center">
      <MelodyPanel />
    </div>
  </q-dialog>
  <q-dialog v-model="soundsStore.cartonRougeMode" maximized>
    <CartonRouge />
  </q-dialog>
</template>

<script setup lang="ts">
import { PlayerMode } from 'src/components/models';
import CartonRouge from 'src/components/CartonRouge.vue';
import { useSoundsStore } from 'src/stores/sound-store';
import SoundOptions from 'src/components/SoundOptions.vue';
import AboutWindow from 'src/components/AboutWindow.vue';
import MelodyPanel from 'src/components/MelodyPanel.vue';
import SoundSelector from 'src/components/SoundSelector.vue';
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

function openMelodyPanel() {
  soundsStore.showMelodyPanel = true;
}
</script>

<style>
.main-toolbar {
  background-color: red;
}
</style>
