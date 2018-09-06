// import { Dispatch, Store } from 'redux';
import { Status } from '.';

export interface URLSet {
  local: string;
  external: string;
}

export type LogMode = 'error' | 'all';

export namespace ui {
  //// state
  export interface State {
    opened: boolean;
    root: string | null;
    configFile: string | null;
    watcher: Status;
    server: Status;
    port: number | null;
    urls: URLSet | null;
    message: string | null;
    logAll: boolean;
  }

  //// action type
  export const SET_OPENED: 'SET_OPENED' = 'SET_OPENED';
  export const SET_WATCHER_STATUS: 'SET_WATCHER_STATUS' = 'SET_WATCHER_STATUS';
  export const SET_SERVER_STATUS: 'SET_SERVER_STATUS' = 'SET_SERVER_STATUS';
  export const SET_MESSAGE: 'SET_MESSAGE' = 'SET_MESSAGE';
  export const SET_LOG_ALL: 'SET_LOG_ALL' = 'SET_LOG_ALL';

  //// action creator
  export function setOpened(
    opened: boolean,
    root: string | null,
    configFile: string | null
  ) {
    return {
      type: SET_OPENED,
      payload: { opened, root, configFile }
    };
  }

  export function setWatcherStatus(watcher: Status) {
    return {
      type: SET_WATCHER_STATUS,
      payload: { watcher }
    };
  }

  export function setServerStatus(
    server: Status,
    port: number | null,
    urls: URLSet | null
  ) {
    return {
      type: SET_SERVER_STATUS,
      payload: { server, port, urls }
    };
  }

  export function setMessage(message: string | null) {
    return {
      type: SET_MESSAGE,
      payload: { message }
    };
  }

  export function setLogAll(logAll: boolean) {
    return {
      type: SET_LOG_ALL,
      payload: { logAll }
    };
  }

  //// action
  export type Action =
    | ReturnType<typeof setOpened>
    | ReturnType<typeof setWatcherStatus>
    | ReturnType<typeof setServerStatus>
    | ReturnType<typeof setMessage>
    | ReturnType<typeof setLogAll>;

  //// reducer
  export function reducer(
    state: State = {
      opened: false,
      root: '',
      configFile: '',
      watcher: 'idle',
      server: 'idle',
      port: null,
      urls: null,
      message: null,
      logAll: false
    },
    action: Action
  ): State {
    switch (action.type) {
      case SET_OPENED: {
        const { opened, root, configFile } = action.payload;

        return opened === state.opened &&
          root === state.root &&
          configFile === state.configFile
          ? state
          : { ...state, opened, root, configFile };
      }

      case SET_WATCHER_STATUS: {
        const { watcher } = action.payload;

        return watcher === state.watcher ? state : { ...state, watcher };
      }

      case SET_SERVER_STATUS: {
        const { server, port, urls } = action.payload;

        return server === state.server &&
          port === state.port &&
          urls === state.urls
          ? state
          : { ...state, server, port, urls };
      }

      case SET_MESSAGE: {
        const { message } = action.payload;

        return message === state.message ? state : { ...state, message };
      }

      case SET_LOG_ALL: {
        const { logAll } = action.payload;

        return logAll === state.logAll ? state : { ...state, logAll };
      }

      default:
        return state;
    }
  }
}
