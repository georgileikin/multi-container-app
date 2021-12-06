import * as authActions from './auth.actions';
import { UserModel } from '../user.model';

export interface AuthState {
  user: UserModel
}

const initialState: AuthState = {
  user: null
};

export function authReducer(
  state: AuthState = initialState,
  action: authActions.authActions
) {
  switch (action.type) {
    case authActions.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        user: action.payload.user
      };
    case authActions.CLEAR_AUTHENTICATION:
      return {
        ...state,
        user: null
      };
    default:
      return {
        ...state
      };
  }
}
