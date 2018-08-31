export interface Log {
  message: string;
  error: Error | false;
  time: number;
  serial: number;
}

let serial: number = 0;

export namespace logs {
  //// state
  export type State = Log[];

  //// action type
  export const ADD: 'logs/ADD' = 'logs/ADD';
  export const CLEAR: 'logs/CLEAR' = 'logs/CLEAR';

  //// action creator
  function add(message: string, error: Error | false, time: number) {
    serial += 1;

    return {
      type: ADD,
      payload: { message, error, time, serial }
    };
  }

  export function clear() {
    return {
      type: CLEAR
    };
  }

  //// action
  export type Action = ReturnType<typeof add> | ReturnType<typeof clear>;

  //// helper
  export function addMessage(message: string, error: Error | false = false) {
    return add(message, error, Date.now());
  }

  export function addError(error: Error) {
    return add(error.message, error, Date.now());
  }

  //// reducer
  export function reducer(state: State = [], action: Action): State {
    switch (action.type) {
      case ADD:
        return [...state, <Log>action.payload];

      case CLEAR:
        return state.length <= 0 ? state : [];

      default:
        return state;
    }
  }
}
