import React, { useState } from 'react';
import { screen, render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { useStore as storeHook } from '~@/hooks';
import Current from './index';
import { UserStore } from '~@/store/user';
import '~@/i18n';
const useStore = storeHook as ReturnType<typeof jest['fn']>;
jest.mock('~@/hooks');

beforeEach(() => {
})
afterEach(() => {
  cleanup();
})

const stubUserStore = () => {
  const store = new UserStore();
  return store;
};

describe('Page Component ChangePassword: ', () => {

  beforeEach(() => {
    useStore.mockReturnValue(stubUserStore());
  });
  it('it renders without error', () => {
    expect(render(<Current />)).toBeTruthy();
  });
  it('it renders user name, old passowrd, new password, confirm password', () => {
    const { queryByText, queryByTestId } = render(<Current />);
    expect(queryByText('用户名')).toBeTruthy();
    expect(queryByText('旧密码')).toBeTruthy();
    expect(queryByTestId('password')).toBeTruthy();
    expect(queryByText('新密码')).toBeTruthy();
    expect(queryByTestId('newPassword')).toBeTruthy();
    expect(queryByText('确认密码')).toBeTruthy();
    expect(queryByTestId('confirmPassword')).toBeTruthy();
  });
  it('it renders inital username by store', async () => {
    const store = stubUserStore();
    store.setUser({
      username: 'lcj'
    });
    useStore.mockReturnValue(store);
    const { queryByText } = render(<Current />);
    expect(queryByText('lcj')).toBeTruthy();
  });
  it('validate the form item ', async () => {
    const { getByTestId, getByText, queryByText } = render(<Current />);
    const password = getByTestId('password');
    const newPassword = getByTestId('newPassword');
    const confirmPassword = getByTestId('confirmPassword');

    // post data when no input
    const confirm = getByText('确 定');
    userEvent.click(confirm);
    await screen.findByText('请输入旧密码');
    await screen.findByText('请输入新密码');
    await screen.findByText('请输入确认密码');

    // 只输入旧密码
    userEvent.type(password, '123456');
    userEvent.click(confirm);
    await screen.findByText('请输入新密码');
    await screen.findByText('请输入确认密码');
    userEvent.clear(password);

    // 只输入新密码
    userEvent.type(newPassword, '123456');
    userEvent.click(confirm);
    await screen.findByText('请输入旧密码');
    await screen.findByText('请输入确认密码');
    userEvent.clear(newPassword);

    // 只输入确认密码
    userEvent.type(confirmPassword, '123456');
    userEvent.click(confirm);
    await screen.findByText('新密码与确认密码不一致');
    await screen.findByText('请输入旧密码');
    await screen.findByText('请输入新密码');
    userEvent.clear(confirmPassword);

    // 只输入新密码
    userEvent.type(newPassword, '123456');
    userEvent.click(confirm);
    await screen.findByText('请输入旧密码');
    await screen.findByText('请输入确认密码');
    userEvent.clear(newPassword);

    // 只输入确认密码
    userEvent.type(confirmPassword, '123456');
    userEvent.click(confirm);
    await screen.findByText('请输入旧密码');
    await screen.findByText('请输入新密码');
    userEvent.clear(confirmPassword);

    // 密码不能小于6位
    userEvent.type(newPassword, '12345');
    await screen.findByText('密码不能小于6位');
    userEvent.clear(newPassword);



    // 新密码与确认密码不一致 
    userEvent.type(newPassword, '123456');
    userEvent.type(confirmPassword, '123457');
    await screen.findByText('新密码与确认密码不一致');
    userEvent.clear(confirmPassword);
    userEvent.clear(newPassword);

    // 新密码与密码一致， 旧密码不一致
    userEvent.clear(password);
    userEvent.type(password, '123456GGyyysdfsdfdsfds');
    userEvent.type(newPassword, '123456');
    userEvent.type(confirmPassword, '123456');
    userEvent.click(confirm);
    setTimeout(async () => {
      await screen.findByText('旧密码不正确, 请重新输入');
    }, 1000);
  });
});
