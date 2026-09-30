const RESET = "\x1b[0m";

type ColorFn = (text: string) => string;

const wrap = (code: number): ColorFn => {
  return (text: string): string => `\x1b[${code}m${text}${RESET}`;
};

export const colors = {
  // styles
  bold: wrap(1),
  dim: wrap(2),
  italic: wrap(3),
  underline: wrap(4),
  blink:wrap(5),
  reverse: wrap(7),
  hidden: wrap(8),
  strike: wrap(9),

  // foreground
  black: wrap(30),
  red: wrap(31),
  green: wrap(32),
  yellow: wrap(33),
  blue: wrap(34),
  magenta: wrap(35),
  cyan: wrap(36),
  white: wrap(37),

  brightBlack: wrap(90),
  brightRed: wrap(91),
  brightGreen: wrap(92),
  brightYellow: wrap(93),
  brightBlue: wrap(94),
  brightMagenta: wrap(95),
  brightCyan: wrap(96),
  brightWhite: wrap(97),

  // background
  bgBlack: wrap(40),
  bgRed: wrap(41),
  bgGreen: wrap(42),
  bgYellow: wrap(43),
  bgBlue: wrap(44),
  bgMagenta: wrap(45),
  bgCyan: wrap(46),
  bgWhite: wrap(47),

  // 256 color
  color256: (num: number): ColorFn => {
    return (text: string): string =>
      `\x1b[38;5;${num}m${text}${RESET}`;
  },

  bg256: (num: number): ColorFn => {
    return (text: string): string =>
      `\x1b[48;5;${num}m${text}${RESET}`;
  },

  // true color (RGB)
  rgb: (r: number, g: number, b: number): ColorFn => {
    return (text: string): string =>
      `\x1b[38;2;${r};${g};${b}m${text}${RESET}`;
  },

  bgRgb: (r: number, g: number, b: number): ColorFn => {
    return (text: string): string =>
      `\x1b[48;2;${r};${g};${b}m${text}${RESET}`;
  },
} as const;

export type Colors = typeof colors;