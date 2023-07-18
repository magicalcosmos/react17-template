import React,{useState} from 'react';
import { screen, render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { useStore as storeHook } from '~@/hooks';
import Current from './index';
import { UserStore } from '~@/store/user';
import { WebSocketStore } from '~@/store/websocket';
import { ROLES } from '~@/utils/dict';
import '~@/i18n';
const useStore = storeHook as ReturnType<typeof jest['fn']>;
const websocketStore = storeHook as ReturnType<typeof jest['fn']>;
jest.mock('~@/hooks');

beforeEach(() => {
});
afterEach(() => {
  cleanup();
})

const stubUserStore = () => {
  const store = new UserStore();
  return store;
};

const stubWebSocketStore = () => {
  const store = new WebSocketStore();
  return store;
};

describe('renders Header component', () => {
  beforeEach(() => {
    useStore.mockReturnValue(stubUserStore());
    websocketStore.mockReturnValue(stubWebSocketStore());
  });

  it('it renders Header without error', () => {
    expect(render(<Current />)).toBeTruthy();
  });
  // 管理员和测试人员
  /* it('it renders header content when privilege is for admin and tester', async () => {
    const store = stubUserStore();
    const username = 'Brody';
    store.setUser({
      username,
      rolIds: [ROLES.TESTER, ROLES.ADMIN],
      setWebSocket: () => {}
    });
    useStore.mockReturnValue(store);
    render(<Current />);
    const verifyProject = screen.getByText('验证项目');
    const baseLine = screen.getByText('需求基线版本');
    const systemManagement = screen.getByText('系统管理');
     
    expect(screen.getByTestId('logo')).toBeTruthy();
    expect(verifyProject).toBeTruthy();
    expect(baseLine).toBeTruthy();
    expect(systemManagement).toBeTruthy();
    expect(screen.getByTestId('userIcon')).toBeTruthy();
    expect(screen.getByText(username)).toBeTruthy();

    // 验证项目
    fireEvent.mouseOver(screen.getByText('验证项目'));
    await waitFor(() => {
      expect(screen.getByText('最近项目')).toBeTruthy();
    });
    expect(screen.getByText('项目列表')).toBeTruthy();

    // 需求基线版本
    fireEvent.mouseOver(screen.getByText('需求基线版本'));
    await waitFor(() => {
      expect(screen.getByText('最近需求基线版本')).toBeTruthy();
    });
    expect(screen.getByText('需求基线版本列表')).toBeTruthy();

    // 系统管理
    fireEvent.mouseOver(screen.getByText('系统管理'));
    await waitFor(() => {
      expect(screen.getByText('用户管理')).toBeTruthy();
    });
    expect(screen.getByText('许可证管理')).toBeTruthy();

  }); */

/*   // 管理员
  it('it renders header content when privilege is only for admin', async () => {
    const store = stubUserStore();
    const username = 'Brody';
    store.setUser({
      username,
      roleIds: [ROLES.ADMIN]
    });
    useStore.mockReturnValue(store);
    render(<Current />);
    expect(screen.getByTestId('logo')).toBeTruthy();
    expect(screen.queryByText('验证项目')).toBeFalsy();
    expect(screen.queryByText('需求基线版本')).toBeFalsy();
    expect(screen.getByText('系统管理')).toBeTruthy();
    expect(screen.getByTestId('userIcon')).toBeTruthy();
    expect(screen.getByText(username)).toBeTruthy();


    // 系统管理
    fireEvent.mouseOver(screen.getByText('系统管理'));
    await waitFor(() => {
      expect(screen.getByText('用户管理')).toBeTruthy();
    });
    expect(screen.getByText('许可证管理')).toBeTruthy();

  });
  // 测试人员
  it('it renders header content when privilege is only for tester', async () => {
    const store = stubUserStore();
    const username = 'Brody';
    store.setUser({
      username,
      roleIds: [ROLES.TESTER]
    });
    useStore.mockReturnValue(store);
    render(<Current />);
    expect(screen.getByTestId('logo')).toBeTruthy();
    expect(screen.getByText('验证项目')).toBeTruthy(); 
    expect(screen.getByText('需求基线版本')).toBeTruthy();
    expect(screen.queryByText('系统管理')).not.toBeInTheDocument();
    expect(screen.getByTestId('userIcon')).toBeTruthy();
    expect(screen.getByText(username)).toBeTruthy();

    // 验证项目
    fireEvent.mouseOver(screen.getByText('验证项目'));
    await waitFor(() => {
      expect(screen.getByText('最近项目')).toBeTruthy();
    });
    expect(screen.getByText('项目列表')).toBeTruthy();

    // 需求基线版本
    fireEvent.mouseOver(screen.getByText('需求基线版本'));
    await waitFor(() => {
      expect(screen.getByText('最近需求基线版本')).toBeTruthy();
    });
    expect(screen.getByText('需求基线版本列表')).toBeTruthy();

  }); */
});
