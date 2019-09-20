module.exports = {
  // 选项...
  publicPath: "./", //打包时加上
  devServer: {
    https: false,
    proxy: {
      '/chat': {
        target: 'http://openapi.tuling123.com/openapi',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/chat': ''
        }
      },
      '/siZhi': {
        target: 'https://api.ownthink.com/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/siZhi': ''
        }
      },
      // 拦截以/api开始的请求 并且添加头部  组成  http://59.110.138.169/api/xxxxx
      '/(api|admin)': {
        target: 'http://59.110.138.169',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
    }
  }
}