import { create } from 'zustand';

interface DialogState {
    titulo: string;
    mensaje: string;
    visible: boolean;
    setTitulo: (titulo: string) => void;
    setMensaje: (mensaje: string) => void;
    setVisible: (visible: boolean) => void;
}

const useDialogStore = create<DialogState>((set) => ({
    titulo: '',
    mensaje: '',
    visible: false,
    setTitulo: (titulo) => set(() => ({ titulo })),
    setMensaje: (mensaje) => set(() => ({ mensaje })),
    setVisible: (visible) => set(() => ({ visible })),
}));

export default useDialogStore;

// Función para establecer el título del diálogo
export const setDialogTitle = (titulo: string) => {
    useDialogStore.setState({ titulo });
};

// Función para establecer el mensaje del diálogo
export const setDialogMessage = (mensaje: string) => {
    useDialogStore.setState({ mensaje });
};

// Función para establecer la visibilidad del diálogo
export const setDialogVisibility = (visible: boolean) => {
    useDialogStore.setState({ visible });
};