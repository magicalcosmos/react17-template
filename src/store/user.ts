import { makeAutoObservable } from 'mobx';
import { IUser } from '~@/interface';
class UserStore {
  // 这里必须给定一个初始化的只，否则响应式数据不生效
  user = {};
  constructor() {
    // 这里是实现响应式的关键
    makeAutoObservable(this);
  }
  setUser(user: IUser) {
    Object.assign(this.user, user);
  }
}
export { UserStore };
export default new UserStore();
