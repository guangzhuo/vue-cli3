const SpritesmithPlugin = require('webpack-spritesmith');
const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir)
}

// 代理标识
const proxy_path = ['/v1'];
let pro_env = require('./env/pro.env');  // 生产环境
let test_env = require('./env/test.env');  // 测试环境
let dev_env = require('./env/dev.env');  // 本地环境
let huidu_env = require('./env/huidu.env');  // 本地环境
let env = process.env.NODE_ENV;
let target = '';
if(env === 'production') {
    target = pro_env.hosturl;
} else if (env === 'test') {
    target = test_env.hosturl;
} else if(env === 'huidu'){
    target = huidu_env.hosturl;
} else {
  target = dev_env.hosturl;
}
let proxyObj = {};
proxy_path.forEach((item, index) => {
    proxyObj[item] = {
        target: target,
        ws: true,
        changeOrigin: true
    }
})
module.exports = {
 // 基本路径 process.env.NODE_ENV === 'production'
 baseUrl: '/',
 // 输出文件目录
 outputDir: 'dist',
 // eslint-loader 是否在保存的时候检查
 lintOnSave: false,
 // use the full build with in-browser compiler?
 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
//  compiler: false,
 // webpack配置
 // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
 chainWebpack: (config)=>{
    config.resolve.alias
        .set('@', resolve('src'))
},
 configureWebpack: {
    plugins: [
        new SpritesmithPlugin({
            // 目标小图标
            src: {
                cwd: path.resolve(__dirname, './src/assets/images/icons'),
                glob: '*.png'
            },
            // 输出雪碧图文件及样式文件
            target: {
                image: path.resolve(__dirname, './src/assets/images/sprite.png'),
                css: path.resolve(__dirname, './src/assets/images/sprite.css')
            },
            // 样式文件中调用雪碧图地址写法
            apiOptions: {
                cssImageRef: './sprite.png'
            },
            spritesmithOptions: {
                algorithm: 'top-down',
                padding: 4,
            }
        }),
        
     ],
   externals: {
     //放弃打包的组件
     vue: "Vue",
     // vuex: "Vuex",
     // "vue-router": "VueRouter",
     "echarts": "echarts",
     "element-ui": "ElementUI"
   }
 },
 // vue-loader 配置项
 // https://vue-loader.vuejs.org/en/options.html
//  vueLoader: {},
 // 生产环境是否生成 sourceMap 文件
 productionSourceMap: true,
 // css相关配置
 css: {
  // 是否使用css分离插件 ExtractTextPlugin
  extract: true,
  // 开启 CSS source maps?
  sourceMap: false,
  // css预设器配置项
  loaderOptions: {},
  // 启用 CSS modules for all css / pre-processor files.
  modules: false
 },
 // use thread-loader for babel & TS in production build
 // enabled by default if the machine has more than 1 cores
 parallel: require('os').cpus().length > 1,
 // 是否启用dll
 // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
//  dll: false,
 // PWA 插件相关配置
 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
 pwa: {},
 // webpack-dev-server 相关配置
 devServer: {
//   open: process.platform === 'darwin',
  host: '0.0.0.0',
  port: 8080,
  https: false,
  hotOnly: false,
  disableHostCheck: true,//方向代理
  proxy: proxyObj, // 设置代理
//   before: app => {}
 },
 // 第三方插件配置
 pluginOptions: {
  // ...
 }
}
