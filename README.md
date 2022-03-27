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


### 项目结构：
```
### public：第三方资源存放地和index.html
### components，组件文件夹
### views，存放页面的地方
### ---其中home.vue是架构文件
```

### 技术点突破
```
### 通过操作app.vue的全局api，this.$root来实现app.vue里面的数据，甚至是app.vue引入组件的实例的数据的读取和修改
### 来实现通过app.vue中间层去直接获取或者修改数据来每一个页面实时同步使用
选项api里面，通过watch把全局数据写到当前页面this去获取
watch:{
    '$root.store':{
        immediate:true,
        deep:true,
        handler(o,n) {
            this.store = {}
            for(var i in this.$root.store) {
                this.store[i] = this.$root.store[i]
            }
        }
    }
},
组合api的setup里面
import { reactive,getCurrentInstance } from 'vue'
var { proxy }= reactive(getCurrentInstance())//vue实例获取，setup里面获取
var { store } = reactive(proxy.$root)
```

### 项目描述（重点权限请求处理）
```
### home.vue 里面的mounted()里面的那个routereset方法就是渲染路由权限的方法，
### 请求接口，然后把拿到的一个存--路由标识"name"--这个数组，传进去routereset的第一个参数里面，调用这个方法就ok
### 可以在接口里面顺带用户的信息然后定义个方法到common里面储存起来然后暴露出来
```
```
### 一般在common里面储存信息是先调用暴露出来的方法写入对象，然后再把暴露出来的对象拿出来使用
```
```

### 因为标签页的内容有的可能用了别的ui框架，如果发现npm安装失败，请在package.json里面先把ui框架和其他跟vue框架本身无关的npm依赖先去除掉,备份一份下来，然后重新npm i，保证架构先能启动先，再补其他ui框架或插件（本项目的建立就是基于这个初衷的情况下建立的）
```

再不懂直接提issue
