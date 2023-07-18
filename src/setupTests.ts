/*eslint-disable*/
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import md5 from 'js-md5';
const puppeteer = require('puppeteer');
import axios from 'axios';
const __RUN_ENV__ = require(`../configuration/env/${process.env.RUN_ENV}.env.js`);
global.__RUN_ENV__ = __RUN_ENV__;
const username = 'tester001';
const password = md5('123456');
let token = '';

//axios.defaults.responseType = 'json';
//axios.defaults.headers['post']['Content-Type'] = 'application/x-www-form-urlencoded';
//axios.defaults.headers['get']['Content-Type'] = 'application/x-www-form-urlencoded';
//axios.defaults.withCredentials = true;
beforeEach(async () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))
  });
 
  localStorage.setItem('ilock-token', 'NJGYMWE3NJGTNDQ1NC0ZMTY5LWEWYTETYZBMMGIWYMU5NJEY');
});
// remove console.warn message
const filteredWarnMessages: string[] = [
  'async-validator:',
  'componentWillReceiveProps has been renamed',
]
const privateWarnLog = console.warn
jest.spyOn(console, 'warn').mockImplementation((msg: string, ...args: unknown[]) => {
  filteredWarnMessages.some(message => msg.includes(message)) ? jest.fn() : privateWarnLog(msg, ...args)
})

// List of message errors we want to filter from error logs in tests
const filteredErrorMessages: string[] = []
const privateErrorLog = console.error
jest.spyOn(console, 'error').mockImplementation((msg: string, ...args: unknown[]) => {
  filteredErrorMessages.some(message => msg.includes(message)) ? jest.fn() : privateErrorLog(msg, ...args)
})
