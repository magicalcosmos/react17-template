//*************************
//  系统管理
//*************************
import Ajax from '~@/utils/ajax';
import { FAQSchema } from '~@/schemas/helpSchemas';
class SystemManagement {
  getFAQ(params: any) {
    return Ajax.query(params, FAQSchema);
  }
}
const instance = new SystemManagement();
export { SystemManagement };
export default instance;
