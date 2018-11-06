import { BrowserWindow, remote } from 'electron';
import * as fs from 'fs';

function getWindow(): BrowserWindow {
  for (const w of remote.BrowserWindow.getAllWindows()) {
    return w;
  }

  return remote.BrowserWindow.getFocusedWindow();
}

export function openSelectDir(): Promise<string | null> {
  return new Promise((resolve: (filePaths: string | null) => void) => {
    remote.dialog.showOpenDialog(
      getWindow(),
      {
        properties: ['openDirectory']
      },
      (filePaths?: string[]) => {
        resolve(
          Array.isArray(filePaths) && filePaths.length > 0 ? filePaths[0] : null
        );
      }
    );
  });
}

export function openSelectConfig(): Promise<string | null> {
  return new Promise((resolve: (filePaths: string | null) => void) => {
    remote.dialog.showOpenDialog(
      getWindow(),
      {
        filters: [{ name: 'sitetool.config.js', extensions: ['js'] }],
        properties: ['openFile']
      },
      (filePaths?: string[]) => {
        resolve(
          Array.isArray(filePaths) && filePaths.length > 0 ? filePaths[0] : null
        );
      }
    );
  });
}

export function showFile(
  dirPath: string | null | undefined,
  forceShow: boolean = false
) {
  if (dirPath === null || dirPath === undefined) return;
  if (!fs.existsSync(dirPath)) return;

  if (fs.statSync(dirPath).isDirectory() && !forceShow) {
    remote.shell.openItem(dirPath);
  } else {
    remote.shell.showItemInFolder(dirPath);
  }
}

export function showUrl(url: string | null | undefined) {
  if (url !== null && url !== undefined) remote.shell.openExternal(url);
}

export function sendToClipboard(value: string | null | undefined) {
  if (value !== null && value !== undefined) remote.clipboard.writeText(value);
}

export function notifyError(message: string, callback?: () => void) {
  const nf = new remote.Notification({
    title: 'sitetool',
    body: message,
    silent: true
  });
  if (callback) nf.on('click', callback);
  nf.show();

  remote.app.dock.bounce('critical');
}

export function acceptFileDrop(
  target: Window | HTMLDocument | HTMLElement,
  callback: (filePaths: string[]) => void
): void {
  target.addEventListener(
    'dragover',
    (ev: Event) => {
      ev.preventDefault();
      ev.stopPropagation();
    },
    false
  );

  target.addEventListener(
    'drop',
    (ev: Event) => {
      ev.preventDefault();
      ev.stopPropagation();
      if (!(ev instanceof DragEvent)) {
        return;
      }

      if (ev.dataTransfer === null) return;

      const items = ev.dataTransfer.items;
      const filePaths: string[] = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        const file: File | null = item.getAsFile();
        if (file === null) continue;
        filePaths.push(file.path);
      }
      if (filePaths.length > 0) callback(filePaths);
    },
    false
  );
}

export function exists(filePath: string): Promise<boolean> {
  return new Promise((resolve: (result: boolean) => void) => {
    fs.stat(filePath, (err: Error) => {
      resolve(err === null);
    });
  });
}

export async function isDirectory(filePath: string): Promise<boolean> {
  return new Promise((resolve: (result: boolean) => void) => {
    fs.stat(filePath, (err: Error, stat: fs.Stats) => {
      resolve(err === null && stat.isDirectory());
    });
  });
}
