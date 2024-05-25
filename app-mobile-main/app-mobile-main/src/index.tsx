import React, {Suspense} from 'react';
import AppNavigation from './navigation';
import {AuthUser} from './context/AuthContextLog';
import {AppContextProvider} from './context/ClienteContex';
import {DialogProvider} from './context/DialogContext';
import {I18nextProvider} from 'react-i18next';
import {i18next} from './config/i18next.config';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import AppStyles from './styles';
import {COLORS} from './constants';
import AppLoader from './components/appLoader';

import Orientation from 'react-native-orientation-locker';

interface AppClientStateProps {
  children: React.ReactNode;
}

const AppClientState: React.FC<AppClientStateProps> = ({children}) => {
  return <AppContextProvider>{children}</AppContextProvider>;
};

export default function App() {
  const stylesGral = AppStyles();

  React.useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <React.Fragment>
      <Suspense fallback={<AppLoader />}>
        <I18nextProvider i18n={i18next}>
          <DialogProvider>
            <AuthUser>
              <AppClientState>
                <AppNavigation />
              </AppClientState>
            </AuthUser>
          </DialogProvider>
        </I18nextProvider>
      </Suspense>
    </React.Fragment>
  );
}
