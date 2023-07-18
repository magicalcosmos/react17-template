//**********************************
//******** Vite local config *******
//**********************************
import reactRefresh from '@vitejs/plugin-react-refresh';
const { merge } = require('webpack-merge');
import configBase from './vite.config.base';
const devConfig = merge(configBase, {
  mode: 'development',
  server: {
    host: '0.0.0.0',
    port: 3000, // TODO: it's not working, I don't know why
    strictPort: true
  },
  plugins: [
    reactRefresh({
      parserPlugins: ['classProperties', 'classPrivateProperties']
    })
  ]
});
export default devConfig;
