
import { PROJECT_API } from '~@/api';
import Common from '~@/utils/common';
import { VERIFY_RESULT_STATUS, NATURE_STATUS } from '~@/utils/dict';
import i18n from '~@/i18n';
import docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';
import ImageModule from 'docxtemplater-image-module-free';
import PieEchart from './pieEchart';

class DownLoadReport {
 public DataUrl = [];
 exportWord(projectId:any, projectFile:any) {
   
   this.getDownloadReport(projectId).then((resData:any) => {
     // 设置模板变量的值,这个就是模板里所插入的内容数据，根据需要写成动态就好了。
     const data = resData.downloadReport;
     const verifyResultSummary = data.verifyResultSummary;
     let passOrAlltrueRequirementNum = 0, passOrAlltrueRequirementRate = '', passOrAlltrueSubRequirementNum = 0, passOrAlltrueSubRequirementRate = '';
     let failedOrAllfalseRequirementNum = 0, failedOrAllfalseRequirementRate = '', failedOrAllfalseSubRequirementNum = 0, failedOrAllfalseSubRequirementRate = '';
     let noSureRequirementNum = 0, noSureRequirementRate = '', noSureSubRequirementNum = 0, noSureSubRequirementRate = '';
     let requirementTotal = 0, subRequirementTotal = 0;
     verifyResultSummary.forEach((item:any) => {
       if (item.status === VERIFY_RESULT_STATUS.PASS_OR_ALLTRUE) {
         passOrAlltrueRequirementNum = item.requirementNum || 0;
         passOrAlltrueRequirementRate = this.toRate(item.requirementRate);
         passOrAlltrueSubRequirementNum = item.subRequirementNum || 0;
         passOrAlltrueSubRequirementRate = this.toRate(item.subRequirementRate);
       }
       if (item.status === VERIFY_RESULT_STATUS.FAIL_OR_ALLFALSE) {
         failedOrAllfalseRequirementNum = item.requirementNum || 0;
         failedOrAllfalseRequirementRate = this.toRate(item.requirementRate);
         failedOrAllfalseSubRequirementNum = item.subRequirementNum || 0;
         failedOrAllfalseSubRequirementRate = this.toRate(item.subRequirementRate);
       }
       if (item.status === VERIFY_RESULT_STATUS.NO_SURE) {
         noSureRequirementNum = item.requirementNum || 0;
         noSureRequirementRate = this.toRate(item.requirementRate);
         noSureSubRequirementNum = item.subRequirementNum || 0;
         noSureSubRequirementRate = this.toRate(item.subRequirementRate);
       }
       requirementTotal += item.requirementNum;
       subRequirementTotal += item.subRequirementNum;
     });

     //echart
     //安全需求验证结果统计
     const params1 = {
       titleText: i18n.t('downloadReport.titleText1'),
       data: [{ value: passOrAlltrueRequirementNum, name: i18n.t('downloadReport.legendText1') }, { value: failedOrAllfalseRequirementNum, name: i18n.t('downloadReport.legendText2') }, { value: noSureRequirementNum, name: i18n.t('downloadReport.legendText3') }]
     };
     PieEchart.initFun(params1);
     const img1 = PieEchart.pieChartUrl();
     this.DataUrl.push({ src: img1 });
     //实例验证结果统计
     const params2 = {
       titleText: i18n.t('downloadReport.titleText2'),
       data: [{ value: passOrAlltrueSubRequirementNum, name: i18n.t('downloadReport.legendText1') }, { value: failedOrAllfalseSubRequirementNum, name: i18n.t('downloadReport.legendText2') }, { value: noSureSubRequirementNum, name: i18n.t('downloadReport.legendText3') }]
     };
     PieEchart.initFun(params2);
     const img2 = PieEchart.pieChartUrl();
     this.DataUrl.push({ src: img2 });

     const fileNamesArray:Array<string> = [];
     projectFile?.map((fileItem) => {
       fileNamesArray.push(fileItem.name);
     });

  
     const newVerifyResultDetail = data.verifyResultDetail?.map((item:any) => {
       let statusName = '';
       switch (item.status) {
         case NATURE_STATUS.NO_VERIFY:
           statusName = i18n.t('verify_project.waitVerify');
           break;
         case NATURE_STATUS.PASS:
           statusName = i18n.t('verify_project.pass');
           break;
         case NATURE_STATUS.NO_PASS:
           statusName = i18n.t('verify_project.noPass');
           break;
         case NATURE_STATUS.NO_SURE:
           statusName = i18n.t('verify_project.noSure');
           break;
         case NATURE_STATUS.ALL_TRUE:
           statusName = i18n.t('verify_project.allTrue');
           break;
         case NATURE_STATUS.ALL_FALSE:
           statusName = i18n.t('verify_project.allFalse');
           break;
       }
       return { ...item,
         statusName,
         passDeviceBlock: item.passDevice && item.passDevice.length > 0 
           ? `${i18n.t('verify_project.pass')}，${i18n.t('downloadReport.count')}：${item.passDevice.length}\n${item.passDevice.join(',')}\n` 
           : '',
         foreverTrueDeviceBlock: item.foreverTrueDevice && item.foreverTrueDevice.length > 0 
           ? `${i18n.t('verify_project.allTrue')}，${i18n.t('downloadReport.count')}：${item.foreverTrueDevice.length}\n${item.foreverTrueDevice.join(',')}\n` 
           : '',
         failDeviceBlock: item.failDevice && item.failDevice.length > 0 
           ? `${i18n.t('verify_project.noPass')}，${i18n.t('downloadReport.count')}：${item.failDevice.length}\n${item.failDevice.join(',')}\n` 
           : '',
         foreverFalseDeviceBlock: item.foreverFalseDevice && item.foreverFalseDevice.length > 0 
           ? `${i18n.t('verify_project.allFalse')}，${i18n.t('downloadReport.count')}：${item.foreverFalseDevice.length}\n${item.foreverFalseDevice.join(',')}\n` 
           : '',
         noSureDeviceBlock: item.noSureDevice && item.noSureDevice.length > 0 
           ? `${i18n.t('verify_project.noSure')}，${i18n.t('downloadReport.count')}：${item.noSureDevice.length}\n${item.noSureDevice.join(',')}\n` 
           : ''
       };
     });

     const wordData = {
       demandName: data.demandName,
       demandVersion: data.demandVersion,
       projectName: data.projectName,
       fileNames: fileNamesArray.join('\n'),
       stationName: data.stationName,
       stationNo: data.stationNo,
       time: Common.formatDateTime(data.time, 'yyyy/mm/dd hh:mm:ss'),
       passOrAlltrueRequirementNum, 
       passOrAlltrueRequirementRate, 
       passOrAlltrueSubRequirementNum, 
       passOrAlltrueSubRequirementRate,
       failedOrAllfalseRequirementNum, 
       failedOrAllfalseRequirementRate, 
       failedOrAllfalseSubRequirementNum, 
       failedOrAllfalseSubRequirementRate,
       noSureRequirementNum,
       noSureRequirementRate, 
       noSureSubRequirementNum, 
       noSureSubRequirementRate,
       requirementTotal, 
       subRequirementTotal,
       newVerifyResultDetail: newVerifyResultDetail,
       src1: this.DataUrl[0].src,
       src2: this.DataUrl[1].src
     };
     // 读取并获得模板文件的二进制内容，是docxtemplater提供的固定写法
     JSZipUtils.getBinaryContent('/iVerify.docx', (error, content) => {
       // exportTemplate.docx是模板，React写在public里。我们在导出的时候，会根据此模板来导出对应的数据
       //图片导出功能
        
       const opts = {
         centered: false,
         fileType: 'docx',
         getImage: (chartId) => {
           return this.base64DataURLToArrayBuffer(chartId);
         },
         getSize: () => {
           return [250, 300];
         }
       };
       const imageModule = new ImageModule(opts);
       
       // 抛出异常
       if (error) {
         throw error;
       }
       // 创建一个PizZip实例，内容为模板的内容
       const zip = new PizZip(content);
       // 创建并加载docxtemplater实例对象
       const doc = new docxtemplater()
         .attachModule(imageModule) //图片导出功能
         .setOptions({
           linebreaks: true
         });
       doc.loadZip(zip)
         .compile();
   
       // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
       doc.resolveData(wordData).then(function() {
         doc.render();
         const out = doc.getZip().generate({
           type: 'blob',
           mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
         });
         // 将目标文件对象保存为目标类型的文件，并命名（起一个自己需要的名字就好了）
         saveAs(out, `${i18n.t('downloadReport.wordNamePre')}${data.projectName}.docx`);
       });
     });
  
   });
   
 }
 toRate(c:string) {
   return c !== 'NaN' ? (Number(c) * 100).toFixed(2) + '%' : '0%';
 }
 base64DataURLToArrayBuffer(dataURL) {
   const base64Regex = /^data:image\/(png|jpg|svg|jpeg|svg\+xml);base64,/;
   if (!base64Regex.test(dataURL)) {
     return false;
   }
   const stringBase64 = dataURL.replace(base64Regex, '');
   let binaryString;
   if (typeof window !== 'undefined') {
     binaryString = window.atob(stringBase64);
   } else {
     binaryString = new Buffer(stringBase64, 'base64').toString('binary');
   }
   const len = binaryString.length;
   const bytes = new Uint8Array(len);
   for (let i = 0; i < len; i++) {
     const ascii = binaryString.charCodeAt(i);
     bytes[i] = ascii;
   }
   return bytes.buffer;
 }

 getDownloadReport(projectId:any) {
   return PROJECT_API.downloadReport({ projectId });
 }
      

}
const instance = new DownLoadReport();
export { DownLoadReport };

export default instance;
