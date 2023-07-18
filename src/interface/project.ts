import { IPage } from './filter';
export interface IProject extends IPage {
  //IPage: IPage;  
  id?: string,
  name?: string,
  description: string,
  keyword?: string;
}
export interface RequirementInfoParams{
  projectId: number,
  status?: Array<string | number>
}
export interface FunctionsParams{
  projectId: string
}
export interface DemandVersionsByPageParams{
  demandId: number,
  pageIndex: number, 
  pageSize: number
  keyword: string, 
  status: Array<number>
}
export interface DemandVersionsInterface{
  edge: any,
  total: number
}
