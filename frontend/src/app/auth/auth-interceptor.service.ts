import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, map, Observable, take } from 'rxjs';

import * as appStore from '../store/app.reducer';
import * as authStore from './store/auth.reducer';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<appStore.AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState: authStore.AuthState) => {
        return authState.user;
      }),
      exhaustMap((user: UserModel) => {
        if (!user) return next.handle(req);

        const authRequest = req.clone({
          headers: new HttpHeaders().set(
            'Authorization',
            `Bearer ${user.token}`
          )
        });

        return next.handle(authRequest);
      })
    );
  }
}
