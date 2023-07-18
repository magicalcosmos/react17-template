/*eslint-disable*/
import React from 'react';
import { stores, storesContext } from '~@/store';
export const useStores = () => React.useContext(storesContext);
export const useStore = <T extends keyof typeof stores>(
    store: T
) : typeof stores[T] => React.useContext(storesContext)[store];
