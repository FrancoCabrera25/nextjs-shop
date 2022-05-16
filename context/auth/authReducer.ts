
import { IUser } from "../../interface";
import { AuthState } from './AuthProvider';

type UiActionType =
  | { type: "[AUTH] - LOGIN"; payload: IUser }
  | { type: "[AUTH] - LOGOUT"; }

export const authReducer = (
  state: AuthState,
  action: UiActionType
): AuthState => {
  switch (action.type) {
    case '[AUTH] - LOGIN' :
      return{
        ...state,
        isLoggedIn: true,
        user: action.payload,
      }
      case '[AUTH] - LOGOUT' :
        return {
          ...state,
          isLoggedIn: false,
          user: undefined,
        }
    default:
      return state;
  }
};
