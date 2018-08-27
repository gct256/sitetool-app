const path = require('path');

const distPath = path.resolve(__dirname, 'app');

const baseConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ca]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.css',
      '.scss',
      '.sass',
      '.json'
    ]
  },
  externals: {
    '@gct256/sitetool': "require('@gct256/sitetool')"
  }
};

module.exports = [
  {
    ...baseConfig,
    entry: './src/script.tsx',
    target: 'electron-renderer',
    output: {
      path: distPath,
      filename: 'script.js'
    }
  },
  {
    ...baseConfig,
    entry: './src/main.ts',
    target: 'electron-main',
    output: {
      path: distPath,
      filename: 'main.js'
    }
  }
];
