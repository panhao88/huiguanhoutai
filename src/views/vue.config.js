module.exports = {
  publicPath: './',  //  公共路径
  outputDir: 'dist',  //  打包后的路径
  assetsDir: 'static', //静态资源(js|css|img|fonts)目录
  lintOnSave: process.env.NODE_ENV === 'development',//设置是否在开发环境下每次保存代码时都启用 eslint验证
  productionSourceMap: false,// 生产环境的 source map 用于定位代码错误
  devServer: {
    proxy: {
      '/api': {
        ws: false,
        // 解决跨域问题: 只需要把这个文件的target属性改成接口根路径即可
        // 改动了这个文件 一定要重启项目 要不然不生效
        // 代理: webpack提供的能力
        target: 'http://192.168.0.25',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  },
}