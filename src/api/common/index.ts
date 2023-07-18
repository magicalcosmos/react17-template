//*************************
//  公共
//*************************
import Ajax from '~@/utils/ajax';
import { buildDownloadFileSchema, historiesByPageSchema, clearHistoryRecordSchema } from '~@/schemas';
class Common {
  buildDownloadFile(params: any) {
    return Ajax.query(buildDownloadFileSchema(params), {});
  }

  historiesByPage(params: any) {
    return Ajax.query(historiesByPageSchema(params), {});
  }

  clearHistoryRecord(params: any) {
    return Ajax.query(clearHistoryRecordSchema(params), {});
  }
}
const instance = new Common();
export { Common };
export default instance;
