import { BrowserWindow, app } from 'electron';

let mainWindow: BrowserWindow | null = null;

const shouldQuit: boolean = app.makeSingleInstance(() => {
  app.focus();
});

if (shouldQuit) {
  app.quit();
} else {
  app.on('ready', () => {
    mainWindow = new BrowserWindow({
      show: true,
      width: 1000,
      height: 600,
      minHeight: 600
    });

    mainWindow.on('ready-to-show', () => {
      if (mainWindow !== null) {
        mainWindow.show();
      }
    });

    mainWindow.on('closed', () => {
      mainWindow = null;
      app.quit();
    });

    mainWindow.loadFile('./index.html');
  });
}
