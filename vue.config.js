const { defineConfig } = require('@vue/cli-service');
const path = require('path'); // 添加这一行

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
});
