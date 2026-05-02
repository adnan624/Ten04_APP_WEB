module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // ⚠️  DO NOT add 'react-native-web' here.
    // It belongs ONLY in webpack.config.js babel-loader.
    // If added here, Metro reads it and rewrites react-native imports
    // on iOS/Android — breaking the native build entirely.
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js', '.android.js',
          '.web.js', '.native.js',
          '.js', '.jsx', '.ts', '.tsx', '.json',
        ],
        alias: {
          '@screens':    './src/screens',
          '@components': './src/components',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};
