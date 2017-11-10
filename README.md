# myblog

> This is zkTom blog project.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

目录结构以及他们的功能作用

controller ---负责处理业务逻辑
router     ---负责路由跳转
dao        ---负责数据库相关操作
util       ---相关工具类

api返回信息
code: 0,                 ---0请求失败，1请求成功
type: 'ERROR_UPLOAD_IMG',---错误情况下存在，代指错误类型 （大写常量）
message: '上传图片失败'  ---返回给前台的报错信息描述

