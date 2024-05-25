import React, {createContext, useState, useContext, ReactNode} from 'react';

interface DialogContextProps {
  titulo: string;
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
  mensaje: string;
  setMensaje: React.Dispatch<React.SetStateAction<string>>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

interface DialogProviderProps {
  children: ReactNode;
}

export const DialogProvider: React.FC<DialogProviderProps> = ({children}) => {
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [visible, setVisible] = useState(false);

  const values: DialogContextProps = {
    titulo,
    setTitulo,
    mensaje,
    setMensaje,
    visible,
    setVisible,
  };

  return (
    <DialogContext.Provider value={values}>{children}</DialogContext.Provider>
  );
};

export const useDialog = (): DialogContextProps => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog debe ser utilizado dentro de un DialogProvider');
  }
  return context;
};
