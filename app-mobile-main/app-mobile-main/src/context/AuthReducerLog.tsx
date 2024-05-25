import {AuthLogin} from './AuthContextLog';

type AuthAction = {type: 'signIn'; payload: string} | {type: 'logOut'};

// generaEstado
export const authReducer = (
  state: AuthLogin,
  action: AuthAction,
): AuthLogin => {
  switch (action.type) {
    case 'signIn':
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };

    case 'logOut':
      return {
        ...state,
        isLogin: false,
        user: '',
      };

    default:
      return state;
  }
};
