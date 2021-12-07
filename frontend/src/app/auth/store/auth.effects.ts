import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, switchMap } from 'rxjs';

import * as authActions from './auth.actions';
import { AuthService } from '../auth.service';
import { APIUser, UserModel } from '../user.model';

type Token = {
  token: string;
  exp: number;
}

interface TokenResponse {
  access: Token;
  refresh: Token;
  user: APIUser;
}

const handleAuthenticate = (authResponse: TokenResponse) => {
  const { access, user } = authResponse;
  const expirationDate = new Date(access.exp * 1000);

  localStorage.setItem('accessToken', access.token);

  const authUser = new UserModel(
    user.username,
    user.first_name,
    user.last_name,
    user.email,
    access.token,
    expirationDate,
    user.permissions
  )

  return new authActions.AuthenticateSuccess({
    user: authUser
  });
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  authenticate = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.AUTHENTICATE),
      switchMap((authAction: authActions.Authenticate) => {
        return this.httpClient
          .post<TokenResponse>('/auth/token/', {
            username: authAction.payload.username,
            password: authAction.payload.password
          })
          .pipe(
            tap((response: TokenResponse) => {
              this.authService.setLogoutTimer(
                response.access.exp * 1000 - Date.now()
              );
            }),
            map((response: TokenResponse) => {
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
          this.authService.clearLogoutTimer();
          localStorage.removeItem('accessToken');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
}
