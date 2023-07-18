import React from 'react';
import commonStore from './common';
//import counterStore from './counter';
import configStore from './config';
import userStore from './user';
import expressHistoryStore from './expressHistory';
import webSocketStore from './websocket';
import licenseStore from './license';
import projectStore from './project';
import requirementStore from './requirement';
import trapezoidDiagramStore from './trapezoidDiagram';
export default {
  commonStore,
  configStore,
  userStore,
  expressHistoryStore,
  webSocketStore,
  licenseStore,
  projectStore,
  requirementStore,
  trapezoidDiagramStore
};

export const stores = Object.freeze({
  commonStore,
  configStore,
  userStore,
  expressHistoryStore,
  webSocketStore,
  licenseStore,
  projectStore,
  requirementStore,
  trapezoidDiagramStore
});
export const storesContext = React.createContext(stores);
export const StoresProvider = storesContext.Provider;
