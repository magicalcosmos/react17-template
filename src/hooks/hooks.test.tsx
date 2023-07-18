import React from 'react';
import { renderHook } from '@testing-library/react-hooks'
import { cleanup } from '@testing-library/react';
import '~@/i18n';
import { stores, StoresProvider } from '~@/store';
import { useStore, useStores } from '~@/hooks';
import Current from './index';

afterEach(cleanup);
describe('useStores', () => {
  it('it return compelete stores map', () => {
    const wrapper: React.FC = ({ children }) => {
      return <StoresProvider value={stores}>{children}</StoresProvider>;
    };
    const { result } = renderHook(() => useStores(), { wrapper });
    expect(result.current).toStrictEqual(stores);
  });
});
describe('useStore', () => {
  it('it return a store by key', () => {
    const wrapper: React.FC = ({ children }) => {
      return <StoresProvider value={stores}>{children}</StoresProvider>;
    };
    const { result } = renderHook(() => useStore('userStore'), { wrapper });
    expect(result.current).toStrictEqual(stores.userStore);
  });
});
