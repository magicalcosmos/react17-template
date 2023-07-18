import loadable from '@loadable/component';
import { RouteConfig } from 'react-router-config';
import Layout from '~@/views/Layout';
//
// if add global routes, please attention the route load order
//
import { CommonPath, AdminPath, TesterPath } from './paths';
const routesConfig: RouteConfig = [
  {
    path: CommonPath.About,
    exact: true,
    component: loadable(() => import('~@/views/About'))
  },
  {
    path: CommonPath.FAQ,
    exact: true,
    component: loadable(() => import('~@/views/Faq'))
  },
  {
    path: '/',
    component: Layout,
    routes: [
      {
        path: CommonPath.ChangePassword,
        component: loadable(() => import('~@/views/ChangePassword'))
      }
    ]
  }
];
export default routesConfig;
