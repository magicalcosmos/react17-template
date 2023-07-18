import React, { useEffect, useState } from 'react';
import localStorage from '~@/utils/localStorage';
import { Switch, Route } from 'react-router-dom';
import { useStore } from '~@/hooks';
import { USER_MANAGEMENT_API } from '~@/api';

function renderRoutes(routes: any, extraProps = {}, switchProps = {}) {
  const store: any = useStore('userStore');
  const [hasRoutes, setHasRoutes] = useState(false);
  function _getURLParams() {
    const hash = window.location.hash;
    const paramsArray = hash.substr(1, hash.length).split('&');
    const paramsObject: any = {};
    paramsArray.forEach((item: any) => {
      const itemArray = item.split('=');
      paramsObject[itemArray[0]] = itemArray[1];
      if (itemArray[0] === 'access_token') {
        localStorage.setToken(itemArray[1]);
        //location.href = '/';
      }
    });
  }
  _getURLParams();

  // Get license information
  //const [licenseStatus, setLicenseStatus] = useState(null);
  useEffect(() => {
    USER_MANAGEMENT_API.userSelf().then((data: any) => {   
      store.setUser(data.userSelf);
      setHasRoutes(true);
    });
  }, []);

  return hasRoutes && routes ? (
    <Switch {...switchProps}>
      {routes.map((route: any, i: number) => {
        return (
          <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={(props: any) => {
              if (route.render) {
                return route.render({ ...props, ...extraProps, route: route });
              }
              return <route.component {...props} {...extraProps} route={route} />;
            }}
          />
        );
      })}
    </Switch>
  ) : null;
}

export default renderRoutes;
