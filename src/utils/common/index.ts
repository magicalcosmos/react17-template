import lodash from 'lodash';
class Common {
  private env = __RUN_ENV__;
  /**
   * 随机密码
   * @param num
   */
  randomPassword(num: number) {
    let password = '';
    for (let i = 0; i < (num || 6); i++) {
      password += Math.floor(Math.random() * 10);
    }
    return password;
  }
  /**
   * generate uuid
   **/
  genUUID() {
    const s = [];
    const hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = '-';
    const uuid = s.join('');
    return uuid;
  }
  /**
   * get ip address
   */
  getEnv() {
    if (this.env.BASE_ADDRESS.indexOf('return') !== -1) {
      const baseAddress = new Function(this.env.BASE_ADDRESS);
      const apiEndpoint = new Function(this.env.API_ENDPOINT);
      const wsEndpoint = new Function(this.env.WS_ENDPOINT);
      const staticEndpoint = new Function(this.env.STATIC_ENDPOINT);
      return {
        BASE_ADDRESS: baseAddress(),
        API_ENDPOINT: apiEndpoint(),
        WS_ENDPOINT: wsEndpoint(),
        STATIC_ENDPOINT: staticEndpoint(),
        SSO: this.env.SSO
      };
    }
    return this.env;
  }
  getURLParams() {
    const search = window.location.search;
    const paramsArray = search.substr(1, search.length).split('&');
    const paramsObject: any = {};
    paramsArray.forEach((item) => {
      const itemArray = item.split('=');
      paramsObject[itemArray[0]] = decodeURI(itemArray[1]);
    });
    return paramsObject;
  }
  /**
   * format date and time
   * @param timestamp
   * @param format
   * @param base
   */
  formatDateTime(timestamp: number | string, format?: string, base = 1000): string {
    /**
     * add 0 if number is smaller than 10
     */
    function isAdd0(n: number) {
      return n > 9 ? n : `0${n}`;
    }
    const now = new Date(timestamp * base);
    const year = now.getFullYear();
    const month = isAdd0(now.getMonth() + 1);
    const day = isAdd0(now.getDate());
    const hour = isAdd0(now.getHours());
    const minute = isAdd0(now.getMinutes());
    const second = isAdd0(now.getSeconds());
    switch (format && format.toLowerCase()) {
      case 'yyyy-mm-dd hh:mm':
        return `${year}-${month}-${day} ${hour}:${minute}`;
      case 'yyyy/mm/dd hh:mm':
        return `${year}/${month}/${day} ${hour}:${minute}`;
      case 'yyyy/mm/dd hh:mm:ss':
        return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
      default:
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
  }
  /* 获取文件后缀名 */
  getFileExtName(file: string): string {
    const dotIndex = file?.lastIndexOf('.');
    const extName = file?.substr(dotIndex + 1);
    return extName;
  }
  isNumber(val: string): boolean {
    const regPos = /^\d+(\.\d+)?$/; //非负浮点数
    const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
      return true;
    } else {
      return false;
    }
  }
  replaceSpecialCharacters(params) {
    const excludeKey = ['reqs', 'requirementIds', 'subRequirementIds', 'fileType'];
    if (params && params instanceof Object) {
      for (const key in params) {
        if (params[key] && typeof (params[key]) === 'string' && !excludeKey.includes(key)) {
          params[key] = params[key].replace(/\\/g, '\\\\');
          params[key] = params[key].replace(/\"/g, '\\"');
        }
      }
    }
    return params;
  }
  /* 去除input里前后空格 */
  InputTrim(formRef: any, e: any, stateName: string) {
    formRef.current.setFieldsValue({ [stateName]: lodash.trim(e.target.value) });
  }
  /* 可终止的异步请求 */
  promiseWithAbort(p:any) {
    const obj:any = {};
    const p1 = new Promise((resolve, reject) => {
      obj.abort = reject;
      //resolve(21);
    });
    obj.promise = Promise.race([p, p1]);
    return obj;
  }

}

const instance = new Common();
export { Common };
export default instance;
