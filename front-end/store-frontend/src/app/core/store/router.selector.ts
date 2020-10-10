import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterState } from "./router.reducer";

export const selectRouterState = createFeatureSelector<RouterState>("router");

export const selectParamUrl = (key: string) =>
  createSelector(
    selectRouterState,
    (routerState: any) =>
      routerState && routerState.state.params && routerState.state.params[key]
  );

export const selectUrl = createSelector(
  selectRouterState,
  (routerState: any) => routerState && routerState.state.url
);
export const selecTabIndex = createSelector(
  selectRouterState,
  (routerState: any) => routerState && routerState.state.queryParams.tab
);

export const selectFilter = createSelector(
  selectRouterState,
  (routerState: any) => routerState && routerState.state.queryParams.filter
);

export const selectParams = createSelector(
  selectRouterState,
  (routerState: any) => routerState && routerState.state.queryParams
);

export const selectTitle = createSelector(
  selectRouterState,
  (routerState: any) => routerState && routerState.state.title
);
