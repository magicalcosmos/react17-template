const SSO = require('./sso');
module.exports = Object.assign(
  {
    // API address
    BASE_ADDRESS:
      'return `${window.location.host}/elephant/api/v1`',
    // API address
    API_ENDPOINT:
      'return `${window.location.protocol}//${window.location.host}/elephant/api/v1/gql/query`',
    // Websocket address
    WS_ENDPOINT: 'return `ws://${window.location.host}/elephant/api/v1/ws`',
    STATIC_ENDPOINT: 'return `${window.location.protocol}//${window.location.host}/elephant`',
  },
  SSO
);
