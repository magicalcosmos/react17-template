import { makeAutoObservable } from 'mobx';

class CommonStore {
  // 这里必须给定一个初始化的值，否则响应式数据不生效
  title = '';
  theme = 'default';

  constructor() {
    // 这里是实现响应式的关键
    makeAutoObservable(this);
  }

  setTheme(theme: string) {
    this.theme = theme;
  }

  setTitle(title: string) {
    this.title = title;
  }
}
export { CommonStore };
export default new CommonStore();
