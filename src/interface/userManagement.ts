import { IPage } from './filter';
export interface IUserFilter {
  onlineOrNot?: number;
  roleId?: Array<string | number>;
  keyword?: string;
  roleIds: Array<string | number>;
}
export interface IUserPage extends IPage, IUserFilter {
  //IPage;
  //IUserFilter;
}

export interface IUser {
  id?: string;
  name?: string;
  username: string;
  password?: string | number;
  nick?: string;
  roleId: Array<string | number>;
  createAt?: string;
  deletedAt?: string;
  modifyAt?: string;
  roleIds: Array<string | number>;
}
export interface IPassword {
  password: string;
  newPassword: string;
}
