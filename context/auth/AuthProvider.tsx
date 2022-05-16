import { FC, useReducer, PropsWithChildren, useEffect } from "react";
import { AuthContext, authReducer} from ".";
import { IUser } from "../../interface";
import shopApi from '../../api/shopApi';
import Cookies from "js-cookie";
export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

type Props = {};
export const AuthProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  
  const login = async (email: string, password: string): Promise<boolean> => {
       try {
          const { data } = await shopApi.post('/user/login', { email, password });

          const {token , user } = data;

          Cookies.set('token', token);
         
          dispatch({type: '[AUTH] - LOGIN', payload: user });

          return true;

       } catch (error) {
         return false;
       }
  }


  return (
    <AuthContext.Provider
      value={{
        ...state,

        login
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
