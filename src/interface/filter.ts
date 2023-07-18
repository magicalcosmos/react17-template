export interface IFilter {
  isOnline?: boolean;
  roleIds?: boolean;
  onlineOrNot?: any;
}
// page list
export interface IPage {
  pageIndex: number;
  pageSize: number;
  current?: number;
  sortKey?: string | Array<string>;
  isAsc?: boolean;
}
