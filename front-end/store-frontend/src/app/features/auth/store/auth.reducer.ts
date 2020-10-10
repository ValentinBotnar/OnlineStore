import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AuthenticationProfile } from '../types/auth-profile.type';
import { Action, createReducer, on } from '@ngrx/store';
import { logout, signin, signinError, signinSuccess, signup, signupError, signupSuccess } from './auth.action';

export interface AuthState extends EntityState<AuthenticationProfile> {
  loading: boolean;
  authenticated: boolean;
  error: string;
}

export const adapter: EntityAdapter<AuthenticationProfile> = createEntityAdapter<AuthenticationProfile>({
  selectId: (user) => user.user.id
});

export const initialState: AuthState = adapter.getInitialState({
  loading: false,
  authenticated: false,
  error: undefined
});

const authReducer = createReducer(
  initialState,
  on(signin, (state: AuthState) => {
    return { ...state, loading: true, error: undefined };
  }),
  on(signinSuccess, (state, { authProfile }) => {
    return adapter.upsertOne(authProfile, {
      ...state,
      authenticated: true,
      loading: false
    });
  }),
  on(signinError, (state: AuthState) => {
    return adapter.removeAll({ ...state, loading: false, error: 'auth.badCredentials' });
  }),
  on(signup, (state: AuthState) => {
    return { ...state, loading: true };
  }),
  on(signupSuccess, (state, { authProfile }) => {
    return adapter.upsertOne(authProfile, { ...state, authenticated: true, loading: false });
  }),
  on(signupError, (state: AuthState) => {
    return adapter.removeAll({ ...state, loading: false });
  }),
  on(logout, (state: AuthState) => {
    return { ...state, authenticated: false };
  })
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
