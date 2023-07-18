const SSO = require('./sso');
module.exports = Object.assign({
  BASE_ADDRESS: '127.0.0.1/elephant/api/v1',
  // API address
  API_ENDPOINT: 'http://127.0.0.1/elephant/api/v1/gql/query',
  // Websocket address
  WS_ENDPOINT: 'ws://127.0.0.1/elephant/api/v1/ws',
  // static address
  STATIC_ENDPOINT: 'http://127.0.0.1/elephant'
}, SSO);

