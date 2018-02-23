- 总体思路(三个部分)   
在HTML文件中添加
```
 <router-link to="/foo">Go to Foo</router-link>
<router-view></router-view>

```
其中<router-view>是路由存放组件的地方，相当于一个容器，<router-link>作用是跳转到哪一个看路由地址（一般为组件）相当于<a>.  
JS  

```
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
var router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})

```
其中Vue.use(Router)只有router在模块化引入时需要添加，如果直接引入
```
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
```
则不需要添加。然后新建一个router对象，进行配置，路径（path）：即跳到当前的URL时，显示对应的组件、路由名称（name）、组件（component）：外部引入或内部的组件模板，路由切换时，直接显示在<router-view>里面。
##### 下面对各个环节细节进行说明
- <router-link>指定的路由是通to来指定的，注意路径不是./开始，没有点。

```
<router-link to="/foo">Go to Foo</router-link>
```
- 子路由配置
在子组件里面添加

```
<router-view></router-view>
```
在父组件中跳转（直接指向地址）

```
 <router-link to='/jango/child2'>child2</router-link>
```
在配置中的子组件配置中加入children字段

```
{
      path: '/jango',
      name: 'jango',
      component: jango,
      children:[
        {
          path: 'child1',
          component: child1,
        },
         {
          path: 'child2',
          component: child2,
        }
      ]
    }
```
- 参数传递
通过<router-link>中的to来传递，需要绑定to，并传递一个对象包含name(路由的名称，所以to可以通过地址或在绑定的情况下通过路由的名称，进行路径的跳转)，params对象里面就是要传的参数。

```
<router-link :to="{name:'child3',params:{username:'jango-child3'}}">child3</router-link>
```
在子组件中可以直接调用参数{{ $route.params.username }}

```
<h1>{{ $route.params.username }}</h1>
```
在路由配置中要记得配置name哦！
另:

```
<router-link :to="{name:'child3',query:{username:'jango-child3'}}">child3</router-link>
```
跳转后链接为这种形式：  

```
http://localhost:8080/jango/child3?username=jango-child3
```


- 多路由操作(即有多个<router-view>)  
添加多个<router-view>，并且命名，没有命名则其name为default。

```
    <router-view></router-view>
    <!--多个路由区域-->
    <router-view name="view1"></router-view>
    <router-view name="view2"></router-view>
```
然后再配置路由。

```
 {
      path: '/',
      name: 'Hello',
      components: {
        default:Hello,
        view1:view1,
        view2:view2
      }
    },
```
注意components为复数，按照<router-view>的name一一对应组件。如果只有一个组件，则默认传给default。
- 通过URL传递参数
在<router-link>在路径URL后面添加参数的值
```
    <router-link to='/urlParams/12/apple'>urlParams</router-link>

```
其中12和Apple是参数的值。   
在路由配置中，path的URL后面用冒号(:)的形式表示参数的变量名。与<router-link>的路径一一对应。

```
{
      path:'/urlParams/:price/:product',
      name:'urlParams',
      component:urlParams
    }
```
其中price对应12，product对应Apple。   
在组件里面通过$route.params.参数变量 可以获取参数的值。参数后面可以添加正则表达式   
path:'/params/:newsId(\\d+)/:newsTitle',

```
<h1>{{ $route.params.price }}</h1>
<h1>{{ $route.params.product }}</h1>
```
- 重定向  
思路:<router-link>指向一个路由，在路由配置又将她指向另一个地址，带参数跟之前的操作一样，冒号加参数变量。

```
    <router-link to='/redirect'>redirect</router-link>

```
路由配置，将组件component换为redirect，指向另一个地址。

```
{
      path:'/redirect',
      redirect:'/'
    }
```
- 别名alias  
相当于给路径起了另一个名字。调用同一个组件。只需在路由配置中添加alias字段并给出另一个地址即可。
路由配置

```
{
      path:'/alias',
      name:'alias',
      component:alias,
      alias:'/anothername'
    },
```
当连接为/anothername时也会连接到该组件。  
alias与redirect的区别：  
redirect：仔细观察URL，redirect是直接改变了url的值，把url变成了真实的path路径。   
alias：URL路径没有别改变，这种情况更友好，让用户知道自己访问的路径，只是改变了<router-view>中的内容。  
注意：别名请不要用在path为’/’中，如下代码的别名是不起作用的。

```
{
  path: '/',
  component: Hello,
  alias:'/home'
}
```
- 路由切换时的动画实现  
在<router-view>标签外面添加<transition>，实现动画效果。
- mode字段的配置（路径的不同表现形式）
mode字段有两个选择  
histroy:当你使用 history 模式时，URL 就像正常的 url，例如 ：http://localhost:8080/jango/child1   
hash:默认’hash’值，但是hash看起来就像无意义的字符排列，不太好看也不符合我们一般的网址浏览习惯。例如：http://localhost:8080/#/jango/child1   

```
  routes: [
    {
      path: '/',
      name: 'Hello',
      components: {
        default:Hello,
        view1:view1,
        view2:view2
      }
    },
  ],
  // mode:'hash'
  mode:'history'
```
- 404页面设置  
当用户输入错误的地址时，显示404页面  
只需在路由配置中将错误的路径指向404组件页面即可，统配的路径用*号

```
{
  path:'*',
  name:'error404',
  component:error404
}
```
然后提供一个404页面即可。
- 钩子函数
在离开或者进入链接时，回调用钩子函数。钩子函数有3个参数：to，from，next。    

to:路由将要跳转的路径信息，信息是包含在对像里边的。
from:路径跳转前的路径信息，也是一个对象的形式。
next:路由的控制参数，常用的有next(true)和next(false)。  
next: Function: 一定要调用该方法来resolve这个钩子。执行效果依赖 next 方法的调用参数。  
next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。  
next(false): 中断当前的导航。如果浏览器的URL改变了（可能是用户手动或者浏览器后退按钮），那么URL地址会重置到from路由对应的地址。  
next('/') 或者 next({path:'/'}):跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。

有两种方法设置钩子函数：  
1.在路由配置内：  

```
{
  path:'/hook',
  name:'hook',
  component:hook,
  beforeEnter:(to,from,next)=>{
    console.log('我进入了hook Page!');
    console.log(to);
    console.log(from);
    next();
  },
},
```
2.在组件内设置：  

```
export default {
  name: 'hook',
  data () {
    return {
      msg: 'this is hook page',
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    console.log("我进入了hook Page!");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("我离开了hook Page!");
    next();
  }
}
```
注意，两者的函数名不同。
- 通过js调用实现路由的跳转  
this.$router.go(-1) 和 this.$router.go(1)实现前进后退。this.$router.push('/')跳转相应的路由。

```
  name: 'jsCtrlLink',
  data () {
    return {
      msg: 'this is jsCtrlLink page',
       
    }
  },
  methods:{
    goPrev:function(){
      this.$router.go(-1);
    },
    goHome:function(){
      this.$router.push('/');
    }, 
  }
```
- [传送门](https://router.vuejs.org/zh-cn/)




















