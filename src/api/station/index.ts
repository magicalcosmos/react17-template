//*************************
//  站场图
//*************************
import Ajax from '~@/utils/ajax';
import { BuildAccessParam } from '~@/interface';
import {
  StationTreesSchema,
  ProjectDeviceStatusSchema,
  BuildAccessSchema,
  SearchEquipmentByStationSchema
} from '~@/schemas/stationSchemas';
class Station {
  stationTrees(params: any) {
    return Ajax.query(StationTreesSchema(params), {});
  }
  projectDeviceStatus(params: any) {
    return Ajax.query(ProjectDeviceStatusSchema(params), {});
  }
  BuildAccess(params:BuildAccessParam) {
    return Ajax.query(BuildAccessSchema(params), {});
  }
  searchEquipmentByStation(params: any) {
    return Ajax.query(SearchEquipmentByStationSchema(params), {});
  }
}
const instance = new Station();
export { Station };
export default instance;
