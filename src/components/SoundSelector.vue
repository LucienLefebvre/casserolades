<template>
  <div>
    <q-btn-dropdown
      v-if="soundsStore.engine?.mode === PlayerMode.Notes"
      :label="`Son ${soundsStore.tonalSoundID + 1}`"
      color="green"
    >
      <q-list>
        <div v-for="index in 12" :key="index">
          <q-item
            clickable
            v-close-popup
            @click="soundSelectorClicked(index - 1)"
            :style="{
              'background-color':
                soundsStore.tonalSoundID === index - 1 ? 'green' : 'white',
            }"
          >
            <q-item-section>
              <q-item-label>Son {{ index }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useSoundsStore } from 'src/stores/sound-store';
import { PlayerMode } from 'src/components/models';

const soundsStore = useSoundsStore();

function soundSelectorClicked(id: number) {
  soundsStore.tonalSoundID = id;
}
</script>

<style scoped></style>
