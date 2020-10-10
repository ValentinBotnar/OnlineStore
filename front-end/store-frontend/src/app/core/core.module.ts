import { NgModule, Provider } from "@angular/core";
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";

import { EffectsModule } from "@ngrx/effects";

import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { ErrorHandlingInterceptor } from "./interceptors/error-handling.interceptor";
import { environment } from "../../environments/environment";
import { RouterEffect } from "./store/router.effect";
import { RouterCustomSerializer } from "./store/router.reducer";
import { reducers, metaReducers } from "../app.reducer";
import { AuthEffect } from "../features/auth/store/auth.effect";

const ERROR_INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: ErrorHandlingInterceptor,
};

@NgModule({
  imports: [
    StoreRouterConnectingModule.forRoot({
      serializer: RouterCustomSerializer,
    }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([RouterEffect, AuthEffect]),
    StoreRouterConnectingModule,
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 10 })
      : [],
  ],
  providers: [
    ERROR_INTERCEPTOR,
    { provide: RouterStateSerializer, useClass: RouterCustomSerializer },
  ],
})
export class CoreModule {}
