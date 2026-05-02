export const C = {
  // Backgrounds
  bg:           '#06070d',
  surface:      '#0c1120',
  surface2:     '#101828',
  surfaceHover: '#141e30',

  // Borders
  border:       '#1a263c',
  borderBright: '#243550',

  // Accent — electric cyan
  accent:       '#0ea5e9',
  accentBright: '#38bdf8',
  accentDim:    'rgba(14,165,233,0.12)',
  accentGlow:   'rgba(14,165,233,0.25)',

  // Gold accent
  gold:         '#f59e0b',
  goldDim:      'rgba(245,158,11,0.12)',

  // Green
  green:        '#10b981',
  greenDim:     'rgba(16,185,129,0.12)',

  // Red
  red:          '#f43f5e',
  redDim:       'rgba(244,63,94,0.12)',

  // Text
  text:         '#eef2ff',
  textSub:      '#8ba0be',
  textDim:      '#3d5270',
} as const;

export const F = {
  // Sizes
  xs:   11,
  sm:   13,
  base: 15,
  md:   17,
  lg:   20,
  xl:   24,
  '2xl': 30,
  '3xl': 40,
  '4xl': 52,
  '5xl': 72,

  // Weights
  normal: '400' as const,
  medium: '500' as const,
  semi:   '600' as const,
  bold:   '700' as const,
  black:  '900' as const,
} as const;

export const R = {
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  '2xl': 28,
  full: 999,
} as const;
