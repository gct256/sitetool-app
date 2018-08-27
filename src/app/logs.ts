export interface Log {
  message: string;
  error: Error | false;
  time: number;
}

export namespace logs {
  //// state
  export type State = Log[];

  //// action type
  export const ADD: 'logs/ADD' = 'logs/ADD';
  export const CLEAR: 'logs/CLEAR' = 'logs/CLEAR';

  //// action creator
  function add(message: string, error: Error | false, time: number) {
    return {
      type: ADD,
      payload: { message, error, time }
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
  export function addMessage(message: string) {
    return add(message, false, Date.now());
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
