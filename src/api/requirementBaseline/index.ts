//*************************
//  需求基线版本
//*************************
import Ajax from '~@/utils/ajax';
import { DemandVersionsByPageParams } from '~@/interface';
import {
  demandsByPageSchema,
  UpdateDemandSchema,
  demandInfoSchema,
  createDemandVersionSchema,
  demandVersionsByPageSchema,
  demandVersionInfoSchema,
  deleteDemandVersionSchema,
  UploadDemandVersionFileSchema,
  updateDemandVersionSchema,
  safeRequirementContentSchema,
  demandVersionSafeRequirementsSchema,
  SafeRequirementParserSchema,
  CreateDemandVersionFileSchema,
  UpdateDemandVersionFileSchema,
  DeleteDemandVersionFileSchema,
  DemandVersionRequirementsSchema,
  DemandVersionFileDetailSchema,
  deleteDemandSchema,
  DemandVersionStatusSchema
} from '~@/schemas';
class RequirementBaseline {
  createDemandVersion(params: any) {
    const variables = { files: params.files, multiple: params.multiple };
    const fileParams: any = [];
    params.files.map((item: any) => {
      fileParams.push({
        file: null,
        fileTypeId: item?.fileTypeId
      });
    });
    params.reqs = JSON.stringify(fileParams);
    return Ajax.gqlFormData(createDemandVersionSchema(params), variables);
  }
  //基线分页列表
  requirementBaseList(params: any) {
    const variables = {};
    return Ajax.query(demandsByPageSchema(params), variables);
  }
  //编辑基线
  UpdateDemand(params: any) {
    const variables = {};
    return Ajax.query(UpdateDemandSchema(params), variables);
  }
  //安全基线版本分页列表
  requirementBaseVersionList(params: DemandVersionsByPageParams) {
    const variables = {};
    return Ajax.query(demandVersionsByPageSchema(params), variables);
  }
  //基线详情
  demandInfo(params: any) {
    const variables = {};
    return Ajax.query(demandInfoSchema(params), variables);
  }

  deleteDemand(params: any) {
    return Ajax.query(deleteDemandSchema(params), {});
  }

  deleteDemandVersion(params: any) {
    return Ajax.query(deleteDemandVersionSchema(params), {});
  }
  demandVersionInfo(params: any) {
    return Ajax.query(demandVersionInfoSchema(params), {});
  }
  updateDemandVersion(params: any) {
    return Ajax.query(updateDemandVersionSchema(params), {});
  }
  uploadDemandVersionFile(params: any) {
    const variables = { files: params.files, multiple: params.multiple };
    const fileParams: any = [];
    params.files.map((item: any) => {
      fileParams.push({
        file: null,
        fileTypeId: item.fileTypeId
      });
    });
    params.reqs = JSON.stringify(fileParams);
    return Ajax.gqlFormData(UploadDemandVersionFileSchema(params), variables);
  }
  safeRequirementContent(params: any) {
    return Ajax.query(safeRequirementContentSchema(params), {});
  }
  demandVersionSafeRequirements(params: any) {
    return Ajax.query(demandVersionSafeRequirementsSchema(params), {});
  }
  safeRequirementParser(params: any) {
    return Ajax.query(SafeRequirementParserSchema(params), {});
  }
  createDemandVersionFile(params: any) {
    return Ajax.query(CreateDemandVersionFileSchema(params), {});
  }
  updateDemandVersionFile(params: any) {
    return Ajax.query(UpdateDemandVersionFileSchema(params), {});
  }
  deleteDemandVersionFile(params: any) {
    return Ajax.query(DeleteDemandVersionFileSchema(params), {});
  }
  demandVersionRequirements(params: any) {
    return Ajax.query(DemandVersionRequirementsSchema(params), {});
  }
  demandVersionFileDetail(params: any) {
    return Ajax.query(DemandVersionFileDetailSchema(params), {});
  }
  demandVersionStatus(params: any) {
    return Ajax.query(DemandVersionStatusSchema(params), {});
  }
}
const instance = new RequirementBaseline();
export { RequirementBaseline };
export default instance;
