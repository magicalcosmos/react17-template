import i18n from '~@/i18n';
//错误码
const errorCode = {
  /* http */
  schemaFail: 400, //服务端接收参数错误,
  serverFail: 500, //服务端错误,

  SUCCESS: 200, //返回成功

  /* 通用系统异常 */
  ExCode_Server_Err: 11000, //当前服务无法使用
  ExCode_Db_Err: 11001, //数据库服务出错
  ExCode_Redis_Err: 11002, //Redis服务出错
  ExCode_Mq_Err: 11003, //消息队列服务出错
  ExCode_SSO_Err: 11004, //SSO服务调用出错

  /* 通用业务错误 */
  //12xxx权限认证错误
  ExCode_Auth_NoLogin: 12000, //未登录授权
  ExCode_Auth_TokenOverdue: 12001, //Token已失效
  ExCodeTokenNotBeEmpty: 12002, // Token不能为空
  ExCode_Auth_NoPermission: 12003, //角色权限不允许
  //13xxx客户端请求参数错误
  ExCode_Param_NoParam: 13000, //参数缺失
  ExCode_Param_EmptyParam: 13001, //参数不能为空
  ExCode_Param_FaultParamFormat: 13002, //参数格式有误
  ExCode_Param_FaultParamType: 13003, //参数类型不正确
  ExCode_Param_FaultParamLength: 13004, //参数长度不正确
  ExCode_Param_FaultFileType: 13005, //文件类型不正确
  ExCode_Param_FaultFileSize: 13006, //文件大小不正确
  ExCode_Param_EmptyID: 13007, //ID不能为空
  ExCode_Param_EmptyName: 13008, //名称不能为空
  ExCode_Param_BadParam: 13009, //参数格式有误
  //14xxx服务端资源错误
  //ExCode_Record_NotExistsRecord: 14000, //指定记录不存在
  ExCode_Record_ExistsID: 14001, //ID记录已存在
  ExCode_Record_RepeatName: 14002, //名称重复
  //15xxx服务端业务处理错误
  ExCodeActionFail: 15000, //当前操作失败
  ExCode_Common_IdGenFailed: 15009, //ID生成失败
  ExCode_File_OpenFail: 15010, //文件打开失败
  ExCode_File_ReadFail: 15011, //文件读取失败
  ExCode_File_MoveFail: 15012, //文件移动失败
  ExCode_File_CopyFail: 15013, //文件复制失败
  ExCode_File_MakeDirFail: 15014, //创建目录失败
  ExCode_File_DeleteFail: 15015, //文件删除失败
  //WS业务处理错误
  ExCode_Online_Err: 24000, //在线状态异常
  ExCode_Online_UserConnByNew: 24001, //有信连接打开
  ExCode_License_UpdateSuccess: 21005, //许可证被更新，请重新登录
  ExCode_License_UserLimited: 21006, //已超出在线人数范围

  /* 安全基线 */
  ExCode_DemandRepeatName_Err: 28003, //需求基线名称重名
  ExCode_DemandNotFound_Err: 28005, //需求基线不存在
  ExCode_DemandNameNotEmpty_Err: 28007, //需求基线名称不能为空
  ExCode_DemandSameName_Err: 27011, //需求基线名称重名

  /* 安全基线版本 */
  ExCode_DemandVersionLspeckUpload_Err: 27001, //Lspeck语言文件上传错误
  ExCode_DemandVersionNatureUpload_Err: 27002, //自然语言文件上传错误
  ExCode_DemandVersionRepeatName_Err: 27003, //需求基线版本名称重名
  ExCode_DemandVersionLspeckRequired_Err: 27008, //Lspeck语言文件必传
  ExCode_DemandVersionInvalidFileType_Err: 27009, //文件类型不正确
  ExCode_DemandVersionPspeckUpload_Err: 27010, //Pspec语言文件上传错误
  ExCode_DemandVersionNotFound_Err: 27005, //需求基线版本不存在
  ExCode_DemandVersionNameNotEmpty_Err: 27007, //需求基线版本名称不能为空
  ExCode_DemandVersionNotAllowed_Err: 27006, //需求基线版本不允许删除



  /* 安全需求模块 */
  ExCode_DemandVersion_NotFoundSafeRequirement: 27602, //没有找到安全需求

  /* 性质模块 */
  ExCode_Project_FindFailed: 23001, //project不存在
  ExCode_ProjectParser_Locked: 23601, //项目解析锁定
  ExCodeProjectRequirementHasParser: 23615, //实例化IDS存在已经实例化需求

  /* 项目文件 */
  ExCode_Project_Locked: 23402, //项目被锁定
  ExCode_Project_FileUploadFailed: 23101, //上传项目文件失败
  ExCode_Project_FileTypeID_Err: 23102, //文件类型错误
  ExCode_Project_FileName_Err: 23103, //文件名错误

  /* 项目 */
  ProjectHasExist: 23102, //项目名称已经存在
  ProjectFindFailed: 23001, //项目不存在
  ProjectDeleteFailed: 23300, //删除项目错误
  ProjectConfirmFailed: 23400, //项目保存配置失败
  ExCode_Project_CancelFailed: 23401, //项目取消上传失败

  /* 用户模块 */
  UserRoleNoFound: 32002, //没找到合适记录
  UserHasExist: 32102, //用户已存在
  NoPermissionCreateUser: 32402, //用户没有权限创建用户
  ParamNotBeEmpty: 32405, //必填参数不能为空
  UserNameTooLong: 32404, //用户名过长
  NoPermission: 32401, //没有权限操作
  UserNoFound: 32001, //用户未找到
  UserPwdModifyFailed: 32202, //修改密码错误
  UserHasNoFound: 32005, //用户未找到
  UserModifyFailed: 32200, //修改用户信息失败
  UserDeleteFailed: 32300, //用户删除失败

  /* 许可证 */
  ExCode_License_UploadFailed: 21003, //	许可证上传失败
  ExCode_License_Err: 21000, // 许可证失效
  ExCode_License_Overdue: 21001, // 许可证已过期失效，请联系供应商获取新的许可证
  ExCode_License_OverUserLimit: 21002, // 系统监测到已有用户且超出了许可证的用户上限。
  //TokenNotEmpty: 32406, //token is empty
  //TokenOverDue: 32403, //token已失效

  /* 下载-基础 */
  ExCode_History_Err: 25000, //	查询历史记录异常
  ExCode_DownloadNotFound_Err: 26001, //	没有找到需要下载的数据

  /* 梯形图模块 */

  /* 验证项目模块 */
  ExCode_Project_ValidationFailed: 23500, //项目验证失败
  ExCode_Validation_LackOfDemandVersionAndFile: 23511, //未关联需求基线版本且缺少项目模型文件
  ExCode_Validation_LackOfDemandVersion: 23512, //未关联需求基线版本
  ExCode_Validation_LackOfFile: 23513, //缺少项目模型文件

  /* 需求基线版本主页 */
  ExCode_File_Exist: 15018, //文件已经存在
  ExCode_Project_ValidationLocked: 23501, //有项目正在验证中
  ExCode_File_Not_Exist: 15019 //文件不存在

};

