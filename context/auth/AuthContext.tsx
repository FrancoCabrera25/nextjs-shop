import { createContext } from 'react';
import { IUser } from '../../interface';

interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;

    login: (email: string, password: string) => Promise<boolean>;
}


export const AuthContext = createContext({} as ContextProps);