const SSO = require('./sso');
const BASE_ADDRESS = '127.0.0.1/elephant/api/v1';
module.exports = Object.assign({
  BASE_ADDRESS,
  // API address
  API_ENDPOINT: `http://${BASE_ADDRESS}/gql/query`,
  // Websocket address
  WS_ENDPOINT: `ws://${BASE_ADDRESS}/ws`,
  // static address
  STATIC_ENDPOINT: 'http://127.0.0.1/elephant'
}, SSO);
