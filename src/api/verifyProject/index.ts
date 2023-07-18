//*************************
// 验证项目
//*************************
import Ajax from '~@/utils/ajax';
import {
  stationUploadSchemas,
  stationInfoSchemas,
  requirementSchemas,
  trapezoidDiagramSchemas,
  variablesSchemas,
  updateVariablesSchema,
  markCodeSchema,
  variableFollowedListSchema,
  variableListSchema,
  variableFollowUpdateSchema,
  variableFollowAddSchema,
  variableFollowRemoveSchema,
  startInstantiationSchema,
  stopInstantiationSchema,
  startValidationSchema,
  stopValidationSchema,
  equipmentTypesSchema,
  functionsSchema,
  codesByPageSchemas,
  expressTreeByCodeSchemas
} from '~@/schemas';
import { ITrapezoidDiagramFilter, IVariablesFilter, IVariables, FunctionsParams, VariablesFollowParams, variableFollowAddUpdate, MarkCodeParams } from '~@/interface';
class VerifyProject {
  stationUpload(params: any) {
    const variables = { files: params.files, multiple: params.multiple };
    return Ajax.gqlFormData(stationUploadSchemas(params), variables);
  }
  stationInfo(params: any) {
    const variables = {};
    return Ajax.query(stationInfoSchemas(params), variables);
  }
  trapezoidDiagram(params: ITrapezoidDiagramFilter) {
    return Ajax.query(trapezoidDiagramSchemas(params));
  }
  variables(params: IVariablesFilter) {
    return Ajax.query(variablesSchemas(params));
  }
  updateVariables(params: IVariables) {
    return Ajax.query(updateVariablesSchema(params));
  }

  variableFollowedList(params: VariablesFollowParams) {
    return Ajax.query(variableFollowedListSchema(params));
  }
  markCode(params: MarkCodeParams) {
    return Ajax.query(markCodeSchema(params));
  }
  variableList(params: VariablesFollowParams) {
    return Ajax.query(variableListSchema(params));
  }
  variableFollowUpdate(params: variableFollowAddUpdate) {
    return Ajax.query(variableFollowUpdateSchema(params));
  }
  variableFollowAdd(params: variableFollowAddUpdate) {
    return Ajax.query(variableFollowAddSchema(params));
  }
  variableFollowRemove(params: variableFollowAddUpdate) {
    return Ajax.query(variableFollowRemoveSchema(params));
  }
  requirementInfo(params: any) {
    return Ajax.query(requirementSchemas(params), {});
  }
  startInstantiation(params: any) {
    return Ajax.query(startInstantiationSchema(params), {});
  }
  stopInstantiation(params: any) {
    return Ajax.query(stopInstantiationSchema(params), {});
  }
  startValidation(params: any) {
    return Ajax.query(startValidationSchema(params), {});
  }
  stopValidate(params: any) {
    return Ajax.query(stopValidationSchema(params), {});
  }
  //函数列表（按设备分组）
  equipmentTypes(params: FunctionsParams) {
    return Ajax.query(equipmentTypesSchema(params), {});
  }
  //函数列表
  functions(params: FunctionsParams) {
    return Ajax.query(functionsSchema(params), {});
  }
  //查找变量
  codesByPage(params: any) {
    return Ajax.query(codesByPageSchemas(params), {});
  }
  //查找单个变量
  expressTreeByCode(params: any) {
    return Ajax.query(expressTreeByCodeSchemas(params), {});
  }
}
const instance = new VerifyProject();
export { VerifyProject };
export default instance;
