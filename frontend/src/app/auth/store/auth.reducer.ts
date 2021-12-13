import * as authActions from './auth.actions';
import { UserModel } from '../user.model';
import { HttpErrorResponse } from '@angular/common/http';

const getAuthErrorMessage = (authError: HttpErrorResponse) => {
  let errorMessage = 'An error occurred';
  const { error, status, statusText } = authError;

  switch (status) {
    case 504:
      errorMessage = statusText;
      break;
    case 401:
      errorMessage = error.detail;
      break;
  }

  return errorMessage;
};

export interface AuthState {
  user: UserModel;
  isAuthenticating: boolean;
  authError: string;
}

const initialState: AuthState = {
  user: null,
  isAuthenticating: false,
  authError: null
};

export function authReducer(
  state: AuthState = initialState,
  action: authActions.authActions
) {
  switch (action.type) {
    case authActions.AUTHENTICATE:
      return {
        ...state,
        isAuthenticating: true,
        authError: null
      };
    case authActions.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticating: false,
        authError: null
      };
    case authActions.AUTHENTICATE_FAIL:
      const errorMessage = getAuthErrorMessage(action.payload.authError);
      return {
        ...state,
        isAuthenticating: false,
        authError: errorMessage
      };
    case authActions.CLEAR_AUTHENTICATION_ERROR:
      return {
        ...state,
        authError: null
      };
    case authActions.CLEAR_AUTHENTICATION:
      return {
        ...state,
        user: null,
        isAuthenticating: false,
        authError: null
      };
    default:
      return {
        ...state
      };
  }
}
