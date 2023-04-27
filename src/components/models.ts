export interface SoundModel {
  id: number;
  name: string;

  buffer: AudioBuffer;
  source?: AudioBufferSourceNode;

  imagePath: string;

  isLaunched: boolean;
  isPlaying: boolean;
  isSelected?: boolean;

  volume: number;
  volumeRandomness: number;
  gainNode: GainNode;

  repetitionRateMS: number;
  repetitionRateRandomness: number;

  pitchCT: number;
  pitchRandomness: number;

  timeOutId?: ReturnType<typeof setTimeout>;
}

export interface StereoAnalyserObject {
  splitter: ChannelSplitterNode;
  stereoAnalyser: AnalyserNode;
  analysers: AnalyserNode[];
}

export interface AudioEngine {
  audioContext: AudioContext;
  stereoAnalyser: StereoAnalyserObject;
  ouputGainNode: GainNode;
  outputLimiterNode: DynamicsCompressorNode;
  mode: PlayerMode;
}

export enum PlayerMode {
  Casserolade,
  Notes,
}

export interface melodyNote {
  pitch: number;
  duration: number;
}
