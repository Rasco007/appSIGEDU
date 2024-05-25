import React, { useContext } from 'react';
import { Dialog, Portal, Text, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants';
import { AppContext } from '../../context/ClienteContex';

type Props = {
  titulo: string;
  mensaje: string;
  estado: boolean;
  setEstado: React.Dispatch<React.SetStateAction<boolean>>;
};

const DialogTitle: React.FC<Props> = ({ titulo, mensaje, estado, setEstado }) => {
  const { state, dispatch } = useContext(AppContext);
  // Extracción de datos
  const { color_primario } = state.cliente;

  const hideDialog = () => setEstado(false);

  const {color_texto} = state.cliente;

  return (
    <Portal>
      <Dialog visible={estado} onDismiss={hideDialog} style={styles.dialog}>
        <Dialog.Title style={styles.title}>{titulo}</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.message}>{mensaje}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog} style={{
            padding: 2,
            borderColor: color_primario,
            borderRadius: 15,
            borderWidth: 0.1,
          }}>Cerrar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
  },

});

export default DialogTitle;
