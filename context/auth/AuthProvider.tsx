import { FC, useReducer, PropsWithChildren, useEffect } from "react";
import { AuthContext, authReducer } from ".";
import { IUser } from "../../interface";
import shopApi from "../../api/shopApi";
import Cookies from "js-cookie";
import axios from "axios";
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
      const { data } = await shopApi.post("/user/login", { email, password });

      const { token, user } = data;

      Cookies.set("token", token);
      dispatch({ type: "[AUTH] - LOGIN", payload: user });

      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: any }> => {
    try {
      const { data } = await shopApi.post("/user/register", {
        name,
        email,
        password,
      });

      const { token, user } = data;

      Cookies.set("token", token);
      dispatch({ type: "[AUTH] - LOGIN", payload: user });

      return {
        hasError: false,
        message: "",
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { message = '' } = error.response?.data;
        return {
          hasError: true,
          message
        };
      }

      return {
        hasError: true,
        message: "No se puedo crear el usuario - intente de nuevo",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        login,
        registerUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
