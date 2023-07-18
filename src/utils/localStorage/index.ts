import { IKV } from '~@/interface';
import { LOGIN } from '~@/utils/dict';
class LocalStorage {
  /**
   * 设置 localstorage
   * @param kv
   */
  set(kv: IKV) {
    window.localStorage.setItem(kv.key, kv.value);
  }
  /**
   * 根据key获取 localstorage
   * @param kv
   */
  get(key: string): string {
    return window.localStorage.getItem(key) || '';
  }
  /**
   * 从localStorage里获取token
   * @param value
   */
  setToken(value: any) {
    this.set({
      key: LOGIN.TOKEN,
      value
    });
  }
  /**
   * 从localStorage里获取token
   */
  getToken(): string {
    return this.get(LOGIN.TOKEN) || '';
  }
  remove(key: string): void {
    window.localStorage.removeItem(key);
  }
  /**
   * 同步从localStorage里获取token
   */
  getTokenSync() {
    return new Promise((resolve) => {
      resolve(this.getToken());
    });
  }
  /**
   * 从localStorage里获取lang
   */
  getLang(): string {
    return this.get(LOGIN.LANG.replace('_', '-')) || '';
  }
}
const localStorage = new LocalStorage();
export { localStorage };
export default localStorage;
