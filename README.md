# testpc_project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### home.vue 里面的mounted()里面的那个routereset方法就是渲染路由权限的方法，
### 请求接口，然后把拿到的一维的每个路由的name的数组，传进去routereset的第一个参数里面，调用这个方法就ok
### 可以在接口里面顺带用户的信息然后定义个方法到common里面储存起来然后暴露出来
### 一般在common里面储存信息是先调用暴露出来的方法写入对象，然后再把暴露出来的对象拿出来使用

### 因为标签页的内容有的可能用了别的ui框架，如果发现npm安装失败，请在package.json里面先把ui框架和其他跟vue框架本身无关的npm依赖先去除掉,备份一份下来，然后重新npm i，保证架构先能启动先，再补其他ui框架或插件（本项目的建立就是基于这个初衷的情况下建立的）

再不懂直接提issue
