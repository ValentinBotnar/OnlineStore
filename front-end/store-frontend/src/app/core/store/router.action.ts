import { createAction, props } from "@ngrx/store";

export const go = createAction(
  "[Router] Go",
  props<{ path: any[]; queryParam?: any }>()
);
export const back = createAction("[Router] Back");
