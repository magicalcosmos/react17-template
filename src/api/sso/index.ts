//*************************
//  帮助
//*************************
import Ajax from '~@/utils/ajax';
import Common from '~@/utils/common';
class SSO {
  /**
   * get oAuth API
   */
  getOAuthAPI() {
    const { BASE_ADDRESS, SSO } = Common.getEnv();
    return Ajax.get({
      url: `http://${BASE_ADDRESS}${SSO.API}`,
      params: {}
    });
  }
}
const instance = new SSO();
export { SSO };
export default instance;
