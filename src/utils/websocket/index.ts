import Ajax from '~@/utils/ajax';
import Log from '~@/utils/log';
import LocalStorage from '~@/utils/localStorage';
import { CMD } from '~@/utils/dict';

class RWebSocket {
  // save all subscribed channel for subscribing channel after ws closed again
  private channelStore: any = {};
  // is connect again
  private isReconnect = true;
  private store: any;
  private timeout: number;
  private cmd: string;
  /**
   * connect to channel
   * @param params
   */
  connect(store?: any, params?: any) {
    this.store = store;
    Promise.all([LocalStorage.getTokenSync(), Ajax.getConfig()]).then(
      (result) => {
        const token = result[0];
        const config: any = result[1];
        if (token && config) {
          let ws: any;
          try {
            ws = new WebSocket(
              `${
                (params && params.url) || config.WS_ENDPOINT
              }?accessToken=${token}`
            );
          } catch (e: any) {
            Log.error('Websocket connection error: ', e); 
          }
          this.initWebSocketMethods(store, ws, params);
        }
      }
    );
  }
  /**
   * initialize websoket method
   * @param ws
   * @param params
   */
  initWebSocketMethods(store: any, ws: WebSocket, params: any) {
    ws.onopen =
      (params && params.onopen) ||
      (() => {
        Log.log('Websocket connection open...'); // eslint-disable-line
        // subscribe channel again
        for (const channel in this.channelStore) {
          channel && this.subscribe(this.channelStore[channel]);
        }
        // TODO: it's bad for this, remove future if backend acompanish
        this.health();
        params.callback && params.callback();
      });
    ws.onmessage =
      (params && params.onmessage) ||
      ((result: any) => {
        const data = JSON.parse(result.data);
        this.cmd = data.cmd;
        if (data.cmd && data.cmd.indexOf(CMD.CLOSE) !== -1 || (data.cmd === CMD.REFUSE)) {
          params.close && params.close(data);
        }
        // print message info
        Log.log(JSON.stringify(data, null, 2));
        this.store.setWebSocketData(data);
        
      });
    ws.onclose = (data: any) => {
      Log.log('Websocket connection closed'); // eslint-disable-line
      // print message info
      Log.log(JSON.stringify(data, null, 2));
      this.store.setWebSocketData(data);
      if (!this.cmd || (this.cmd.indexOf(CMD.CLOSEBYNEW) === -1 && this.cmd !== CMD.CLOSE && this.cmd !== CMD.REFUSE)) {
        this.isReconnect && this.connect(store, params);
      }
    };
    this.store.setWebSocket(ws);
  }
  stop() {
    // 停止
    this.isReconnect = false;
    this.store.setWebSocket(null);
  }
  start() {
    // 开始
    this.isReconnect = true;
    this.channelStore = {};
    this.connect();
  }
  /**
   * common send for subscribe and unsubscribe
   * @param cmd
   * @param valueObject
   */
  commonSend(cmd: string, valueObject = {}) {
    const ws: any = this.store.ws;
    const values = Object.assign(
      {
        cmd,
        msgType: 1,
        domain: 'user',
        data: ''
      },
      valueObject
    );
    try {
      ws && ws.send(JSON.stringify(values));
    } catch (e: any) {
      Log.error('Websocket send message failed, error: ', e);
    }
  }
  /**
   * subscribe channel
   * @param valueObject
   */
  subscribe(valueObject: any) {
    // 订阅频道
    const channel = JSON.stringify(valueObject);
    this.channelStore[channel] = valueObject;
    this.commonSend('subscribe', valueObject);
  }
  /**
   * cancel subscribe channel
   * @param valueObject
   */
  unsubscribe(valueObject: any) {
    // 取消订阅频道
    const channel = JSON.stringify(valueObject);
    this.channelStore[channel] && delete this.channelStore[channel];
    this.commonSend('unsubscribe', valueObject);
  }
  /**
   * for ping pong future(not recommand)
   */
  health() {
    if (!this.store.ws || this.store.ws.readyState !== 1) {
      return;
    }
    this.commonSend('ping', {});
    this.timeout = setTimeout(() => {
      this.timeout && clearTimeout(this.timeout);
      this.health();
    }, 5000);
  }
}
const instance = new RWebSocket();
export { RWebSocket };
export default instance;
