
import React,{ useState } from 'react';
import { screen, render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Current from './index';
import { useTranslation } from 'react-i18next';

const Mock = require('mockjs');

beforeEach(() => {
});
afterEach(() => {
  cleanup();
})

describe('Render TableList component', () => {
  it('it renders without error', () => {
    expect(render(<Current/>)).toBeTruthy();
  });

  it('it renders width data without error', () => {
    const name = '创建项目';
    const data = {
      page: {
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },
      button: {
        event: () => {},
        name
      },
      dataSource: []
    };
    expect(render(<Current { ...data }/>)).toBeTruthy();
    expect(screen.getByText('No Data')).toBeTruthy();
  });

  it('It\'s should render serach, button, table, pagination', () => {
    const name = '创建项目';
    const mockData = Mock.mock({
      'list|1-10': [{
        'id|+1': 1,
        'name': /[a-z][A-Z][0-9]/,
      }]
    });
    const data = {
      columns: [
        
      ], 
      page: {
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },
      button: {
        event: () => {},
        name
      },
      dataSource: mockData.list
    };
    expect(render(<Current { ...data }/>)).toBeTruthy();
    expect(screen.getByText(name)).toBeTruthy();

  });
  it('It\'s should render serach, button, table, pagination', () => {

  });
});
