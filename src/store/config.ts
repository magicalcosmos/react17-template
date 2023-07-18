import { makeAutoObservable } from 'mobx';
class ConfigStore {
  constructor() {
    // 这里是实现响应式的关键
    makeAutoObservable(this);
  }
}
export { ConfigStore };
export default new ConfigStore();
