import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, switchMap } from 'rxjs';

import * as authActions from './auth.actions';

const handleAuthenticate = ({ access, refresh }) => {
  localStorage.setItem('accessToken', access);

  return new authActions.AuthenticateSuccess({
    accessToken: access,
    refreshToken: refresh
  });
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  authenticate = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.AUTHENTICATE),
      switchMap((authAction: authActions.Authenticate) => {
        return this.httpClient
          .post('/auth/token/', {
            username: authAction.payload.username,
            password: authAction.payload.password
          })
          .pipe(
            map((response: { access: string; refresh: string }) => {
              return handleAuthenticate(response);
            })
          );
      })
    )
  );

  clearAuthentication = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.CLEAR_AUTHENTICATION),
        tap(() => {
          localStorage.removeItem('accessToken');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
}
