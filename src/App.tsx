
import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import renderRoutes from '~@/routes/renderRoutes';
import 'antd/dist/antd.less';
import '~@/theme/common.scss';

import i18n from '~@/i18n';
import antdLocal from '~@/i18n/antd';
//TODO: set language in future
//i18n.setDefaultNamespace('zh_CN')
// i18n.setDefaultNamespace('en_US')
import routes from './routes';
import { StoresProvider, stores } from './store';
function App() {
  return (
    <ConfigProvider locale={antdLocal[i18n.options.defaultNS]}>
      <StoresProvider value={stores}>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      </StoresProvider>
    </ConfigProvider>
  );
}
export default App;
