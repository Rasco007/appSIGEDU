import CryptoJS from 'crypto-js';
import Config from 'react-native-config';

export const encryptedAES = (text: string): string => {
  const aesSecret = Config.AES_SECRET;
  const aesIv = Config.AES_IV;

  const encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(text),
    CryptoJS.enc.Utf8.parse(aesSecret!),
    {
      iv: CryptoJS.enc.Utf8.parse(aesIv!),
      mode: CryptoJS.mode.CTR,
      padding: CryptoJS.pad.NoPadding,
    },
  );

  const rawBytes = encrypted.ciphertext;

  const base64Encoded = CryptoJS.enc.Base64.stringify(rawBytes);

  return base64Encoded;
};

export const decryptAES = (encryptedText: string): string => {
  const aesSecret = Config.AES_SECRET;
  const aesIv = Config.AES_IV;

  // Desencriptar sin realizar más decodificación
  const decrypted = CryptoJS.AES.decrypt(
    encryptedText,
    CryptoJS.enc.Utf8.parse(aesSecret!),
    {
      iv: CryptoJS.enc.Utf8.parse(aesIv!),
      mode: CryptoJS.mode.CTR,
      padding: CryptoJS.pad.NoPadding,
    },
  );

  // Convertir los bytes decodificados a una cadena UTF-8
  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

  return decryptedText;
};
