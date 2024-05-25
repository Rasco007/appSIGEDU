import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { apiFrmwk } from '../services/api';
import en from '../locales/en.json';
import es from '../locales/es.json';
import { setDialogMessage, setDialogTitle, setDialogVisibility } from '../store/dialogGlobal/dialogStore';
const fetchTranslations = async (languageCode) => {
  try {
    const formData = new FormData();
    formData.append('idioma', languageCode.toUpperCase());
    const response = await apiFrmwk.post('/framework/postIdioma', formData);
    const { datos } = response.data;

    return datos.traducciones;
  } catch (error) {


    if (error.response.status != 401) {
      setDialogTitle('generales.tituloError');
      setDialogMessage(error.toString());
      setDialogVisibility(true);
    }


  }
};

const initializeI18n = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const supportedLanguages = ['es', 'en'];
      const languageResources = {};

      await Promise.all(
        supportedLanguages.map(async (languageCode) => {
          const translationsFromEndpoint = await fetchTranslations(languageCode);
          const translationsFromJSON = languageCode === 'en' ? en : es;

          languageResources[languageCode] = {
            translation: {
              ...translationsFromJSON,
              ...translationsFromEndpoint,
            },
          };
        })
      );

      i18next
        .use(initReactI18next)
        .init({
          compatibilityJSON: 'v3',
          lng: 'es',
          fallbackLng: 'es',
          resources: languageResources,
        });
      resolve(); // Resuelve la promesa después de la inicialización de i18next
    } catch (error) {
      reject(error); // Rechaza la promesa si hay un error
    }
  });
};


initializeI18n();

export { i18next, initializeI18n };
