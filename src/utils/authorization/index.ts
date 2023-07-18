import packageInfo from '../../../appInfo';
import { SSO_API, USER_MANAGEMENT_API } from '~@/api';
import LocalStorage from '~@/utils/localStorage';
import Log from '~@/utils/log';
import Common from '~@/utils/common';
class Authorization {
  // grant authorization
  grantAuthorization() {
    SSO_API.getOAuthAPI().then((data: any) => {
      const app_name = packageInfo.productName;
      const redirect_uri = encodeURIComponent(
        `${window.location.protocol}//${window.location.host}`
      );
      const { SSO } = Common.getEnv();
      let oAuthBase = data.data && data.data.oauthBase;
      if (oAuthBase === undefined || oAuthBase === '') {
        oAuthBase = `${redirect_uri}/sso`;
      }
      if (oAuthBase.indexOf('localhost') !== -1) {
        if (oAuthBase.indexOf('http') !== -1) {
          oAuthBase = `${window.location.protocol}//${oAuthBase}`;
        }
        oAuthBase = oAuthBase.replace('localhost', window.location.hostname);
      }
      location.href = `${oAuthBase}?redirect_uri=${redirect_uri}&client_id=${SSO.CLIENT_ID}&app_name=${app_name}&response_type=${SSO.RESPONSE_TYPE}`;
    });
  }
  // sign out
  signout() {
    LocalStorage.setToken('');
    USER_MANAGEMENT_API.signout()
      .then(() => {
        this.grantAuthorization();
      })
      .catch((error: Error) => {
        Log.error(error);
      });
  }
}
const instance = new Authorization();
export { Authorization };

export default instance;
