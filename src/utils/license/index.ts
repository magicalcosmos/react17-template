import { LICENSE_MANAGEMENT } from '~@/api';
/* import { ERRORCODE } from '~@/utils/errors'; */
import { LICENSE } from '~@/utils/dict';
class License {
  // grant authorization
  getLicense() {
    return new Promise((resolve, reject) => {
      LICENSE_MANAGEMENT.licenseInfo({}).then((data:any) => {
        if (data) {
          const currentLicenseInfo = data.licenseInfo;
          if (currentLicenseInfo.status !== LICENSE.EFFECTIVE) {
            reject();
          } else {
            resolve(currentLicenseInfo.status);
          }
        }
      }, (error) => {
        if (error && error.extensions && error.extensions.code) {
          reject();
        }
      });
    });
  }
}
const instance = new License();
export { License };

export default instance;
