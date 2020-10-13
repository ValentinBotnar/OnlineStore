import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  logout,
  signin,
  signinError,
  signinSuccess,
  signup,
  signupError,
  signupSuccess,
  checkToken
} from './auth.action';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AuthService, AUTH_PROFILE } from '../services/auth.service';
import { go } from 'src/app/core/store/router.action';

@Injectable()
export class AuthEffect {

  checkTsoken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkToken),
      switchMap(({ confirmation }) => {
        if (confirmation.firstName) {
          return this.authService.checkSignupKey({ ...confirmation }).pipe(
            map(authProfile => {
              return signupSuccess({ authProfile })
            }),
            catchError(({ message }) => of(signupError({ message })))
          )
        } else {
          return this.authService.checkSigninKey({ ...confirmation }).pipe(
            map(authProfile => {
              return signinSuccess({ authProfile })
            }),
            catchError(({ message }) => of(signinError({ message })))
          )
        }
      })
    )
  )

  success$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signinSuccess, signupSuccess),
      tap(({ authProfile }) => {
        this.localStorage.setItem(AUTH_PROFILE, authProfile).subscribe();
      }),
      map(() => go({ path: ['/account'] }))
    )
  );

  error$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signinError, signupError),
        tap(({ message }) => {
          // TODO: Show your error toast here!
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        this.authService.logout();
      }),
      map(() => go({ path: ['/dashboard'] }))
    )
  );

  constructor(
    private actions$: Actions,
    private localStorage: LocalStorage,
    private authService: AuthService
  ) { }
}
