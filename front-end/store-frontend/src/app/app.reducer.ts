import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {AuthState, initialState} from './features/auth/store/auth.reducer';
import {localStorageSync} from 'ngrx-store-localstorage';
import * as authStore from './features/auth/store/auth.reducer';
import { logout } from './features/auth/store/auth.action';


export interface State {
  router: RouterReducerState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  auth: authStore.reducer
};

export const metaReducers: MetaReducer<State>[] = [appMetaReducer, localStorageSyncReducer];

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    rehydrate: true,
    keys: ['auth']
  })(reducer);
}

export function appMetaReducer(reducer) {
  return function newReducer(state, action) {
    let nextState = state;
    if (action.type === logout.type) {
      nextState = {...state, auth: initialState};
    }
    return reducer(nextState, action);
  };
}
