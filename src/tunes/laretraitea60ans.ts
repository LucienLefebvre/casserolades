import { melodyNote } from 'src/components/models';
import { randomizeValueClipped } from 'src/composables/math-helpers';

export function generateLaRetraiteMelody(
  randomness: number,
  offBeatSoundID: number
): melodyNote[] {
  return [
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 2,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 2,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1,
      soundId: offBeatSoundID,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 2,
      soundId: offBeatSoundID,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 2,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 2,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 2,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1,
      soundId: offBeatSoundID,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 2,
      soundId: offBeatSoundID,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 2,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 2,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 2,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 3 / 4,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 4,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 2,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 2,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 2,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 2,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 2,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 2,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 3 / 4,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 4,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 2,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 2,
    },
    {
      pitch: 0 + randomizeValueClipped(0, randomness),
      duration: 1 / 2,
    },
  ];
}
