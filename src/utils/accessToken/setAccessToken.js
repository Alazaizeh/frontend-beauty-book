import CryptoJS from 'crypto-js';

const setAccessToken = (accessToken) => {
  localStorage.setItem('user-role', CryptoJS.AES.encrypt(JSON.stringify(accessToken), 'F!r3-key@99').toString());

};

export default setAccessToken;
