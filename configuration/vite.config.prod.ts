//**********************************
//***** Vite production config *****
//**********************************
import copy from 'rollup-plugin-copy';
const { merge } = require('webpack-merge');
import configBase, { Resolve } from './vite.config.base';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
const prodConfig = merge(configBase, {
  mode: 'production',
  plugins: [
    copy({
      targets: [
        {
          src: Resolve('src/pwa/*'),
          dest: Resolve('dist/')
        },
        {
          src: Resolve('configuration/env/config.json'),
          dest: Resolve('dist/')
        }
      ],
      hook: 'writeBundle',
      copyOnce: true
    })
  ],
  build: {
    /* rollupOptions: {
      plugins: [
        dynamicImportVars()
      ]
    }, */
    outDir: 'dist',
    assetsDir: 'static'
  }
});
export default prodConfig;
