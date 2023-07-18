//**********************************
//******** Vite base config ********
//**********************************
import { defineConfig } from 'vite';
import path from 'path';
import configStore from '../src/store/config';
let RUN_ENV = {};
if (process.env.RUN_ENV) {
  RUN_ENV = require(`./env/${process.env.RUN_ENV}.env.js`);
}
/**
 * concat path
 * @param dir directory
 */
export function Resolve(dir) {
  return path.join(__dirname, '..', dir);
}
const configBase = defineConfig({
  define: {
    __RUN_ENV__: RUN_ENV
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    },
    modules: {
      localsConvention: 'dashes'
    }
  },
  resolve: {
    alias: {
      '~': Resolve('.'),
      '~@': Resolve('src'),
      '~@gc': Resolve('src/components'), // global components
      '~@vc': Resolve('src/views/components'), // views components
      '~@s': Resolve('static') // views components
    }
  }
  //envDir: './env'  // custom envirment, but I don't want to use
});
export default configBase;
