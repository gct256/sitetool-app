import { AnyAction, Dispatch, Store, combineReducers } from 'redux';

import { logs } from './logs';
import { recentFiles } from './recentFiles';
import { ui } from './ui';

//// watcher & server status
export type Status = 'idle' | 'startup' | 'running' | 'shutdown';

//// state
export interface AppState {
  logs: logs.State;
  recentFiles: recentFiles.State;
  ui: ui.State;
}

//// action
export type AppAction =
  | logs.Action
  | recentFiles.Action
  | ui.Action
  | AnyAction;

//// dispatch
export interface AppDispatch extends Dispatch<AppAction> {}

//// reducer
export const appReducer = combineReducers({
  logs: logs.reducer,
  recentFiles: recentFiles.reducer,
  ui: ui.reducer
});

//// store
export interface AppStore extends Store<AppState, AppAction> {}
