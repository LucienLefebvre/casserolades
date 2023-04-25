import {
  SoundModel,
  AudioEngine,
  StereoAnalyserObject,
  PlayerMode,
} from 'src/components/models';
import {
  dbToGain,
  randomizeValueClipped,
  randomizeRepetitionRate,
} from 'src/composables/math-helpers';

export function toggleLaunchStopSound(sound: SoundModel, engine: AudioEngine) {
  if (sound.isLaunched) {
    stopSound(sound);
  } else {
    launchSound(sound, engine);
  }
}

export function launchSound(sound: SoundModel, engine: AudioEngine) {
  sound.isLaunched = true;
  playSound(sound, engine);
}

export function playSound(
  sound: SoundModel,
  engine: AudioEngine,
  basePitch?: number
) {
  if (!sound.isLaunched && engine.mode === PlayerMode.Casserolade) {
    stopSound(sound);
    return;
  }
  if (engine === null || engine.audioContext === null) return;

  const source = engine.audioContext.createBufferSource();
  source.buffer = sound.buffer;

  let pitch = 0;
  if (engine.mode === PlayerMode.Casserolade) {
    pitch = randomizeValueClipped(sound.pitchCT, sound.pitchRandomness);
  } else if (engine.mode === PlayerMode.Notes) {
    pitch = basePitch ?? 0;
  }
  source.detune.value = pitch * 100;

  const volume = randomizeValueClipped(sound.volume, sound.volumeRandomness);
  sound.gainNode.gain.value = dbToGain(volume);

  source.connect(sound.gainNode);
  sound.gainNode.connect(engine.ouputGainNode);
  source.start();

  const repetitionRate = randomizeRepetitionRate(
    sound.repetitionRateMS,
    sound.repetitionRateRandomness
  );
  if (engine.mode === PlayerMode.Casserolade) {
    setTimeout(() => {
      playSound(sound, engine);
    }, repetitionRate);
  } else if (engine.mode === PlayerMode.Notes) {
    source.addEventListener('ended', () => {
      sound.isLaunched = false;
    });
  }
}

export function stopSound(sound: SoundModel) {
  sound.isLaunched = false;
  if (sound.source === undefined) return;
  sound.source.stop();
}
