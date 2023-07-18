//*************************
//  许可证管理
//*************************
import Ajax from '~@/utils/ajax';
import {
  licenseInfoSchemas,
  machineInfoSchemas,
  licenseUploadSchemas
} from '~@/schemas/licenseManagementSchemas';
class LicenseManagement {
  licenseInfo() {
    const variables = {};
    return Ajax.query(licenseInfoSchemas(), variables);
  }
  machineInfo() {
    const variables = {};
    return Ajax.query(machineInfoSchemas(), variables);
  }
  licenseUpload(files: any, multiple: boolean) {
    const variables = { files, multiple };
    return Ajax.gqlFormData(licenseUploadSchemas(), variables);
  }
}
const instance = new LicenseManagement();
export { LicenseManagement };
export default instance;
