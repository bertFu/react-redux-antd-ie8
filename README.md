# react-redux-antd-ie8

## 兼容性
[antd 官方介绍](http://ant.design/docs/react/getting-started#兼容性)

#### Open `src/enntries/index.html` <br/>

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

## Code Style

https://github.com/airbnb/javascript

## Develop

```
npm run dev
```

访问 http://127.0.0.1:8989

## Build

```
npm run build
```
