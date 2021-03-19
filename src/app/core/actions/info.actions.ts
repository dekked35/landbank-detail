import { Action, createAction, props } from '@ngrx/store';

export const Info = '[Info] Info Selected'

export class InfoAction implements Action {
  readonly type = Info
  constructor (public payload) { }

}

export type Actions
= InfoAction
