import { Action, createReducer, on } from "@ngrx/store";

import * as infoAction from "../actions/info.actions";

export const infoFeatureKey = "info";

export interface State {
  info: any;
}

export const initialState: State = {
  info: { },
};

const infoReducer = createReducer(initialState);

export function reducer(state: State, action: infoAction.Actions) {
  switch (action.type) {
    case infoAction.Info:
      return {
        ...state,
        info: action.payload,
      };
    default: {
      return state;
    }
  }
}

export const getInfo = (state: State) => state.info;
