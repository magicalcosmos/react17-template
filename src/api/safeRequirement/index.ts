//*************************
//  安全需求
//*************************
import Ajax from '~@/utils/ajax';
import { FAQSchema } from '~@/schemas/helpSchemas';
class SafeRequirement {
  getFAQ(params: any) {
    return Ajax.query(params, FAQSchema);
  }
}
const instance = new SafeRequirement();
export { SafeRequirement };
export default instance;
