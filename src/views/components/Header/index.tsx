import '~@/theme/default/components/Header.scss';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Dropdown, Modal } from 'antd';
import { MenuItem } from '~@/interface';
import Authentication from '~@/utils/authorization';
import { useStore } from '~@/hooks';
import { ROLES, CMD } from '~@/utils/dict';
import Log from '~@/utils/log';
import { ERRORCODE } from '~@/utils/errors';
import WS from '~@/utils/websocket';
import { CommonPath, AdminPath, TesterPath } from '~@/routes/paths';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { PROJECT_API, REQUIREMENT_BASELINE_API } from '~@/api';
import appInfo from '~/appInfo';
function Header(props: any) {
  /*************** Variables *****************/
  document.title = appInfo.productName;
  const store = useStore('userStore');
  const requirementStore = useStore('requirementStore');
  const wsStore: any = useStore('webSocketStore');
  /**
   * go to some page 
   * @param menuItem
   */
  const _goToPage = (menuItem: MenuItem) => {
    if (menuItem.url === '#') {
      return;
    }
    if (menuItem.isHelp) {
      window.open(`${window.location.protocol}//${window.location.host}${menuItem.url}`, '_blank');
      return;
    }
    if (menuItem.id) {
      let skipURI = `${TesterPath.VerifyProject}?projectId=${menuItem.id}`;
      if (menuItem.versionTotal !== '' && menuItem.versionTotal !== undefined) {
        requirementStore.setRequirementInfo(menuItem);
        skipURI = `${TesterPath.RequirementBaseVersionList}?demandId=${menuItem.id}&demandName=${menuItem.name}`;
      }
      props.history.push(skipURI);
    } else if (menuItem.url === 'signout') {
      Authentication.signout();
    } else {
      props.history.push(menuItem.url);
    }
  };
  /**
   * get active class for dropdown hover style
   */
  const _getActiveClass = (item: MenuItem) => {
    return (item?.isRecent || item?.id) ? 'recent' + (item.isRecent ? ' recent-title' : '') : null;
  };
  /**
   * common method for concat menu items
   * @param menuArray
   */
  const _getMenu = (menuArray: Array<MenuItem>) => {
    return (
      <Menu>
        {menuArray.map((item: MenuItem) => {
          return (
            <Menu.Item data-testid='dropdown-item' key={item?.name || Date.now().toString()} className={_getActiveClass(item)}>
              <a className={item?.id ? 'name-item' : null} title={item?.id ? item.name : ''} onClick={_goToPage.bind(this, item)}>
                {item?.name}
              </a>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  };
  const { t } = useTranslation();
  let menu: Array<MenuItem> = [{
    // menu - 验证项目
    isRecent: true,
    name: t('menu.recent_project'),
    url: '#'
  }, {
    name: t('menu.project_list'),
    url: TesterPath.ProjectList
  }];

  const [projectMenu, setProjectMenu] = useState(menu);
  const verifyProjectMenu = _getMenu(projectMenu);
  // menu - 需求基线版本
  const menuArray1 = [{
    isRecent: true,
    name: t('menu.recent_base_requirement'),
    url: '#'
  }];

  //可观测模式转原生
  const latestRequirementBaseListArray = toJS(requirementStore.latestRequirementBaseList);
  const menuArray3 = [{
    name: t('menu.base_requirement_list'),
    url: TesterPath.RequirementBaseList
  }];
  menu = menuArray1.concat(latestRequirementBaseListArray).concat(menuArray3);

  const securityRequirementMenu = _getMenu(menu);

  // menu - 项目管理
  menu = [{
    name: t('menu.user_management'),
    url: AdminPath.UserList
  }, {
    name: t('menu.license_management'),
    url: AdminPath.License
  }];
  const systemManagementMenu = _getMenu(menu);

  // menu - 帮助
  menu = [{
    isHelp: true,
    name: t('menu.faq'),
    url: CommonPath.FAQ
  },
  // {
  //   name: t('menu.user_munual'),
  //   url: CommonPath.UserMunual
  // },
  {
    isHelp: true,
    name: t('menu.about'),
    url: CommonPath.About
  }];
  const helpMenu = _getMenu(menu);

  // menu - 用户管理
  menu = [{
    name: t('user.change_password'),
    url: CommonPath.ChangePassword
  }, {
    name: t('menu.signout'),
    url: CommonPath.Signout
  }];
  const userManagementMenu = _getMenu(menu);


  /*************** Events *****************/
  /**
   * Get project list
   */
  function getProjectListByPage() {
    PROJECT_API.getLatestProjects({ type: '2' }).then((data: any) => {
      if (data.lastProjects) {
        projectMenu.splice(1, projectMenu.length - 2, ...data.lastProjects);
      }
      setProjectMenu([...projectMenu]);
    });
  }

  /**
   * Get Demands by page
   */
  function getDemandsByPage() {
    REQUIREMENT_BASELINE_API.requirementBaseList({
      pageIndex: 1,
      pageSize: 3,
      sortKey: 'ViewAt',
      isAsc: false,
      keyword: ''
    }).then((data: any) => {
      const demands = data.demandsByPage?.demands;
      requirementStore.setLatestRequirementBaseList(demands || []);
    });
  }

  useEffect(() => {
    getProjectListByPage();
    getDemandsByPage();
  }, []);

  if (!WS.store) {
    try {
      WS.connect(wsStore, {
        callback: () => {
          WS.subscribe({
            // subCode: 'project'
            subCode: ''
          });
        },
        close: (data: any) => {
          let title = '';
          let content = '';
          let okText = '';
          switch (data.cmd) {
            case CMD.CLOSEBYNEW:
              title = t('tips.name');
              content = t('tips.signined');
              okText = t('button.sure');
              break;
            case CMD.CLOSE:
              if (parseInt(data.errCode) === ERRORCODE.ExCode_License_UpdateSuccess) {
                title = t('tips.name');
                content = t('tips.updated_certificate');
                okText = t('button.sure');
              }
              break;
            case CMD.REFUSE:
              title = t('tips.name');
              content = t('tips.out_of_limit');
              okText = t('button.sure');
              break;
            default: break;
          }
          if (title) {
            const modal = Modal.info();
            modal.update({
              title,
              content,
              okText,
              centered: true,
              onOk: () => {
                Authentication.signout();
              }
            });
          }
        }
      });
    } catch (e: Error) {
      Log.error('Ready to connect websocket failed, error:', e);
    }

  }

  const projectPathArray = [
    TesterPath.ProjectAdd,
    TesterPath.ProjectList,
    TesterPath.VerifyProject
  ];
  const requirementPathArray = [
    TesterPath.RequirementBaseList,
    TesterPath.VerifyPequirement,
    TesterPath.RequirementBaseVersionList
  ];
  const userPathArray = [
    CommonPath.ChangePassword,
    CommonPath.LicenseException,
    AdminPath.License,
    AdminPath.UserList
  ];

  const handleProjectVisibleChange = (visible: boolean) => {
    if (visible) {
      getProjectListByPage();
    }
  };

  const handleRequirementVisibleChange = (visible: boolean) => {
    if (visible) {
      getDemandsByPage();
    }
  };

  return (
    <header className='header'>
      <div className='logo' data-testid='logo'></div>
      <div className='menu-list'>
        {store.user?.roleIds?.indexOf(ROLES.TESTER) !== -1
          ? <>
            <Dropdown
              overlayClassName='header-dropdown-text'
              overlay={verifyProjectMenu}
              onVisibleChange={handleProjectVisibleChange}
              placement='bottomLeft'
            >
              <span data-testid='test' className={projectPathArray.includes(props.location.pathname) ? 'active' : ''}>{t('menu.verify_project')}</span>
            </Dropdown>
            <Dropdown
              overlayClassName='header-dropdown-text'
              overlay={securityRequirementMenu}
              onVisibleChange={handleRequirementVisibleChange}
            >
              <span className={requirementPathArray.includes(props.location.pathname) ? 'active' : ''}>{t('menu.base_requirement')}</span>
            </Dropdown>
          </> : ''}
        {store.user?.roleIds?.indexOf(ROLES.ADMIN) !== -1
          ? <Dropdown overlayClassName='header-dropdown-text' overlay={systemManagementMenu}>
            <span className={userPathArray.includes(props.location.pathname) ? 'active' : ''}>{t('menu.system_management')}</span>
          </Dropdown> : ''}
      </div>
      <div className='user-info'>
        <span className='help'>
          <Dropdown overlayClassName='header-dropdown-text' overlay={helpMenu}>
            <span>{t('menu.help')}</span>
          </Dropdown>
        </span>
        <Dropdown overlayClassName='header-dropdown-text' overlay={userManagementMenu}>
          <span className='user-info-detail'><i className='iconfont iconadmin' data-testid='userIcon'></i>{store.user?.username}</span>
        </Dropdown>
      </div>
    </header>
  );
}
export default observer(Header);
