import { makeAutoObservable } from 'mobx';
class TrapezoidDiagramStore {
  // 这里必须给定一个初始化的只，否则响应式数据不生效
  nodesInfo = [];
  linesInfo = [];
  isSearchEnter=false
  constructor() {
    // 这里是实现响应式的关键
    makeAutoObservable(this);
  }
  setNodeInfo(nodesInfo: any) {
    this.nodesInfo = nodesInfo;
  }
  setLinesInfo(linesInfo: any) {
    this.linesInfo = linesInfo;
  }
  setIsSearchEnter(isSearchEnter:boolean) {
    this.isSearchEnter = isSearchEnter;
  }
}
export { TrapezoidDiagramStore };
export default new TrapezoidDiagramStore();
