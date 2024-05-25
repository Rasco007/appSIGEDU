import {Button, TextInput, Text, View, Modal} from 'react-native';
import {styles} from './styles';

//como llamar al componente
{
  /* <Modals title={'Detalle Tarea'} textDetailModal={'Esta seguro que desea borrar?'} modalVisible={modalVisible} animation='fade' 
      onPressBtnAccept={() => onHandleDelete(selectedEvent?.id)}
        onPressBtnCancel={onHandleCancelModal}></Modals> */
}

interface ModalProps {
  title: string;
  textDetailModal: string;
  modalVisible: boolean;
  animation: 'fade' | 'slide';
  onPressBtnAccept: (id: any) => void;
  onPressBtnCancel: (id: any) => void;
}
const Modals: React.FC<ModalProps> = ({
  title,
  textDetailModal,
  modalVisible,
  animation,
  onPressBtnAccept,
  onPressBtnCancel,
}) => {
  return (
    <Modal visible={modalVisible} animationType={animation}>
      <View style={styles.modalContainer}>
        <View style={styles.modalDetailContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalDetailMessage}>{textDetailModal}</Text>
          <View style={styles.modalButtonContainer}>
            <Button
              title="Cancelar"
              color="#fff096"
              onPress={onPressBtnCancel}></Button>
            <Button
              title="Aceptar"
              color="#fff096"
              onPress={onPressBtnAccept}></Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default Modals;
