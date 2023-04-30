<template>
  <div>
    <div
      class="column justify-center"
      @click="soundClicked()"
      @dblclick="optionsClicked()"
      v-touch-hold.click="() => optionsClicked()"
      style="
        display: flex;
        text-align: center;
        border: 4px solid;
        border-radius: 10px;
      "
      :style="{
        borderColor: getBorderColor(),
        height: getPlayerHeight(),
      }"
    >
      <div
        class="text-style"
        v-if="soundsStore.engine?.mode === PlayerMode.Casserolade"
      >
        <div class="image-container">
          <img
            class="img"
            draggable="false"
            :src="sound.imagePath"
            ref="imageRef"
            alt="Casserole"
            :style="{ opacity: sound.isLaunched ? 1 : 0.4 }"
          />
        </div>
      </div>
      <div
        class="text-style"
        v-if="soundsStore.engine?.mode === PlayerMode.Notes"
        style="height: 100%"
      >
        {{ soundsStore.notesArray[sound.id] }}
      </div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref } from 'vue';
import { PlayerMode, SoundModel } from './models';
import {
  playSound,
  toggleLaunchStopSound,
} from 'src/composables/sound-controller';
import { useSoundsStore } from 'src/stores/sound-store';

const soundsStore = useSoundsStore();
const props = defineProps({
  sound: { type: Object as PropType<SoundModel>, required: true },
});
const sound = ref(props.sound);

function soundClicked() {
  if (soundsStore.engine === null) return;
  if (soundsStore.engine.mode === PlayerMode.Casserolade) {
    toggleLaunchStopSound(sound.value, soundsStore.engine);
  } else if (soundsStore.engine.mode === PlayerMode.Notes) {
    playSound(
      soundsStore.sounds[soundsStore.tonalSoundID],
      soundsStore.engine,
      sound.value.id
    );
  }
}

function optionsClicked() {
  if (soundsStore.engine === null) return;
  if (soundsStore.engine.mode === PlayerMode.Notes) return;
  soundsStore.editedSound = sound.value;
  soundsStore.showEditWindow = true;
}

function getBorderColor() {
  if (sound.value.isLaunched) {
    return 'green';
  } else {
    return 'rgba(255, 0, 0, 0.4)';
  }
}

function getPlayerHeight() {
  return `calc((100vh - ${
    soundsStore.toolBarHeight + soundsStore.meterHeight
  }px) / ${soundsStore.rows} - 5px)`;
}
</script>

<style scoped>
.player-style {
  display: flex;
  text-align: center;
  height: 150px;
  border: 5px solid;
}
.text-style {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
}
.img {
  max-width: 100%;
  pointer-events: none;
}

.blur-backdrop {
  backdrop-filter: blur(10px) !important;
  background-color: white !important;
}
</style>
