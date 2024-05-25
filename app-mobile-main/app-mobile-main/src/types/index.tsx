export interface HomeScreenParams {
  Home: {userId: string};
}
export type RoutesScreenParams = {
  Login: undefined;
};
export type HomeProps = {
  navigation: any;
  route: any;
};

export type cardPerfil = {
  children?: any;
  title: string;
  icon: string;
  onSelected: () => void;
  size?: number;
};

export type perfil = {
  state: string;
  userData: userData[];
};
export type userData = {
  names: string;
  surnames: string;
  mail: string;
  id: string;
};
export type ApiCredencial = {
  msj: string;
  state: string;
  userId: string;
  userName: string;
};
