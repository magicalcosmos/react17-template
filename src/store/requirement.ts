import { makeAutoObservable } from 'mobx';
class RequiremntStore {
  // 这里必须给定一个初始化的值，否则响应式数据不生效
  requirementInfo = {};
  // 这里必须给定一个初始化的值，否则响应式数据不生效
  requirementVersionInfo = {};

  // 最近需求基线版本列表
  latestRequirementBaseList = [''];
  // 是否点击更改导入文件提交按钮
  isSubmitUpdateFile = false;
  originLSpec = '';
  selectFile: any = {};
  selectErrorLine = -1;
  selectSameFileErrorLine = -1;
  //选中的单个需求基线
  selectRequirementNode: any = {}; 
  //选中的单个需求基线的行数
  selectLine = -1;
  constructor() {
    // 这里是实现响应式的关键
    makeAutoObservable(this);
  }

  setRequirementInfo(requirementInfo: any) {
    this.requirementInfo = requirementInfo;
  }
  setRequirementVersionInfo(requirementVersionInfo: any) {
    this.requirementVersionInfo = requirementVersionInfo;
  }
  setLatestRequirementBaseList(latestRequirementBaseList: Array<any>) {
    this.latestRequirementBaseList = latestRequirementBaseList;
  }

  setIsSubmitUpdateFile(isSubmitUpdateFile: boolean) {
    this.isSubmitUpdateFile = isSubmitUpdateFile;
  }

  setOriginLSpec(originLSpec: string) {
    this.originLSpec = originLSpec;
  }

  setSelectFile(selectFile: any) {
    this.selectFile = selectFile;
  }
  setSelectErrorLine(selectErrorLine: number) {
    this.selectErrorLine = selectErrorLine;
  }
  setSelectLine(selectLine: number) {
    this.selectLine = selectLine;
  }
  setSelectSameFileErrorLine(selectSameFileErrorLine: number) {
    this.selectSameFileErrorLine = selectSameFileErrorLine;
  }
  setSelectRequirementNode(selectRequirementNode: any) {
    this.selectRequirementNode = selectRequirementNode;
  }
}
export { RequiremntStore };
export default new RequiremntStore();
