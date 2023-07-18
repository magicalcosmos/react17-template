// no arguments, no return data
export declare type fEmptyVoid = () => void;
// no arguments
export declare type fEmptyReturn = () => any;
// no return data
export declare type fArgVoid = (...args: any[]) => void;
// both arguments and return data
export declare type fArgReturn = (...args: any[]) => any;

// set key value
export interface IKV {
  key: string;
  value: string;
}
// SSO config interface
export interface ISSO {
  CLIENT_ID: string;
  API: string;
  TOKEN_TYPE: string;
  RESPONSE_TYPE: string;
}
// environment config interface
export interface IEnvConfig {
  API_ENDPOINT: string;
  WS_ENDPOINT: string;
  ISSO;
}
// ajax request parameters
export interface IAjaxParams {
  url: string;
  params: any;
  callback?: fArgVoid;
}

export interface IId {
  id: string;
}

export * from './filter';
export * from './userManagement';
export * from './menu';
export * from './project';
export * from './verify';
export * from './verifyProject';
export * from './requirement';
export * from './station';
