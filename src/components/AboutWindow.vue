<template>
  <q-btn
    @click="soundsStore.showAboutWindow = false"
    icon="close"
    color="white"
    flat
    round
    dense
    size="20px"
  />
  <q-card>
    <div style="margin: 10px">
      <div>
        <div class="text-center text-red" style="font-size: 20px">
          Des casseroles pour Macron !!!
        </div>
        <br />
        Comment ça marche ?
        <br />
        <p>
          <b>Deux modes :</b><br />

          <i>- Mode "Casserolade"</i><br />
          Un clic sur une casserole pour la lancer. <br />
          Un appui long sur une case permet de régler les paramètres de chaque
          casserole. <br />
          Cliquez sur le bouton "générer" pour lancer une casserolade aléatoire.
          <br />
          Rafraichir la page pour tout remettre à zéro.
          <br />
          <i>- Mode "Notes"</i><br />
          Cliquez sur la note dans la barre du haut pour y accéder. <br />
          Cliquez sur une case pour jouer une note. La séléction du son de
          casserole se fait avec le menu déroulant en haut de l'écran
          <br />
          <br />
          Site optimisé pour mobile. <br />
        </p>
        <br />
        <div style="text-align: center">
          <a
            class="text-center"
            href="https://twitter.com/CasserolesApp"
            target="_blank"
            >Twitter</a
          >
          <br />
        </div>
        <div style="text-align: center">
          contact@descasserolespourmacron.fr <br />
          <a
            class="text-center"
            href="https://github.com/LucienLefebvre/casserolades"
            target="_blank"
            >Source sur GitHub</a
          >
          <br />
          Version 1.0.0
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { useSoundsStore } from 'src/stores/sound-store';

const soundsStore = useSoundsStore();
</script>

<style scoped></style>
