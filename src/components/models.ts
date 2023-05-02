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
  FaitesLesTaire,
}

export interface melodyNote {
  pitch: number;
  duration: number;
  soundId?: number | null;
}

export interface SonPol {
  soundPath: string;
  imagePath?: string;
  auteur: string;
}

export interface SonPolModel {
  name?: string;
  imagePath?: string;
  image: HTMLImageElement;
  buffer: AudioBuffer;
  length: number;
  numberOfHitsRequired: number;
  source?: AudioBufferSourceNode;
  startTime?: number;
  auteur: string;
}

export interface GameData {
  difficulty: number;
  totalScore: number;
  score: number;
  numberOfHits: number;
  timeToReachHits: number;
  panelId: number;
  tuLasFaitTaire: boolean;
  gameEnded: boolean;
}

export interface missSoundModel {
  buffer: AudioBuffer;
  source?: AudioBufferSourceNode;

  pitchCT: number;
  pitchRandomness: number;
}
