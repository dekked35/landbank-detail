import { Action, createReducer, on } from "@ngrx/store";

import * as pageAction from "../actions/page.actions";

export const pageFeatureKey = "page";

export interface State {
  page: any;
}

export const initialState: State = {
  page: { name: "village", id: "1" },
};

const pageReducer = createReducer(initialState);

export function reducer(state: State, action: pageAction.Actions) {
  switch (action.type) {
    case pageAction.PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default: {
      return state;
    }
  }
}

export const getPage = (state: State) => state.page;
