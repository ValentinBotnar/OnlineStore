import { State } from '../../../app.reducer';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot
} from '@angular/router';
import { selectAuthenticated } from '../store/auth.selector';
import { tap } from 'rxjs/operators';
import { logout } from '../store/auth.action';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private store: Store<State>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.pipe(
            select(selectAuthenticated),
            tap(isAuthenticated => {
                if (!isAuthenticated) this.store.dispatch(logout())
            })
        )
    }

}