const SSO = require('./sso');
const BASE_ADDRESS = '127.0.0.1/elephant/api/v1'; //staging:127.0.0.1; 10.88.222.207,10.88.223.229:9080,future:10.88.222.142,shiyatao:172.16.200.26/   10.88.222.104   
module.exports = Object.assign({
  BASE_ADDRESS,
  // API address
  API_ENDPOINT: `http://${BASE_ADDRESS}/gql/query`,
  // Websocket address
  WS_ENDPOINT: `ws://${BASE_ADDRESS}/ws`,
  //WS_ENDPOINT: `ws://172.16.20.37:811/api/v1/ws`,
  // static address
  STATIC_ENDPOINT: 'http://127.0.0.1/elephant'
}, SSO);

