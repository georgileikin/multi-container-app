import { Action } from '@ngrx/store';
import { UserModel } from '../user.model';
import { HttpErrorResponse } from '@angular/common/http';

export const AUTHENTICATE = '[Auth] Authenticate user';
export const AUTO_AUTHENTICATE = '[Auth] Auto authenticate (on refresh)';

export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate fail';

export const CLEAR_AUTHENTICATION_ERROR = '[Auth] Clear authentication error';

export const CLEAR_AUTHENTICATION = '[Auth] Clear authentication';

export class Authenticate implements Action {
  readonly type: typeof AUTHENTICATE = AUTHENTICATE;

  constructor(public payload: { username: string; password: string }) {}
}

export class AutoAuthenticate implements Action {
  readonly type: typeof AUTO_AUTHENTICATE = AUTO_AUTHENTICATE;
}

export class AuthenticateSuccess implements Action {
  readonly type: typeof AUTHENTICATE_SUCCESS = AUTHENTICATE_SUCCESS;

  constructor(public payload: { user: UserModel; redirect: boolean }) {}
}

export class AuthenticateFail implements Action {
  readonly type: typeof AUTHENTICATE_FAIL = AUTHENTICATE_FAIL;

  constructor(public payload: { authError: HttpErrorResponse }) {}
}

export class ClearAuthenticationError implements Action {
  readonly type: typeof CLEAR_AUTHENTICATION_ERROR = CLEAR_AUTHENTICATION_ERROR;
}

export class ClearAuthentication implements Action {
  readonly type: typeof CLEAR_AUTHENTICATION = CLEAR_AUTHENTICATION;
}

export type authActions =
  | Authenticate
  | AutoAuthenticate
  | AuthenticateSuccess
  | AuthenticateFail
  | ClearAuthenticationError
  | ClearAuthentication;
