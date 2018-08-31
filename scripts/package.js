const path = require('path');
const pkg = require('../package.json');
const packager = require('electron-packager');

const rootDir = path.dirname(__dirname);

const commonOptions = {
  dir: path.resolve(rootDir, 'app'),
  asar: false, // imageminがasarでは動かしづらいので
  out: path.resolve(rootDir, 'dist'),
  overwrite: true
};

async function package(options) {
  return packager({ ...commonOptions, ...options });
}

async function main() {
  switch (process.platform) {
    case 'darwin':
      await package({
        platform: 'darwin'
      });
      break;
    case 'win32':
      throw new Error('not implemented');
      break;
  }
}

main().catch(console.error);
