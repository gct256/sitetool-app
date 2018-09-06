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
      width: 800,
      height: 700,
      minHeight: 700
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
