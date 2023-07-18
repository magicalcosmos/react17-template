import { makeAutoObservable } from 'mobx';
class LicenseStore {
  // 这里必须给定一个初始化的只，否则响应式数据不生效
  hasLicense = null;
  license = {};
  constructor() {
    // 这里是实现响应式的关键
    makeAutoObservable(this);
  }
  setHasLicense(hasLicense: boolean) {
    this.hasLicense = hasLicense;
  }
  setLicense(license: any) {
    Object.assign(this.license, license);
  }
}
export { LicenseStore };
export default new LicenseStore();
