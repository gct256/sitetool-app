import { AppDispatch } from '.';
import { exists } from '../utils';

export namespace recentFiles {
  //// state
  export type State = string[];

  //// action type
  export const ADD: 'recentFiles/ADD' = 'recentFiles/ADD';
  export const REMOVE: 'recentFiles/REMOVE' = 'recentFiles/REMOVE';
  export const RESTORE: 'recentFiles/RESTORE' = 'recentFiles/RESTORE';

  //// action creator
  export function add(filePath: string) {
    return {
      type: ADD,
      payload: { filePath }
    };
  }

  export function remove(filePath: string) {
    return {
      type: REMOVE,
      payload: { filePath }
    };
  }

  export function restore(filePaths: string[]) {
    return {
      type: RESTORE,
      payload: { filePaths }
    };
  }

  //// action
  export type Action =
    | ReturnType<typeof add>
    | ReturnType<typeof remove>
    | ReturnType<typeof restore>;

  //// reducer
  export function reducer(state: State = [], action: Action): State {
    switch (action.type) {
      case ADD: {
        const { filePath } = action.payload;

        return [
          filePath,
          ...state.filter((x: string) => x !== filePath)
          // tslint:disable-next-line:variable-name
        ].filter((_x: string, i: number) => i <= 20);
      }

      case REMOVE: {
        const { filePath } = action.payload;
        const index = state.indexOf(filePath);
        if (index < 0) return state;

        return state.filter((x: string) => x !== filePath);
      }

      case RESTORE: {
        return action.payload.filePaths;
      }

      default:
        return state;
    }
  }

  //// helper
  export async function cleanup(dispatch: AppDispatch, filePaths: string[]) {
    const newFilePaths: string[] = [];
    for (const filePath of filePaths) {
      if (await exists(filePath)) newFilePaths.push(filePath);
    }

    if (newFilePaths.length !== filePaths.length) {
      dispatch(restore(newFilePaths));
    }
  }
}
