import { makeAutoObservable, toJS } from 'mobx';
class WebSocketStore {
  // 这里必须给定一个初始化的值，否则响应式数据不生效
  ws = '';
  data = '';
  onlineTotal = '';
  onlineUser = '';
  success = '';
  projectParser = '';
  projectValidation = '';
  constructor() {
    // 这里是实现响应式的关键
    makeAutoObservable(this);
  }
  setWebSocket(ws: WebSocket) {
    this.ws = ws;
  }
  setWebSocketData(data: any) {
    const tempData = toJS(this.data);
    if (!this.data) {
      this.data = data;
    } else if (JSON.stringify(tempData) !== JSON.stringify(data)) {
      this.data = data;
    }
    if (this[data.subCode] !== undefined) {
      this[data.subCode] = data.data;
    }
  }
}
export { WebSocketStore };
export default new WebSocketStore();
