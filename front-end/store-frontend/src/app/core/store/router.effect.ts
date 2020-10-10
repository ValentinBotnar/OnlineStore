import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { Location } from "@angular/common";
import { back, go } from "./router.action";

@Injectable()
export class RouterEffect {
  go$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(go),
        map(({ path, queryParam }) => {
          this.router.navigate(path, { queryParams: queryParam });
        })
      ),
    { dispatch: false }
  );

  back$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(back),
        map(() => this.location.back())
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}
}
