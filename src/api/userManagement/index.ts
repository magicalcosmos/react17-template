//*************************
//  用户管理
//*************************
import Ajax from '~@/utils/ajax';
import {
  userSelfSchema,
  usersByPageSchema,
  createUserSchema,
  editUserSchema,
  deleteUserSchema,
  userExitSchema,
  changePwdSchema
} from '~@/schemas';
import { IUser, IUserPage, IPassword, IId } from '~@/interface';
class UserManagement {
  // 根据token获取用户信息
  userSelf() {
    const variables = {};
    return Ajax.query(userSelfSchema(), variables);
  }
  // 用户列表
  userList(params: IUserPage) {
    const variables = {};
    return Ajax.query(usersByPageSchema(params), variables);
  }
  // 新建用户
  createUser(params: IUser) {
    const variables = {};
    return Ajax.query(createUserSchema(params), variables);
  }
  // 编辑用户
  editUser(params: IUser) {
    const variables = {};
    return Ajax.query(editUserSchema(params), variables);
  }
  // 删除用户
  deleteUser(params: IId) {
    const variables = {};
    return Ajax.mutation(deleteUserSchema(params), variables);
  }
  changePassword(params: IPassword) {
    const variables = {};
    return Ajax.mutation(changePwdSchema(params), variables);
  }
  // 退出登录
  signout() {
    const variables = {};
    return Ajax.query(userExitSchema(), variables);
  }
}
const instance = new UserManagement();
export { UserManagement };
export default instance;