//需要全局提示码
const needTipCode: Array<number> = [
  errorCode.schemaFail,
  errorCode.serverFail,
  /* 通用系统异常 */
  errorCode.ExCode_Server_Err,
  errorCode.ExCode_Db_Err,
  errorCode.ExCode_Redis_Err,
  errorCode.ExCode_Mq_Err,
  errorCode.ExCode_SSO_Err,

  /* 通用业务错误 */
  //12xxx权限认证错误
  errorCode.ExCode_Auth_NoLogin,
  errorCode.ExCode_Auth_TokenOverdue,
  //errorCode.ExCodeTokenNotBeEmpty,
  errorCode.ExCode_Auth_NoPermission,
  //13xxx客户端请求参数错误
  errorCode.ExCode_Param_NoParam,
  errorCode.ExCode_Param_EmptyParam,
  errorCode.ExCode_Param_FaultParamFormat,
  errorCode.ExCode_Param_FaultParamType,
  errorCode.ExCode_Param_FaultParamLength,
  errorCode.ExCode_Param_FaultFileType,
  errorCode.ExCode_Param_FaultFileSize,
  errorCode.ExCode_Param_EmptyID,
  errorCode.ExCode_Param_EmptyName,
  errorCode.ExCode_Param_BadParam,
  //14xxx服务端资源错误
  //errorCode.ExCode_Record_NotExistsRecord,
  errorCode.ExCode_Record_ExistsID,
  errorCode.ExCode_Record_RepeatName,
  //15xxx服务端业务处理错误
  errorCode.ExCodeActionFail,
  errorCode.ExCode_Common_IdGenFailed,
  errorCode.ExCode_File_OpenFail,
  errorCode.ExCode_File_ReadFail,
  errorCode.ExCode_File_MoveFail,
  errorCode.ExCode_File_CopyFail,
  errorCode.ExCode_File_MakeDirFail,
  errorCode.ExCode_File_DeleteFail,
  errorCode.ExCode_File_Exist
] as Array<number>;

//提示内容
type errorCodeType = typeof errorCode;
function createErrorTip(paramsErrorCode: errorCodeType) {
  let key: keyof errorCodeType;
  const errorCodeKeys: (keyof errorCodeType)[] = Object.keys(paramsErrorCode) as Array<keyof errorCodeType>;
  const errorTipObj: { [key: number]: string } = {};
  for (key of errorCodeKeys) {
    errorTipObj[paramsErrorCode[key]] = i18n.t('apiError.' + key);
  }
  return errorTipObj;
}
const errorTip = createErrorTip(errorCode);

export default {
  errorCode,
  needTipCode,
  errorTip
};
