import { defineStore } from 'pinia';
import {
  SoundModel,
  StereoAnalyserObject,
  AudioEngine,
  PlayerMode,
} from 'src/components/models';
import { launchSound, stopSound } from 'src/composables/sound-controller';

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
    showAboutWindow: false,

    audioContext: null as AudioContext | null,
    stereoAnalyser: null as StereoAnalyserObject | null,
    engine: null as AudioEngine | null,
    soundsLoaded: false,

    toolBarHeight: 50,
    meterHeight: 30,
    rows: 6,
    columns: 2,
    numberOfSounds: 12,

    tonalSoundID: 10,

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
      if (this.engine === null) return;
      this.engine.mode = PlayerMode.Casserolade;
      this.generateRandomCasserolade();
      this.stopAllSounds();
    },
  },
});
