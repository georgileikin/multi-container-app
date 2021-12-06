import * as authActions from './auth.actions';

export interface AuthState {
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null
};

export function authReducer(
  state: AuthState = initialState,
  action: authActions.authActions
) {
  switch (action.type) {
    case authActions.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      };
    case authActions.CLEAR_AUTHENTICATION:
      return {
        ...state,
        accessToken: null,
        refreshToken: null
      };
    default:
      return {
        ...state
      };
  }
}
