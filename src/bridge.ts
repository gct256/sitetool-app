import {
  DistributeEvent,
  FileEvent,
  Runtime,
  RuntimeEvent,
  ServerStartedEvent,
  TransformEvent
} from '@gct256/sitetool';
import * as fs from 'fs';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import {
  PersistConfig,
  Persistor,
  persistReducer,
  persistStore
} from 'redux-persist';
import { default as createElectronStorage } from 'redux-persist-electron-storage';

import { AppStore, appReducer } from './app';
import { logs } from './app/logs';
import { recentFiles } from './app/recentFiles';
import { ui } from './app/ui';
import { acceptFileDrop, showFile } from './utils';

const persistConfig: PersistConfig = {
  key: 'recentFiles',
  storage: createElectronStorage(),
  whitelist: ['recentFiles']
};
const persistedReducer = persistReducer(persistConfig, appReducer);
const store: AppStore = createStore(
  persistedReducer,
  applyMiddleware(createLogger())
);
const persister = persistStore(store);
const runtime: Runtime = new Runtime();

function delpoyRuntimeError(eventType: string, error: Error | false): boolean {
  if (error !== false) {
    store.dispatch(logs.addError(error));
  } else {
    store.dispatch(logs.addMessage(eventType));
  }

  return error !== false;
}

function deployFileEvent(eventType: string, event: FileEvent) {
  if (event.error !== false) {
    store.dispatch(logs.addError(event.error));
  } else {
    store.dispatch(logs.addMessage(`${eventType}: ${event.relPath}`));
  }
}

runtime.on('OPENING', (event: RuntimeEvent) => {
  if (!delpoyRuntimeError('OPENING', event.error)) {
    store.dispatch(ui.setMessage('opening ...'));
  }
});

runtime.on('OPENED', async (event: RuntimeEvent) => {
  if (!delpoyRuntimeError('OPENED', event.error)) {
    const config = runtime.getConfig();
    store.dispatch(
      ui.setOpened(true, config.getRoot(), config.getConfigFile())
    );
    store.dispatch(ui.setMessage(null));
    store.dispatch(logs.clear());

    const configFile = config.getConfigFile();
    if (configFile === null) {
      store.dispatch(recentFiles.add(config.getRoot()));
    } else {
      store.dispatch(recentFiles.add(configFile));
    }

    await runtime.build();

    runtime.startWatcher();
    runtime.startServer();
  }
});

runtime.on('CLOSING', (event: RuntimeEvent) => {
  if (!delpoyRuntimeError('CLOSING', event.error)) {
    store.dispatch(ui.setMessage('closing ...'));
  }
});

runtime.on('CLOSED', (event: RuntimeEvent) => {
  if (!delpoyRuntimeError('CLOSED', event.error)) {
    store.dispatch(ui.setOpened(false, null, null));
    store.dispatch(ui.setMessage(null));
  }
});

runtime.on('WATCHER_STARTING', (event: RuntimeEvent) => {
  if (!delpoyRuntimeError('WATCHER_STARTING', event.error)) {
    store.dispatch(ui.setWatcherStatus('startup'));
  }
});

runtime.on('WATCHER_STARTED', (event: RuntimeEvent) => {
  if (!delpoyRuntimeError('WATCHER_STARTED', event.error)) {
    store.dispatch(ui.setWatcherStatus('running'));
  }
});

runtime.on('WATCHER_STOPPING', (event: RuntimeEvent) => {
  if (!delpoyRuntimeError('WATCHER_STOPPING', event.error)) {
    store.dispatch(ui.setWatcherStatus('shutdown'));
  }
});

runtime.on('WATCHER_STOPPED', (event: RuntimeEvent) => {
  if (!delpoyRuntimeError('WATCHER_STOPPED', event.error)) {
    store.dispatch(ui.setWatcherStatus('idle'));
  }
});

runtime.on('SERVER_STARTING', (event: RuntimeEvent) => {
  if (!delpoyRuntimeError('SERVER_STARTING', event.error)) {
    store.dispatch(ui.setServerStatus('startup', null, null));
  }
});

runtime.on('SERVER_STARTED', (event: ServerStartedEvent) => {
  if (!delpoyRuntimeError('SERVER_STARTED', event.error)) {
    store.dispatch(ui.setServerStatus('running', event.port, event.urls));
  }
});

runtime.on('SERVER_STOPPING', (event: RuntimeEvent) => {
  if (!delpoyRuntimeError('SERVER_STOPPING', event.error)) {
    store.dispatch(ui.setServerStatus('shutdown', null, null));
  }
});

runtime.on('SERVER_STOPPED', (event: RuntimeEvent) => {
  if (!delpoyRuntimeError('SERVER_STOPPED', event.error)) {
    store.dispatch(ui.setServerStatus('idle', null, null));
  }
});

runtime.on('BUILDING', (event: RuntimeEvent) => {
  if (!delpoyRuntimeError('BUILDING', event.error)) {
    store.dispatch(ui.setMessage('building ...'));
  }
});

runtime.on('BUILT', (event: RuntimeEvent) => {
  if (!delpoyRuntimeError('BUILT', event.error)) {
    store.dispatch(ui.setMessage(null));
  }
});

runtime.on('CLEANING', (event: RuntimeEvent) => {
  if (!delpoyRuntimeError('CLEANING', event.error)) {
    store.dispatch(ui.setMessage('cleaning ...'));
  }
});

runtime.on('CLEANED', (event: RuntimeEvent) => {
  if (!delpoyRuntimeError('CLEANED', event.error)) {
    store.dispatch(ui.setMessage(null));
  }
});

runtime.on('DISTRIBUTING', (event: RuntimeEvent) => {
  if (!delpoyRuntimeError('DISTRIBUTING', event.error)) {
    store.dispatch(ui.setMessage('distributing ...'));
  }
});

runtime.on('DISTRIBUTED', (event: DistributeEvent) => {
  if (!delpoyRuntimeError('DISTRIBUTED', event.error)) {
    store.dispatch(ui.setMessage(null));
    showFile(event.dirPath, true);
  }
});

runtime.on('REMOVE_DIRECTORY', (event: FileEvent) => {
  deployFileEvent('REMOVE_DIRECTORY', event);
});

runtime.on('MAKE_DIRECTORY', (event: FileEvent) => {
  deployFileEvent('MAKE_DIRECTORY', event);
});

runtime.on('WRITE_FILE', (event: FileEvent) => {
  deployFileEvent('WRITE_FILE', event);
});

// SKIP_FILE: FileEvent;
runtime.on('TRANSFORM', (event: TransformEvent) => {
  if (event.error !== false) {
    store.dispatch(logs.addError(event.error));
  } else {
    store.dispatch(
      logs.addMessage(`TRANSFORM: <${event.funcName}> ${event.relPath}`)
    );
  }
});

runtime.on('BROWSER_RELOADED', (event: RuntimeEvent) => {
  delpoyRuntimeError('BROWSER_RELOADED', event.error);
});

// BROWSER_RELOADED: RuntimeEvent;
// MESSAGE: string;

export function getStore(): AppStore {
  return store;
}

export function getPersister(): Persistor {
  return persister;
}

export function getRuntime(): Runtime {
  return runtime;
}

acceptFileDrop(window, async (filePaths: string[]) => {
  for (const filePath of filePaths) {
    if (!fs.existsSync(filePath)) continue;

    if (fs.statSync(filePath).isDirectory()) {
      await runtime.openDirectory(filePath);
    } else {
      await runtime.openConfigFile(filePath);
    }
    break;
  }
});
