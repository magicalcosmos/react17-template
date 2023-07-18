import React, { useEffect, useState } from 'react';
import localStorage from '~@/utils/localStorage';
import { Switch, Route, Redirect } from 'react-router-dom';
import Authentication from '~@/utils/authorization';
import License from '~@/utils/license';
import { ROLES } from '~@/utils/dict';
import { useStore } from '~@/hooks';

import { CommonPath, AdminPath, TesterPath } from '~@/routes/paths';

function renderRoutes(routes: any, extraProps = {}, switchProps = {}) {
  const store: any = useStore('userStore');
  const licenseStore: any = useStore('licenseStore');
 
  // get token from local storage
  const token = localStorage.getToken();

  function getLicense() {
    License.getLicense().then(() => {
      licenseStore.setHasLicense(true);
    }, () => {
      licenseStore.setHasLicense(false);
    });
  }

  useEffect(() => {
    if (store.user) {
      getLicense();
    }
  });

  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route: any, i: number) => {
        return (
          <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={(props: any) => {
              if (!token && route.authorization) {
                Authentication.grantAuthorization();
                return;
              }
              if (route.verifyLicense && licenseStore.hasLicense === false) {
                return <Redirect key={i} to={CommonPath.LicenseException} />;
              }
              if (route.path === '/' && route.exact) {
                const roleIds = store.user && store.user.roleIds;
                if (roleIds && roleIds.length) {
                  let path = AdminPath.UserList;
                  if (roleIds.indexOf(ROLES.TESTER) !== -1) {
                    path = TesterPath.ProjectList;
                  }
                  return <Redirect key={i} to={path} />;
                }
              }
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
