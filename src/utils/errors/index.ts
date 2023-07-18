import Authorization from '~@/utils/authorization';
import { message } from 'antd';
import { CommonPath, AdminPath } from '~@/routes/paths';
import ErrorFile from '~@/utils/errors/errorConfig';

const ERRORCODE = ErrorFile.errorCode;

interface Error {
  response?: { status: number },
  errors?: [],
  data?: null,
  extensions?: {
    code: number,
    message: string
  }
}
// handle errors
class Errors {
  /**
   * handle error from axios catch response
   * @param error
   */
  /* handleAxiosErrors(error: Error) {
    if (error.response && error.response.status === ERRORCODE.NoPermission) {
      Authorization.grantAuthorization();
    }
    if (error && error.extensions && error.extensions.code) {
      const code = error.extensions.code;
      if (window.location.href.indexOf(`${CommonPath.LicenseException}`) > -1 || window.location.href.indexOf(`${AdminPath.License}`) > -1) {
        return;
      }
      if (code === ERRORCODE.ExCode_License_Err || code === ERRORCODE.ExCode_License_OverUserLimit || code === ERRORCODE.ExCode_License_Overdue) {
        location.href = `${window.location.protocol}//${window.location.host}${CommonPath.LicenseException}`;
      }
    }
  } */
  /**
   * handle error from axios catch response
   * @param error
   */
  handleAxiosErrors(error: Error) {
    if (error.response && error.response.status) {
      const code = error.response.status >= 400 && error.response.status <= 499 ? 400 : error.response.status >= 500 && error.response.status <= 599 ? 500 : 0;
      //弹层提示
      if (ErrorFile.needTipCode.includes(code)) {
        message.error(ErrorFile.errorTip[code]);
      }
    }
  }
  /**
   * handle business error from business code
   * @param error
   */

  handleBusinessErrors(error: Error) {
    // TODO: business
    if (error && error.extensions && error.extensions.code) {
      const code = error.extensions.code;
      //弹层提示
      if (ErrorFile.needTipCode.includes(code)) {
        message.error(ErrorFile.errorTip[code]);
      }
      if (code === ERRORCODE.ExCodeTokenNotBeEmpty || code === ERRORCODE.ExCode_Auth_TokenOverdue) {
        Authorization.grantAuthorization();
      }
      if (window.location.href.indexOf(`${CommonPath.LicenseException}`) > -1 || window.location.href.indexOf(`${AdminPath.License}`) > -1) {
        return;
      }
      if (code === ERRORCODE.ExCode_License_Err || code === ERRORCODE.ExCode_License_OverUserLimit || code === ERRORCODE.ExCode_License_Overdue) {
        location.href = `${window.location.protocol}//${window.location.host}${CommonPath.LicenseException}`;
      }
    }
  }
}

const instance = new Errors();
export { Errors, ERRORCODE };
export default instance;
