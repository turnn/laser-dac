export function writeUnsignedInt32(n) {
  n = Math.round(n);
  const a = (n >> 0) & 65535;
  const b = (n >> 16) & 65535;
  return writeUnsignedInt16(a) + writeUnsignedInt16(b);
}

export function writeUnsignedInt16(n) {
  n = Math.round(n);
  if (n < 0) n = 0;
  if (n > 65535) n = 65535;
  const a = (n >> 0) & 255;
  const b = (n >> 8) & 255;
  return String.fromCharCode(a) + String.fromCharCode(b);
}

export function writeSignedInt16(n) {
  n = Math.round(n);
  if (n < -32767) n = -32767;
  if (n > 32767) n = 32767;
  if (n < 0) n = 65535 + n;
  const a = (n >> 0) & 255;
  const b = (n >> 8) & 255;
  return String.fromCharCode(a) + String.fromCharCode(b);
}
