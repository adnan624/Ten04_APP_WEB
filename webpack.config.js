const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appDirectory = path.resolve(__dirname);

module.exports = {
  entry: path.resolve(appDirectory, 'index.web.js'),

  output: {
    filename: 'bundle.js',
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    clean: true,
  },

  resolve: {
    // .web.tsx MUST come before .tsx so platform files resolve correctly
    extensions: [
      '.web.tsx', '.web.ts', '.web.js', '.web.jsx',
      '.tsx', '.ts', '.js', '.jsx', '.json',
    ],
    alias: {
      // THE most important line — redirects all RN imports to web equivalents
      'react-native$': 'react-native-web',
    },
  },

  module: {
    rules: [
      // ── CRITICAL FIX 1 ──────────────────────────────────────────────────
      // @react-navigation ships pre-compiled ESM with extensionless imports.
      // Webpack 5 strict ESM requires extensions — this disables that.
      {
        test: /\.js$/,
        resolve: { fullySpecified: false },
      },

      // ── CRITICAL FIX 2 ──────────────────────────────────────────────────
      // Only transpile OUR source + react-native-web through babel.
      // DO NOT include @react-navigation, react-native-screens, or
      // react-native-safe-area-context — they ship pre-compiled ESM.
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          path.resolve(appDirectory, 'index.web.js'),
          path.resolve(appDirectory, 'App.tsx'),
          path.resolve(appDirectory, 'src'),
          path.resolve(appDirectory, 'node_modules/react-native-web'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            presets: [
              // ── CRITICAL FIX 3 ────────────────────────────────────────
              // Modern targets = babel leaves async/await alone.
              // Without this: "regeneratorRuntime is not defined".
              ['@babel/preset-env', {
                modules: false,
                targets: 'defaults, not ie 11',
              }],
              ['@babel/preset-react', { runtime: 'classic' }],
              '@babel/preset-typescript',
            ],
            plugins: ['react-native-web'],
          },
        },
      },

      { test: /\.(gif|jpe?g|png|svg|webp)$/, type: 'asset/resource' },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, type: 'asset/resource' },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(appDirectory, 'public/index.html'),
    }),
  ],

  devServer: {
    port: 3001,
    historyApiFallback: true, // Required for React Navigation URL routing
    hot: true,
    open: true,
    client: { overlay: { errors: true, warnings: false } },
  },

  performance: { hints: false },
};
