/**
 * login
 */
export const LOGIN = {
  USERNAME: 'username',
  PASSWORD: 'password',
  SESSIONID: 'SESSIONID',
  TOKEN: 'ilock-token', // token
  LANG: 'ilock-lang' // language
};

export const ROLES = {
  // 测试人员
  TESTER: 0,
  // 管理员
  ADMIN: 1
};
export const CMD = {
  // 关闭连接
  CLOSE: 'close',
  // 存在新连接，关闭旧连接
  CLOSEBYNEW: 'closeByNew',
  // 超时关闭
  CLOSEBYTIMEOUT: 'closeByTimeout',
  // ping消息
  PING: 'ping',
  // pong消息
  PONG: 'pong',
  // 接收连接
  ACCEPT: 'accept',
  // 拒绝
  REFUSE: 'refuse',
  // 查询
  QUERY: 'query',
  // 错误
  ERROR: 'error'
};

export const LICENSE = {
  //无许可证
  EFFECTIVE: 1,
  INVALID: -1,
  NO_LICENSE: 0,
  DUE_DATE: -2,
  OVERUSERLIMIT: -3
};

export const DOWNLOAD_FILE = {
  PROJECT_ORIGIN_FILE: '1',
  PROJECT_MIDDLE_FILE: '2',
  LSPEC_FILE: '3',
  NATURE_FILE: '4'
};

export const STRATEGY = {
  FORWARD: 1,
  BACKWARD: 2
};

export const PARSE_RESULT = {
  NO_PARSE: 0, //待验证
  FAIL: -1, //解析失败
  DUPLICATE_CODE: -2, //有重复的code
  SUCCESS: 1, //解析成功
  NO_SURE: 2 //有自然语言，没有lspec
};

export const FILE_TYPE = {
  LSPEC: 1,
  NATURE: 2,
  PISPEC: 3
};

export const HISTORY = {
  CREATE: 1,
  UPDATE: 2,
  UPLOAD_FILE: 3,
  UPLOAD_POLICY: 4,
  UPDATE_VERSION: 5
};
export const VERIFY_PROJECT_MENU = {
  NATURELIST: 'natureList',
  FUNCTIONLIST: 'functionList',
  EQUIPMENTTYPES: 'equipmentTypes', //以设备分类
  FUNCTIONGROUPS: 'functionGroups' //以函数名分类
};
export const DEMANDVersion_STATUS = {
  DOC_FAIL: -4, //读取Doc失败
  LSPEC_FAIL: -3, //读取lspec失败
  ALL_FAIL: -2, //读取Doc、lspec失败
  ANALYZE_FAIL: -1, //解析失败
  ANALYZE_WAIT: 0, //带解析
  ANALYZE_SUCCESS: 1, //解析成功
  RELATED: 2 //被关联
};
export const NATURE_STATUS = {
  DEFAULT: 100, //自定义的选择全部的时候用
  NO_VERIFY: 0, //待验证
  PASS: 1, //通过
  NO_PASS: -1, //未通过
  NO_SURE: -2, //未确定
  ALL_TRUE: 3, //恒真
  ALL_FALSE: 4 //恒假
};
export const PARSE_STATUS = {
  INSTANTIATIONED: -1, //已实例化
  NO_RESULT: 2, //无实例化（无结果）
  ALL_TRUE: 3, //恒真
  ALL_FALSE: 4, //恒假
  NO_INSTANTIATION: 5, //未实例化
  UPDATED: 6 //更新以后未实例化
};
export const DEMAND_STATUS = {
  DEFAULT: 100, //自定义的选择全部的时候用
  PARSE_SUCCESS: 1,
  NO_PARSE: 0,
  PARSE_FAIL: -1,
  DUPLICATE_CODE: -2 //有重复的code
};
export const FILES_TYPE = {
  LSPEC: 1, //为Lspec
  PISPEC: 3, //位PiSpec
  NATURE: 2//为自然语言docx文件
};
export const FILES_STATUS = {
  SUCCESS: 1, //成功
  FAIL: 0 //读取失败
};
export const VARIABLE_MENU = {
  CURRENT: 'variableCurrent',
  FOLLOW: 'variableFollowed'
};
export const INPROGRESS_TYPE = {
  INSTANTIATION: 1, //实例化
  VERIFY: 2 //验证
};
export const VALIDATION_STATUS = {
  FAIL: -2, // 验证失败
  SUCCESS: 2, // 验证通过
  NOSURE: -3, //验证不确定
  DOING: 1, // 验证中
  SUSPEND: -4 //验证暂停
};
export const PROJECT_STATUS = {
  VALIDATE_LOCKED: -3, //锁定（验证中）
  PARSER_LOCKED: -2,	//	锁定（实例化中）
  UNINITAIALIZED: 0, //	未实例化
  INITIALIZED: 1, //	已实例化
  DIRTY: 100, //	需要重新实例化
  DIRTY_DEMAND_VERSION_UPDATED: 102, //	所关联的基线版本被update
  DEMAND_VERSION_DELETED: 103, //	所关联的基线版本被删除
  DIRTY_DEMAND_VERSION_FAILED: 105, //	所关联的基线版本被update且解析失败
  SOME_DEMAND_VERSION_DELETED: 106 //所关联的基线版本部分被删除
};
export const editSettingType = {
  demand: 1, //需求基线名称
  demandVersion: 2, //版本号
  verifyModal: 3, //验证模型
  verifyPolicy: 4, //策略配置
  outTime: 5//单个设备验证超时时间
};
export const VERIFY_RESULT_STATUS = {
  PASS_OR_ALLTRUE: 1, //(通过或恒真）
  FAIL_OR_ALLFALSE: -1, //(未通过或恒假)
  NO_SURE: -2//(未确定)
};
