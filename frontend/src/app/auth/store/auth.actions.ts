import { Action } from '@ngrx/store';
import { UserModel } from '../user.model';

export const AUTHENTICATE = '[Auth] Authenticate user';
export const AUTO_AUTHENTICATE = '[Auth] Auto authenticate (on refresh)';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate success';

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

  constructor(public payload: { user: UserModel }) {}
}

export class ClearAuthentication implements Action {
  readonly type: typeof CLEAR_AUTHENTICATION = CLEAR_AUTHENTICATION;
}

export type authActions =
  | Authenticate
  | AutoAuthenticate
  | AuthenticateSuccess
  | ClearAuthentication;
