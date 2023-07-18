import '~@/theme/default/Layout.scss';
import React from 'react';
import renderRoutesComponent from '~@/routes/renderRoutesComponent';
import { withRouter } from 'react-router-dom';
import { Header as h } from '~@vc';
import { useStore } from '~@/hooks';
const Layout = (props: any) => {
  const store: any = useStore('userStore');
  const Head = withRouter(h);
  const route = props.route;
  return (<div className='App'>
    {store.user && <Head />}
    {route && renderRoutesComponent(route.routes)}
  </div>);
};
export default Layout;
