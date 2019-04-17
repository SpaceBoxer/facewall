const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('public', resolve('public'))
      .set('@', resolve('src'));
  },
  devServer: {
    // proxy: 'http://localhost:4000',
    port: 8005
  }
};
