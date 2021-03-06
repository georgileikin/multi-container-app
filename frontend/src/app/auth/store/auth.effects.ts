import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, switchMap, catchError, of } from 'rxjs';

import * as authActions from './auth.actions';
import { AuthService } from '../auth.service';
import { APIUser, UserModel } from '../user.model';

type Token = {
  token: string;
  exp: number;
};

interface TokenResponse {
  access: Token;
  refresh: Token;
  user: APIUser;
}

const handleAuthenticate = (authResponse: TokenResponse) => {
  const { access, user } = authResponse;

  const authUser = new UserModel(
    user.username,
    user.first_name,
    user.last_name,
    user.email,
    user.permissions,
    access.token,
    access.exp * 1000
  );

  localStorage.setItem('authUser', JSON.stringify(authUser));

  return new authActions.AuthenticateSuccess({
    user: authUser,
    redirect: true
  });
};

const handleErrorResponse = (authError: HttpErrorResponse) => {
  return of(new authActions.AuthenticateFail({ authError }));
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
            }),
            catchError((authError: HttpErrorResponse) => {
              return handleErrorResponse(authError);
            })
          );
      })
    )
  );

  autoAuthenticate = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.AUTO_AUTHENTICATE),
      map(() => {
        const authUser = JSON.parse(localStorage.getItem('authUser'));

        if (!authUser) {
          return { type: 'DUMMY' };
        }

        const user = new UserModel(
          authUser.username,
          authUser.firstName,
          authUser.lastName,
          authUser.email,
          authUser.permissions,
          authUser._token,
          authUser._expiration
        );

        this.authService.setLogoutTimer(authUser._expiration - Date.now());

        return new authActions.AuthenticateSuccess({
          user,
          redirect: false
        });
      })
    )
  );

  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.AUTHENTICATE_SUCCESS),
        tap((action: authActions.AuthenticateSuccess) => {
          if (action.payload.redirect) {
            this.router.navigate(['/items']);
          }
        })
      ),
    { dispatch: false }
  );

  clearAuthentication = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.CLEAR_AUTHENTICATION),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('authUser');
          this.router.navigateByUrl('/home');
        })
      ),
    { dispatch: false }
  );
}
