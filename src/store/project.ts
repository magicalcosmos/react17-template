import { makeAutoObservable } from 'mobx';
//import internal from 'stream';
import { VERIFY_PROJECT_MENU } from '~@/utils/dict';
class ProjectStore {
  // 这里必须给定一个初始化的值，否则响应式数据不生效
  // 项目信息
  projectInfo: any = {};
  projectFiles = [];
  //当前树所在的tab
  currentTab = VERIFY_PROJECT_MENU.NATURELIST;
  //性质树是否有数据
  isHasNatureTree = true;
  //函数树是否有数据
  isHasFunctionTree = true;
  cycleNumber = 0;
  //点击当前树的验证状态
  onSelectTreeStatus = 0;
  //未验证的梯形图图片
  trapezoidPng = '';
  //未标记的战场图图片
  stationPng = '';
  /* //梯形图缩放后的宽度
  scaleWidth = 100; */
  constructor() {
    // 这里是实现响应式的关键
    makeAutoObservable(this);
  }
  setProjectInfo(projectInfo: any) {
    this.projectInfo = projectInfo;
  }
  setProjectFiles(projectFiles: any) {
    this.projectFiles = projectFiles;
  }
  setCurrentTab(tabKey: string) {
    this.currentTab = tabKey;
  }
  setIsHasNatureTree(isHas: boolean) {
    this.isHasNatureTree = isHas;
  }
  setIsHasFunctionTree(isHas: boolean) {
    this.isHasFunctionTree = isHas;
  }
  setCycleNumber(cycleNumber: number) {
    this.cycleNumber = cycleNumber;
  }
  setOnSelectTreeStatus(status: number) {
    this.onSelectTreeStatus = status;
  }
  setTrapezoidPng(trapezoidPng: string) {
    this.trapezoidPng = trapezoidPng;
  }
  setStationPng(stationPng: string) {
    this.stationPng = stationPng;
  }
  /* setScaleWidth(scaleWidth: number) {
    this.scaleWidth = scaleWidth;
  } */
}
export { ProjectStore };
export default new ProjectStore();
