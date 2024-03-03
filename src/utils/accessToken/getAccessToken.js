import CryptoJS from 'crypto-js';

const getAccessToken = () => {
  const cipherText = localStorage.getItem('user-role');

  if(cipherText)
  {

  let bytes = CryptoJS.AES.decrypt(cipherText || '', 'F!r3-key@99');
  let accessToken = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return accessToken;
}

return "";
};

export default getAccessToken;
