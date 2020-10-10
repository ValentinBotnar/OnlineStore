import { User } from './../types/user.type';
import { createAction, props } from '@ngrx/store';
import { AuthenticationProfile } from '../types/auth-profile.type';
import { Confirmation } from '../types/confirmation.type';


export const signin = createAction('[Auth/API] Signin', props<{ user: User }>());
export const checkToken = createAction('[Auth/API] CheckToken', props<{ confirmation: Confirmation }>());
export const signinSuccess = createAction('[Auth/API] Signin Success', props<{ authProfile: AuthenticationProfile }>());
export const signinError = createAction('[Auth/API] Signin Error', props<{ message: string }>());

export const signup = createAction('[Auth/API] Signup', props<{ user: User }>());
export const signupSuccess = createAction('[Auth/API] Signup Success', props<{ authProfile: AuthenticationProfile }>());
export const signupError = createAction('[Auth/API] Signup Error', props<{ message: string }>());

export const logout = createAction('[Auth/API] Logout');
