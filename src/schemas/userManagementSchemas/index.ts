import { IUserPage, IUser, IId, IPassword } from '~@/interface';
import commonUtils from '~@/utils/common';
/**
 * 分页获取 用户列表
 * @param params
 */
const usersByPageSchema = (params: IUserPage) => {
  commonUtils.replaceSpecialCharacters(params);
  const schema = `query usersByPage {
  usersByPage(paging:{pageIndex: ${params.pageIndex || 0}, pageSize: ${params.pageSize || 10}, sortKey: "${params.sortKey || 'username'}", isAsc: ${params.isAsc}},filter: {onlineOrNot:${params.onlineOrNot}, roleIds: [${params.roleIds || [0, 1]}], keyword:"${params.keyword || ''}"}) {

    edge{
        id
        name
        username
        roleIds
        createAt
        modifyAt
        deletedAt
        isOnline
        }
      total
      onlineTotal
      totalWithFilter
      roleCounts{
         roleId
         total
      }
    }
  }`;
  return schema;
};
const userSelfSchema = () => {
  const schema = `query userSelf {
    userSelf() {
      id
      name
      nick
      username
      roleIds
      }
  }`;
  return schema;
};
const changePwdSchema = (params: IPassword) => {
  commonUtils.replaceSpecialCharacters(params);
  // 修改密码
  const schema = `mutation changePwd {
    changePwd(input:{password:"${params.password}",newPassword:"${params.newPassword}"})
  }`;
  return schema;
};

const createUserSchema = (params: IUser) => {
  commonUtils.replaceSpecialCharacters(params);
  // 用户新建
  const schema = `mutation createUser {
    createUser(input:{username: "${params.username}", password: "${params.password}", roleIds: [${params.roleIds}], name:"", nick:""}) {
      id
      name
      nick
      username
      roleIds
    }
  }`;
  return schema;
};

const editUserSchema = (params: IUser) => {
  commonUtils.replaceSpecialCharacters(params);
  // 编辑用户
  let schema = `mutation updateUser {
    updateUser(id:${params.id},changes:{`;
  if (params.password) {
    schema += `password:"${params.password}", `;
  }
  if (params.name) {
    schema += `name:"${params.name}", `;
  }
  if (params.nick) {
    schema += `nick:"${params.nick}", `;
  }
  schema += `username:"${params.username}", roleIds:[${params.roleIds}]}) {
      id
      name
      username
      roleIds
      nick
    }
  }`;
  return schema;
};

const deleteUserSchema = (params: IId) => {
  commonUtils.replaceSpecialCharacters(params);
  // 删除用户
  const schema = `mutation deleteUser {
    deleteUser(id:"${params.id}")
  }`;
  return schema;
};
const userExitSchema = () => {
  // 用户退出
  const schema = `query userExit {
      userExit
   }`;
  return schema;
};
export {
  userSelfSchema,
  usersByPageSchema,
  createUserSchema,
  editUserSchema,
  deleteUserSchema,
  changePwdSchema,
  userExitSchema
};
