const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    // Put .web.js LAST so Metro never resolves web files on a native device
    sourceExts: [
      ...defaultConfig.resolver.sourceExts,
      'web.js', 'web.jsx', 'web.ts', 'web.tsx',
    ],
  },
};

module.exports = mergeConfig(defaultConfig, config);
