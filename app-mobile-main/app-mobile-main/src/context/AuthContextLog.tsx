import React, {ReactNode, createContext, useReducer} from 'react';
import {authReducer} from './AuthReducerLog';

export interface AuthLogin {
  isLogin: boolean;
  user: string;
}

export const valorInicialLogin = {
  isLogin: false,
  user: '',
};

export interface LoginProps {
  authLogin: AuthLogin;
  logOut: () => void;
  signIn: (user: string) => void;
}

export const ContextLogin = createContext({} as LoginProps);

export const AuthUser: React.FC<{children: ReactNode}> = ({children}) => {
  const [authLogin, dispatch] = useReducer(authReducer, valorInicialLogin);

  const signIn = (user: string) => {
    dispatch({type: 'signIn', payload: user});
  };
  const logOut = () => {
    dispatch({type: 'logOut'});
  };
  return (
    <ContextLogin.Provider
      value={{
        authLogin,
        signIn,
        logOut,
      }}>
      {children}
    </ContextLogin.Provider>
  );
};
