import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppContext} from '../../context/ClienteContex';
const {state} = useContext(AppContext);
const {color_texto} = state.cliente;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: '#fff096',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    shadowColor: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: color_texto,
  },
  modalDetailContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  modalDetailMessage: {
    fontSize: 16,
    marginBottom: 16,
    color: color_texto,
  },
  modalSelectedEvent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3', // Puedes cambiar el color según tus preferencias
    marginBottom: 16,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 10,
  },
  modalButton: {
    marginLeft: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,

    backgroundColor: '#2196F3',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalselectedEvent: {},
});
