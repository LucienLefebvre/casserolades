export function dbToGain(db: number): number {
  return Math.exp(db * (Math.log(10.0) / 20.0));
}

export function gainToDb(gain: number): number {
  return 20.0 * Math.log10(gain);
}

export function scaleTo0to1(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}

export function scaleFrom0to1(value: number, min: number, max: number): number {
  return value * (max - min) + min;
}

export function logScaleTo0to1(
  value: number,
  min: number,
  max: number,
  skew: number
): number {
  const scaledValue = Math.pow(skew, (value - min) / (max - min));
  return (scaledValue - 1) / (skew - 1);
}

export function logScaleFrom0to1(
  value: number,
  min: number,
  max: number,
  skew: number
): number {
  const unscaledValue = Math.log(value * (skew - 1) + 1) / Math.log(skew);
  return unscaledValue * (max - min) + min;
}

export function logScaleWithinSameRange(
  value: number,
  min: number,
  max: number,
  skew: number
): number {
  const scaledValue = Math.pow(skew, (value - min) / (max - min));
  const newScaledValue = (scaledValue - 1) / (skew - 1);
  const range = max - min;
  return newScaledValue * range + min;
}

export function randomizeValueClipped(
  value: number,
  percentage: number
): number {
  const maxDeviation = 12 * (percentage / 100);
  const randomDeviation = Math.random() * maxDeviation;
  const isNegative = Math.random() < 0.5;
  const sign = isNegative ? -1 : 1;
  const randomizedValue = value + sign * randomDeviation;
  const clippedValue = Math.max(-12, Math.min(12, randomizedValue));
  return clippedValue;
}

export function randomizeRepetitionRate(
  repetitionRate: number,
  percentage: number
): number {
  const maxDeviation = repetitionRate * (percentage / 100);
  const randomDeviation = Math.random() * maxDeviation;
  const isNegative = Math.random() < 0.5;
  const sign = isNegative ? -1 : 1;
  const randomizedRepetitionRate = repetitionRate + sign * randomDeviation;
  const clippedRepetitionRate = Math.max(0.5, randomizedRepetitionRate);
  return clippedRepetitionRate;
}
