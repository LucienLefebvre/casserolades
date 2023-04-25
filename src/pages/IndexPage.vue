<template>
  <sound-player />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import SoundPlayer from 'src/components/SoundPlayer.vue';
import { useSoundsStore } from 'src/stores/sound-store';

const soundsStore = useSoundsStore();

onMounted(() => {
  soundsStore.initAudio();
  soundsStore.loadAllSounds();
});
</script>
