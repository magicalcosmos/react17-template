import { makeAutoObservable } from 'mobx';
class ExpressHistoryStore {
  currentIndex = -1;
  currentExpressId = '';
  expressQueue: string[] = [];
  singalValiableQueue: [] = [];
  constructor() {
    makeAutoObservable(this);
  }
  setCurrentIndex(index: number) {
    this.currentIndex = index;
  }
  setCurrentExpressId(currentExpressId: string) {
    this.currentExpressId = currentExpressId;
  }
  setExpressQueue(expressQueue: string[]) {
    this.expressQueue = expressQueue;
  }
  setSingalValiableQueue(singalValiableQueue: []) {
    this.singalValiableQueue = singalValiableQueue;
  }
}
export { ExpressHistoryStore };
export default new ExpressHistoryStore();
