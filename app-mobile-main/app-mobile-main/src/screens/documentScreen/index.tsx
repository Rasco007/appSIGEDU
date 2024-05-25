import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Linking,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import axios from 'axios';
import {apiClient} from '../../services/api';
import Pdf from 'react-native-pdf';
import {ActivityIndicator, Button, IconButton, Text} from 'react-native-paper';
import {useDialog} from '../../context/DialogContext';
import RNShare from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import {request, PERMISSIONS} from 'react-native-permissions';
import {AppContext} from '../../context/ClienteContex';
import AppStyles from '../../styles';
import {Easing} from 'react-native-reanimated';
import {useFocusEffect} from '@react-navigation/native';
interface PDFViewerProps {
  navigation: any;
  route: any;
}
interface PDF {
  name: string;
  base64: string;
}
const PDFViewer: React.FC<PDFViewerProps> = ({navigation, route}) => {
  const {setTitulo, setMensaje, setVisible} = useDialog();
  const stylesGral = AppStyles();
  const [pdf, setPdf] = useState<PDF[]>();
  const [item, setItem] = useState<number>(0);
  const [permiso, setPermiso] = useState<boolean>(false);
  const {id_archivo, d_url_endpoint, d_title_back} = route.params;
  const {handleLogout, state} = useContext(AppContext);
  const {color_primario} = state.cliente;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState('loading');

  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === 'android') {
        request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(result => {
          if (result !== 'granted') {
            setTitulo('generales.tituloError');
            setMensaje('generales.permisoDenegado');
            setVisible(true);
            setPermiso(false);
          } else {
            setPermiso(true);
          }
        });
      } else if (Platform.OS === 'ios') {
        request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
          if (result !== 'granted') {
            setTitulo('generales.tituloError');
            setMensaje('generales.permisoDenegado');
            setVisible(true);
            setPermiso(false);
          } else {
            setPermiso(true);
          }
        });
      }

      return () => {
        // Lógica de limpieza si es necesario al salir de la pantalla
      };
    }, []),
  );
  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        // const apiClient = axios.create(apiConfigClient);
        const formData = new FormData();
        formData.append('id_archivo', id_archivo);
        let response = await apiClient.post('/client/pdf', formData);
        const pdf = response.data.data;
        setItem(0);
        if (pdf.length !== 0) {
          setPdf(pdf);
          setLoading('loaded');
        } else {
          setTitulo('generales.tituloError');
          setMensaje('generales.noEncontrado');
          setVisible(true);

          console.log(d_title_back);

          navigation.navigate('MenuDinamicoScreen', {
            title: d_title_back,
            endpoint: d_url_endpoint,
          });
        }
      } catch (error: any) {
  
        if (error.response.status != 401) {
          setTitulo('generales.tituloError');
          setMensaje(error.toString());
          setVisible(true);
        }
      }
    };
    setLoading('loading');
    fetchPDFs();
  }, [id_archivo]);

  const downloadPDF = async () => {
    try {
      if (pdf && pdf.length > 0) {
        const path =
          RNFetchBlob.fs.dirs.DownloadDir + '/' + pdf![item].name + '.pdf';
        RNFetchBlob.config({
          fileCache: true,
          appendExt: 'pdf',
        });
        const fileExists = await RNFetchBlob.fs.exists(path);
        if (!fileExists && pdf) {
          const base64Data = pdf[item]!.base64.replace(
            /^data:application\/pdf;base64,/,
            '',
          );
          await RNFetchBlob.fs.writeFile(path, base64Data, 'base64');
          setTitulo('generales.tituloDescarga'),
            setMensaje('generales.descargaExitosa'),
            setVisible(true);
        } else {
          setTitulo('generales.tituloError'),
            setMensaje('generales.descargaFallida'),
            setVisible(true);
        }
      }
    } catch (error) {
      setTitulo('generales.tituloError'),
        setMensaje('generales.descargaFallida'),
        setVisible(true);
    }
  };
  const menuLeft = () => {
    if (item > 0) {
      Animated.timing(slideAnim, {
        toValue: -1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        setItem(item - 1);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).reset();
      });
    }
  };

  const menuRigth = () => {
    if (item < pdf!.length - 1) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        setItem(item + 1);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).reset();
      });
    }
  };
  const sharePDF = async () => {
    try {
      const options = {
        title: 'Compartir PDF',
        message: 'Elija una aplicación para compartir el archivo PDF',
        url: pdf![item].base64,
        type: 'application/pdf',
      };
      await RNShare.open(options);
    } catch (error: any) {
      if (error.message !== 'User did not share') {
        setTitulo('generales.tituloError'),
          setMensaje('generales.descargaFallida' + ' ' + error),
          setVisible(true);
      }
    }
  };
  const {height} = Dimensions.get('window');
  return (
    <View style={stylesGral.containerPdf}>
      {loading === 'loading' ? (
        <ActivityIndicator
          animating={true}
          size={100}
          style={stylesGral.loading}
        />
      ) : pdf && pdf.length > 0 && pdf[item] ? (
        <>
          <Text style={stylesGral.textDocument}>{pdf[item].name}</Text>
          <Animated.View
            style={{
              opacity: slideAnim.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [0, 1, 0], // Valores de opacidad de 0 a 1
              }),
              height: '85%',
              justifyContent: 'center',
              alignItems: 'center',
              aspectRatio: 1,
            }}>
            <Pdf
              trustAllCerts={false}
              source={{uri: `${pdf[item].base64}`}}
              page={1}
              scale={1.0}
              minScale={0.5}
              maxScale={3.0}
              renderActivityIndicator={() => <ActivityIndicator size="large" />}
              enablePaging={true}
              onError={(error: any) => (
                setTitulo('generales.tituloError'),
                setMensaje(error),
                setVisible(true),
                console.log('error')
              )}
              onPressLink={link => Linking.openURL(link)}
              spacing={10}
              style={stylesGral.pdf}
            />
          </Animated.View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '80%',
            }}>
            {pdf && pdf.length > 1 && (
              <>
                <IconButton
                  iconColor={color_primario}
                  icon="menu-left-outline"
                  onPress={menuLeft}
                />
                <IconButton
                  iconColor={color_primario}
                  icon="menu-right-outline"
                  onPress={menuRigth}
                />
              </>
            )}
            <IconButton
              iconColor={color_primario}
              icon="share-outline"
              onPress={sharePDF}
            />
            {permiso && (
              <IconButton
                iconColor={color_primario}
                icon="download-outline"
                onPress={downloadPDF}
              />
            )}
          </View>
        </>
      ) : null}
    </View>
  );
};

export default PDFViewer;
