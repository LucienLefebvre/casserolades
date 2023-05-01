import { defineStore } from 'pinia';
import {
  SoundModel,
  StereoAnalyserObject,
  AudioEngine,
  PlayerMode,
  melodyNote,
  SonPolModel,
  GameData,
} from 'src/components/models';
import {
  launchSound,
  playSound,
  stopSound,
} from 'src/composables/sound-controller';

import { randomizeValueClipped } from 'src/composables/math-helpers';
import { onEstLaMelody } from 'src/tunes/onestla';
import { generateLaRetraiteMelody } from 'src/tunes/laretraitea60ans';
import { internationaleMelody } from 'src/tunes/internationale';
import { listeSonsPol } from './liste-sons-pol';

export const useSoundsStore = defineStore('sounds', {
  state: () => ({
    sounds: [] as SoundModel[],
    editedSound: {
      id: -1,
      name: 'dummy',
      buffer: null as AudioBuffer | null,
      isLaunched: false,
      isPlaying: false,
      volume: 0,
      volumeRandomness: 0,
      repetitionRateMS: 0,
      repetitionRateRandomness: 0,
      pitchCT: 0,
      pitchRandomness: 0,
      gainNode: null as GainNode | null,
    } as SoundModel,

    showEditWindow: false,
    showAboutWindow: true,
    showMelodyPanel: false,

    audioContext: null as AudioContext | null,
    stereoAnalyser: null as StereoAnalyserObject | null,
    engine: null as AudioEngine | null,
    soundsLoaded: false,

    toolBarHeight: 50,
    meterHeight: 30,
    rows: 6,
    columns: 2,
    numberOfSounds: 12,

    tonalSoundID: 0,

    melodyLaunched: false,
    shouldStopMelody: false,
    playingMelodyID: -1,

    cartonRougeMode: false,

    notesArray: [
      'Do',
      'Do#',
      'Ré',
      'Ré#',
      'Mi',
      'Fa',
      'Fa#',
      'Sol',
      'Sol#',
      'La',
      'La#',
      'Si',
    ] as string[],

    numberOfGameCells: 10,
    numberOfGameRows: 5,
    activeCell: -1,
    gameInfoHeight: 50,

    showGameStartDialog: false,
    showGameEndDialog: false,
    showGameIntermediateDialog: false,
    numberOfHitsPerSecondsRequired: 1,
    polSounds: [] as SonPolModel[],
    polSoundsIdSequence: [] as number[],
    activeSonPol: {
      name: '',
      imagePath: '',
      buffer: null as AudioBuffer | null,
      source: null as AudioBufferSourceNode | null,
    } as SonPolModel,

    gameData: {
      panelId: 0,
      score: 0,
      numberOfHits: 0,
      timeToReachHits: 0,
    } as GameData,
  }),
  getters: {},
  actions: {
    addSound(sound: SoundModel) {
      this.sounds.push(sound);
      const soundsNumber = this.sounds.length;
      console.log(`soundsNumber: ${soundsNumber}`);
    },

    initAudio() {
      this.audioContext = new AudioContext();
      if (this.audioContext === null) return;
      this.stereoAnalyser = {
        splitter: this.audioContext.createChannelSplitter(2),
        stereoAnalyser: this.audioContext.createAnalyser(),
        analysers: [
          this.audioContext.createAnalyser(),
          this.audioContext.createAnalyser(),
        ],
      };
      this.stereoAnalyser.splitter.connect(this.stereoAnalyser.analysers[0], 0);
      this.stereoAnalyser.splitter.connect(this.stereoAnalyser.analysers[1], 1);

      this.engine = {
        audioContext: this.audioContext,
        stereoAnalyser: this.stereoAnalyser,
        ouputGainNode: this.audioContext.createGain(),
        outputLimiterNode: this.audioContext.createDynamicsCompressor(),
        mode: PlayerMode.Casserolade,
      };

      this.engine.ouputGainNode.connect(this.engine.outputLimiterNode);
      this.engine.ouputGainNode.connect(this.engine.outputLimiterNode);

      this.engine.outputLimiterNode.connect(this.audioContext.destination);
      this.engine.outputLimiterNode.connect(
        this.engine.stereoAnalyser.splitter
      );

      this.engine.outputLimiterNode.threshold.setValueAtTime(-0.1, 0);
      this.engine.outputLimiterNode.knee.setValueAtTime(0.1, 0);
      this.engine.outputLimiterNode.ratio.setValueAtTime(20, 0);
      this.engine.outputLimiterNode.attack.setValueAtTime(0, 0);
      this.engine.outputLimiterNode.release.setValueAtTime(0.25, 0);
    },

    async loadAllSounds() {
      if (this.audioContext === null) return;

      const numFiles = this.numberOfSounds;
      const soundsFolderPath = 'src/assets/sounds/';
      const imageFolderPath = 'src/assets/images/';

      const soundFiles: string[] = [];
      const imageFiles: string[] = [];

      for (let i = 1; i <= numFiles; i++) {
        soundFiles.push(`${soundsFolderPath}${i}.mp3`);
        imageFiles.push(`${imageFolderPath}${i}.png`);
      }

      for (let i = 0; i < soundFiles.length; i++) {
        try {
          const response = await fetch(soundFiles[i]);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await this.audioContext?.decodeAudioData(
            arrayBuffer
          );
          if (audioBuffer === undefined) return;
          const sound: SoundModel = {
            id: i,
            name: soundFiles[i],
            imagePath: imageFiles[i],
            buffer: audioBuffer,
            isPlaying: false,
            isLaunched: false,
            volume: 0,
            volumeRandomness: 0,
            repetitionRateMS: 1000,
            repetitionRateRandomness: 0,
            pitchCT: 0,
            pitchRandomness: 0,
            gainNode: this.audioContext.createGain(),
          };
          this.addSound(sound);

          if (i === soundFiles.length - 1) {
            console.log('All sounds loaded');
            this.soundsLoaded = true;
          }
        } catch (error) {
          console.error(`Failed to load sound file: ${soundFiles[i]}`);
        }
      }
    },

    async loadOneSoundInEachPlayer(id: number) {
      this.soundsLoaded = false;
      if (this.audioContext === null) return;
      this.sounds = [];

      const soundsFolderPath = 'src/assets/sounds/';
      const imageFolderPath = 'src/assets/images/';
      const soundFiles: string[] = [];
      const imageFiles: string[] = [];

      for (let i = 0; i < this.numberOfSounds; i++) {
        try {
          soundFiles.push(`${soundsFolderPath}${id}.mp3`);
          imageFiles.push(`${imageFolderPath}${id}.png`);
          const response = await fetch(soundFiles[i]);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await this.audioContext?.decodeAudioData(
            arrayBuffer
          );
          if (audioBuffer === undefined) return;
          const sound: SoundModel = {
            id: i,
            name: soundFiles[i],
            imagePath: imageFiles[i],
            buffer: audioBuffer,
            isPlaying: false,
            isLaunched: false,
            volume: 0,
            volumeRandomness: 0,
            repetitionRateMS: 1000,
            repetitionRateRandomness: 0,
            pitchCT: 0,
            pitchRandomness: 0,
            gainNode: this.audioContext.createGain(),
          };
          this.addSound(sound);

          if (i === soundFiles.length - 1) {
            console.log('All sounds loaded');
            this.soundsLoaded = true;
          }
        } catch (error) {
          console.error(`Failed to load sound file: ${soundFiles[i]}`);
        }
      }
    },

    generateRandomCasserolade() {
      for (let i = 0; i < this.numberOfSounds; i++) {
        const sound = this.sounds[i];
        const volumeSign = Math.random() < 0.5 ? -1 : 1;
        sound.volume = Math.random() * 12 * volumeSign;
        sound.volumeRandomness = Math.random() * 100;

        const repetitionRateMS = Math.random() * 5000;
        const clippedRepetitionRateMS = Math.max(repetitionRateMS, 400);
        sound.repetitionRateMS = clippedRepetitionRateMS;
        sound.repetitionRateRandomness = Math.random() * 100;

        const pitchSign = Math.random() < 0.5 ? -1 : 1;
        sound.pitchCT = Math.random() * 12 * pitchSign;
        sound.pitchRandomness = Math.random() * 100;

        if (Math.random() < 0.4) {
          if (this.audioContext === null) return;
          if (this.engine === null) return;
          launchSound(sound, this.engine);
        } else {
          stopSound(sound);
        }
      }
    },

    stopAllSounds() {
      this.sounds.forEach((sound) => {
        stopSound(sound);
      });
    },

    launchTonalMode() {
      this.stopAllSounds();
      if (this.engine === null) return;
      this.engine.mode = PlayerMode.Notes;
      for (let i = 0; i < this.sounds.length; i++) {
        const sound = this.sounds[i];
        sound.pitchCT = i;
        sound.pitchRandomness = 0;
        sound.volume = 0;
        sound.volumeRandomness = 0;
        sound.repetitionRateMS = 1000;
        sound.repetitionRateRandomness = 0;
      }
    },

    launchCasseroladeMode() {
      this.shouldStopMelody = true;
      if (this.engine === null) return;
      this.engine.mode = PlayerMode.Casserolade;
      this.generateRandomCasserolade();
      this.stopAllSounds();
    },

    launchOnEstLaMelody() {
      this.playingMelodyID = 1;

      const noteIndex = 0;
      const oneTimeLength = 60 / 130;

      this.playMelody(onEstLaMelody, noteIndex, oneTimeLength);
    },

    launchLaRetraiteMelody() {
      this.playingMelodyID = 0;
      const randomness = 1;
      const offBeatSoundID = 4;
      const melody = generateLaRetraiteMelody(randomness, offBeatSoundID);

      const noteIndex = 0;
      const oneTimeLength = 60 / 112;

      this.playMelody(melody, noteIndex, oneTimeLength);
    },

    launchLinternationaleMelody() {
      this.playingMelodyID = 2;
      const melody = internationaleMelody;

      const noteIndex = 0;
      const oneTimeLength = 60 / 130;

      this.playMelody(melody, noteIndex, oneTimeLength);
    },

    stopMelody() {
      this.shouldStopMelody = false;
      this.melodyLaunched = false;
    },

    playMelody(melody: melodyNote[], noteIndex: number, oneTimeLength: number) {
      if (this.engine === null) return;
      if (this.shouldStopMelody) {
        this.stopMelody();
        return;
      }

      if (noteIndex < melody.length) {
        this.melodyLaunched = true;
        const note = melody[noteIndex];
        const soundId =
          melody[noteIndex].hasOwnProperty('soundId') === false
            ? this.tonalSoundID
            : melody[noteIndex].soundId;
        if (soundId === null) return;
        if (soundId === undefined) return;
        playSound(this.sounds[soundId], this.engine, note.pitch);
        setTimeout(() => {
          this.playMelody(melody, noteIndex + 1, oneTimeLength);
        }, oneTimeLength * note.duration * 1000);
      } else {
        this.melodyLaunched = false;
      }
    },

    launchCartonRougeMode() {
      this.cartonRougeMode = true;
      this.sounds.forEach((sound) => {
        sound.volumeRandomness = 5;
        sound.pitchRandomness = 5;
        sound.repetitionRateRandomness = 50;
        sound.isLaunched = true;

        if (this.engine === null) return;
        launchSound(sound, this.engine);
      });
    },
    playRandomSound() {
      if (this.engine === null) return;
      let sound = this.sounds[this.generateRandomNumberBetween0and9()];
      launchSound(sound, this.engine);
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          sound = this.sounds[this.generateRandomNumberBetween0and9()];
          sound.volume = -12;
          sound.pitchCT = randomizeValueClipped(sound.pitchCT, 50);
          if (this.engine === null) return;
          launchSound(sound, this.engine);
          sound.pitchCT = 0;
        }, this.generateRandomNumberBetween0and500());
      }
    },

    launchFaitesLesTaireMode() {
      if (this.engine === null) return;
      this.engine.mode = PlayerMode.FaitesLesTaire;
      this.showAboutWindow = false;
      this.showGameStartDialog = true;
      this.loadAllPolSounds();
    },

    launchGame() {
      this.showGameStartDialog = false;
      this.setRandomActiveCell();
      this.polSoundsIdSequence = this.generateUniqueNumbersArray(
        listeSonsPol.length,
        listeSonsPol.length
      );
      this.launchPanel();
    },

    async loadAllPolSounds() {
      listeSonsPol.forEach(async (son) => {
        try {
          const response = await fetch(son.soundPath);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await this.audioContext?.decodeAudioData(
            arrayBuffer
          );

          if (audioBuffer === undefined) return;
          const sound: SonPolModel = {
            auteur: son.auteur,
            buffer: audioBuffer,
            length: audioBuffer.duration,
            numberOfHitsRequired: Math.floor(
              audioBuffer.duration / this.numberOfHitsPerSecondsRequired
            ),
          };
          this.polSounds.push(sound);
        } catch (error) {
          console.error(`Failed to load sound file: ${son.soundPath}`);
        }
      });
    },

    generateUniqueNumbersArray(length: number, maxNumber: number): number[] {
      if (length > maxNumber) {
        throw new Error('Length cannot be greater than maxNumber');
      }

      const result: number[] = [];

      while (result.length < length) {
        const randomNumber = Math.floor(Math.random() * maxNumber);

        if (!result.includes(randomNumber)) {
          result.push(randomNumber);
        }
      }

      return result;
    },

    generateRandomNumberBetween0and9(): number {
      return Math.floor(Math.random() * 10);
    },

    generateRandomNumberBetween0and500(): number {
      return Math.floor(Math.random() * 500);
    },

    setActiveCell(cell: number) {
      this.activeCell = cell;
    },

    setRandomActiveCell() {
      this.activeCell = this.generateRandomNumberBetween0and9();
    },

    launchSonPolSound(sound: SonPolModel) {
      if (this.audioContext === null) return;
      if (this.engine === null) return;
      sound.source = this.audioContext.createBufferSource();
      sound.source.buffer = sound.buffer;
      sound.source.connect(this.audioContext.destination);
      sound.source.start();
      sound.startTime = this.audioContext.currentTime;
    },

    launchPanel() {
      const polSound =
        this.polSounds[this.polSoundsIdSequence[this.gameData.panelId]];
      this.activeSonPol = polSound;
      this.launchSonPolSound(this.activeSonPol);
      this.gameData.numberOfHits = 0;

      this.showGameIntermediateDialog = false;
    },

    launchNextPanel() {
      this.gameData.panelId++;
      if (this.gameData.panelId === this.polSoundsIdSequence.length) {
        this.endGame();
        return;
      }
      this.launchPanel();
    },

    endGame() {
      this.showGameEndDialog = true;
      this.showGameIntermediateDialog = false;
    },

    activeCellClicked() {
      this.playRandomSound();
      this.setRandomActiveCell();
      this.gameData.numberOfHits++;

      if (
        this.gameData.numberOfHits % this.activeSonPol.numberOfHitsRequired ===
        0
      ) {
        this.numberOfHitsRequiredReached();
      }
      if (this.activeSonPol.source === null) return;
      if (this.activeSonPol.source === undefined) return;

      const playbackRate = this.activeSonPol.source.playbackRate.value;
    },

    numberOfHitsRequiredReached() {
      if (this.engine?.audioContext.currentTime === undefined) return;
      if (this.activeSonPol.startTime === undefined) return;
      this.gameData.timeToReachHits =
        this.engine.audioContext.currentTime - this.activeSonPol.startTime;
      const rampTIme = this.activeSonPol.length - this.gameData.timeToReachHits;
      this.activeSonPol.source?.playbackRate.linearRampToValueAtTime(
        0.6,
        this.engine.audioContext.currentTime + rampTIme
      );

      this.showGameIntermediateDialog = true;
      //this.activeSonPol.source?.stop();
    },
  },
});
