# react-redux-antd-ie8

## 特性
* [react](https://github.com/facebook/react)
* [redux](https://github.com/rackt/redux)
* [react-router](https://github.com/rackt/react-router)
* [react-router-redux](https://github.com/rackt/react-router-redux)
* [webpack](https://github.com/webpack/webpack)
* [babel](https://github.com/babel/babel)
* [antd](http://ant.design)

## Code Style

https://github.com/airbnb/javascript

## `npm` 命令

|`npm run <script>`|解释|
|------------------|-----------|
|`dev`|服务启动在 `http://127.0.0.1:8989`，代码热替换开启。|
|`build`|构建项目|

#### `npm run build` 构建文件正常显示：
![Alt text](https://github.com/bertFu/react-redux-antd-ie8/blob/master/src/constants/build.jpg)

## 程序目录

```
.
├── build                             # 所有打包配置项
├── src                               # 程序源文件
│   ├── api                           # superagent 处理，基于node的Ajax组件
│   ├── components                    # 可复用的直观组件(Presentational Components)
│   ├── constants                     # 常量管理
│   ├── entries                       # 主页入口
│   │   ├── index.htlm                # 主入口 HTML 文件
│   │   ├── index.js                  # 主要 JS 文件
│   │   └── index.less                # 主入口 css 文件
│   ├── feature                       # 配置json文件
│   ├── routes                        # 主路由和异步分割点
│   │   └── index.js                  # 用store启动主程序路由
│   ├── services                      # 模拟服务
│   ├── store                         # Redux指定块
│   │   ├── middlewares               # 中间件管理
│   │   ├── modules                   # reducers/actions的集合
│   │   │   └── menu                  # 根据规则定制管理目录
│   │   │       ├── menu_action.js    # Action管理
│   │   │       ├── menu_reducer.js   # Reducer管理
│   │   │       └── menu_state.js     # State管理
│   │   ├── createStore.js            # 创建和使用redux store
│   │   ├── reducers.js               # Reducer注册和注入
│   │   └── types.js                  # 管理 Action、Reducer 公用的 types
│   ├── util                          # 工具包 
│   └── views                         # 业务页面管理
│       └── Home                      # 不规则路由
│           ├── index.js              # 路由定义和代码异步分割
│           ├── index.less            # 路由定义和代码异步分割
│           └── components            # 直观React组件
└── tests                             # 单元测试
```
 
## 兼容性
[antd 官方介绍](http://ant.design/docs/react/getting-started#兼容性)

#### Open `src/entries/index.html` <br/>

对于 IE8/9 等浏览器，需要提供 es5-shim 等 Polyfills 的支持，推荐使用 babel-polyfill。特别对于 IE8 需要配合使用 react@0.14.x 版本。
  ```
    <!--[if lt IE 10]>
    <script src="https://as.alipayobjects.com/g/component/??console-polyfill/0.2.2/index.js,es5-shim/4.5.7/es5-shim.min.js,es5-shim/4.5.7/es5-sham.min.js,html5shiv/3.7.2/html5shiv.min.js,media-match/2.0.2/media.match.min.js"></script>
    <![endif]-->
  ```
#### Open `package.json`

  ```diff
  - "react": "^15.0.2",
  - "react-dom": "^15.0.2",
  - "react-router": "^2.0.1",
  + "react": "0.14.x",
  + "react-dom": "0.14.x",
  + "react-router": "2.3.x"
  ```

  Remove hmr plugin.
  
  ```diff
  - "start": "dora -p 8001 --plugins   \"webpack,hmr,proxy,livereload?enableJs=false&injectHost=127.0.0.1,browser-history?index=/src/entries/index.html\"",
  + "start": "dora -p 8001 --plugins   \"webpack,proxy,livereload?enableJs=false&injectHost=127.0.0.1,browser-history?index=/src/entries/index.html\"",
  ```

#### Open `webpack.config.js`, and enable es3ify-loader

  ```diff
  // Enable this if you have to support IE8.
  - // webpackConfig.module.loaders.unshift({
  - //   test: /\.jsx?$/,
  - //   loader: 'es3ify-loader',
  - // });
  + webpackConfig.module.loaders.unshift({
  +   test: /\.jsx?$/,
  +   loader: 'es3ify-loader',
  + });
  ```
## Environment

```
node >= 4
```

## Redux

  ```
  +  "react-redux": "^4.4.0",
  +  "redux": "^3.3.1",
  +  "redux-logger": "^2.6.1",
  +  "redux-thunk": "^2.0.1"
  ```
  
## Extension
  ```
  +  "fetch-ie8": "^1.4.0",
  +  "object-assign": "^4.0.1",
  ```
  
## 总结 
- 该项目用于测试i8性能，可以当做脚手架使用
- 需要的朋友可以 `star`
- 持续更新

Thank you for your attention
