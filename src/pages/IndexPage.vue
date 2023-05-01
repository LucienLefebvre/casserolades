<template>
  <div
    v-if="
      soundsStore.engine?.mode === (PlayerMode.Casserolade || PlayerMode.Notes)
    "
  >
    <sound-player />
  </div>
  <div v-else-if="soundsStore.engine?.mode === PlayerMode.FaitesLesTaire">
    <GameScreen />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import SoundPlayer from 'src/components/SoundPlayer.vue';
import { useSoundsStore } from 'src/stores/sound-store';
import { PlayerMode } from 'src/components/models';
import GameScreen from 'src/components/GameScreen.vue';

const soundsStore = useSoundsStore();

onMounted(() => {
  soundsStore.initAudio();
  soundsStore.loadAllSounds();
});
</script>
