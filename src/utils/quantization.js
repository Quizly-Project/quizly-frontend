export function quantize(value, min, max, bits = 8) {
  const range = max - min;
  const step = range / (Math.pow(2, bits) - 1);
  return Math.round((value - min) / step);
}

// 역양자화
export function dequantize(value, min, max, bits = 8) {
  const range = max - min;
  const step = range / (Math.pow(2, bits) - 1);
  return value * step + min;
}

export function quantizePosition(position, bits = 8) {
  const ranges = {
    x: { min: -100, max: 100 },
    y: { min: -50, max: 50 },
    z: { min: -50, max: 50 },
  };
  return {
    x: this.quantize(position.x, ranges.x.min, ranges.x.max, bits),
    y: this.quantize(position.y, ranges.y.min, ranges.y.max, bits),
    z: this.quantize(position.z, ranges.z.min, ranges.z.max, bits),
  };
}

export function dequantizePosition(position, bits = 8) {
  const ranges = {
    x: { min: -100, max: 100 },
    y: { min: -50, max: 50 },
    z: { min: -50, max: 50 },
  };
  return {
    x: this.dequantize(position.x, ranges.x.min, ranges.x.max, bits),
    y: this.dequantize(position.y, ranges.y.min, ranges.y.max, bits),
    z: this.dequantize(position.z, ranges.z.min, ranges.z.max, bits),
  };
}
