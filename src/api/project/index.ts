//*************************
//  系统管理
//*************************
import Ajax from '~@/utils/ajax';
import {
  projectsByPageSchema,
  createProjectSchema,
  updateProjectSchema,
  safeRequirementsSchema,
  projectFileUploadSchema,
  deleteProjectFileSchema,
  projectFilesSchema,
  projectConfirmSchema,
  fileTypesSchema,
  projectCancelSchema,
  projectInfoSchema,
  latestProjectsSchema,
  deleteProjectSchema,
  deleteProjectFilesSchema,
  projectUploadConfirmSchema,
  projectParserSchema,
  resetProjectStatusSchema,
  downloadReportSchema
} from '~@/schemas';
import { IProject } from '~@/interface';
class Project {
  projectList(params: IProject) {
    const variables = {};
    return Ajax.query(projectsByPageSchema(params), variables);
  }
  createProject(params: IProject) {
    const variables = {};
    return Ajax.query(createProjectSchema(params), variables);
  }
  updateProject(params: any) {
    const variables = {};
    return Ajax.query(updateProjectSchema(params), variables);
  }
  getSafeRequirements() {
    const variables = {};
    return Ajax.query(safeRequirementsSchema(), variables);
  }
  getLatestProjects(params: any) {
    const variables = {};
    return Ajax.query(latestProjectsSchema(params), variables);
  }
  projectFileUpload(params: any) {
    const variables = { files: params.files, multiple: params.multiple };
    return Ajax.gqlFormData(projectFileUploadSchema(params), variables);
  }
  deleteProjectFile(params: any) {
    const variables = {};
    return Ajax.query(deleteProjectFileSchema(params), variables);
  }
  projectFiles(params: any) {
    const variables = {};
    return Ajax.query(projectFilesSchema(params), variables);
  }
  projectConfirm(params: any) {
    const variables = {};
    return Ajax.query(projectConfirmSchema(params), variables);
  }
  fileTypes() {
    const variables = {};
    return Ajax.query(fileTypesSchema(), variables);
  }
  projectCancel(params: any) {
    const variables = {};
    return Ajax.query(projectCancelSchema(params), variables);
  }
  projectInfo(params: any) {
    return Ajax.query(projectInfoSchema(params), {});
  }
  deleteProject(params: any) {
    return Ajax.query(deleteProjectSchema(params), {});
  }
  deleteProjectFiles(params: any) {
    return Ajax.query(deleteProjectFilesSchema(params), {});
  }
  projectUploadConfirm(params: any) {
    const variables = { files: params.files, multiple: params.multiple };
    const fileParams: any = [];
    params.files.map(() => {
      fileParams.push({
        file: null
      });
    });
    params.reqs = JSON.stringify(fileParams);
    return Ajax.gqlFormData(projectUploadConfirmSchema(params), variables);
  }
  projectParser(params: any) {
    return Ajax.query(projectParserSchema(params), {});
  }
  resetProjectStatus(params: any) {
    return Ajax.query(resetProjectStatusSchema(params), {});
  }
  downloadReport(params: any) {
    return Ajax.query(downloadReportSchema(params), {});
  }
}
const instance = new Project();
export { Project };
export default instance;
