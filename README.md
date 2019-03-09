# 这是一个商城的项目

## 用到哪些技术
1. vue、vue-router、vue-resource、vuex
2. mint-ui
3. mui

## 实现了哪些功能
1. 图片的轮播
2. 缩略图（放大及左右切换）
3. 发表评论
4. 加入购物车
5. 图片的懒加载

## 制作首页App组件
1. 完成 Header 区域，使用的是 Mint-UI 中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
 + 在制作 购物车 小图标的时候，操作会相对多一些
 + 先把 扩展图标的 css 样式，拷贝到项目中
 + 拷贝 扩展字体库 ttf 文件，到项目中
 + 为购物车小图标 ，添加如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件

## 加载首页轮播图数据
1. 获取数据， 如何获取呢？
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据，要保存到 data 身上
4. 使用 v-for 循环渲染每个 item 项

## 商城论坛页面制作
1. 绘制界面，使用 MUI 中的 media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现商城论坛列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link,同时，在跳转的时候应该提供唯一的Id标识符
2. 创建新闻详情的组件页面  NewsInfo.vue
3. 在路由模块中，将新闻详情的路由地址和组件页面对应起来

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的页面中，先手动导入 comment 组件
 + `import comment from './comment.vue'`
3. 在父组件中，使用 `components` 属性，将刚才导入 comment 组件，注册为自己的子组件
4. 将注册子组件时候的，注册名称，以标签形式，在页面中引用即可

## 获取所有的评论数据显示到页面中
1. 定义一个getComments方法使用 vue-resource 获取数据
2. 渲染真实数据

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求 下一页数据
2. 点击加载更多，让 pageIndex++ , 然后重新调用 this.getComments() 方法重新获取最新一页的数据
3. 为了防止新数据覆盖老数据的情况，在点击加载更多的时候，每当获取到新数据，应该让老数据调用数组的 concat 方法，拼接上新数组

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则Toast提示用户 评论内容不能为空
4. 通过 vue-resource 发送一个请求，把评论内容提交给服务器
5. 当发表评论OK后，重新刷新列表，以查看最新的评论
 + 如果调用 getComments 方法重新刷新评论列表的话，可能只能得到最后一页的评论，前几页的评论获取不到
 + 换一种思路： 当评论成功后，在客户端手动拼接出一个最新的评论对象，然后调用数组的 unshift 方法， 把最新的评论追加到  data 中 comments 的开头；这样就能完美实现刷新评论列表的需求；

## 绘制图片列表组件页面结构并美化样式
 1. 制作 顶部的滑动条
 2. 制作 底部的图片列表

## 制作顶部滑动条的坑们：
 1. 需要借助于 MUI 中的 tab-top-webview-main.html 
 2. 需要把 slider 区域的 mui-fullscreen 类去掉
 3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要被初始化一下：
  + 导入 mui.js 
  + 调用官方提供的 方式 去初始化：
  ```
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  ```
 4. 在初始化滑动条的时候，导入的 mui.js ，但是，控制台报错： `Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`
  + 经过推测觉得可能是 mui.js 中用到了 'caller', 'callee', and 'arguments' 东西，但是 webpack 打包好的 bundle.js 中，默认是启用严格模式的，所以，这两者冲突了；
  + 解决方案： 1. 把 mui.js 中的 非严格 模式的代码改掉；但是不现实； 2. 把 webpack 打包时候的严格模式禁用掉；
  + 最终选择了 plan B  移除严格模式： 使用这个插件 babel-plugin-transform-remove-strict-mode
 5. 刚进入图片分享页面的时候，滑动条无法正常工作， 经过分析，发现如果要初始化滑动条，必须要等 DOM 元素加载完毕，所以把初始化滑动条的代码，搬到了 mounted 生命周期函数中；
 6. 当滑动条调试OK后，发现 tabbar 无法正常工作了，这时候需要把 每个 tabbar 按钮的样式中  `mui-tab-item` 重新改一下名字；
 7. 获取所有分类，并渲染分类列表;

## 制作图片列表区域
 1. 图片列表需要使用懒加载技术，可以使用 Mint-UI 提供的现成的组件 `lazy-load`
 2. 渲染图片列表数据

## 实现点击图片跳转到图片详情页面
 1. 在改造 li 成 router-link 的时候，需要使用 tag 属性指定要渲染为哪种元素

## 实现图片详情中缩略图的功能
 1. 使用插件 vue-preview 这个缩略图插件
 2. 获取到所有的图片列表，然后使用 v-for 指令渲染数据
 3. 注意： img标签上的class不能去掉
 4. 注意： 每个图片数据对象中，必须有 w 和 h 属性

## 尝试在手机上去进行项目的预览和测试
 1. 要保证自己的手机可以正常运行；
 2. 要保证 手机 和 开发项目的电脑 处于同一个 WIFI 环境中，也就是说 手机 可以 访问到 电脑的 IP
 3. 打开自己的 项目中 package.json 文件，在 dev 脚本中，添加一个 --host 指令， 把 当前 电脑的 WIFI IP地址， 设置为 --host 的指令值；
  + 如何查看自己电脑所处 WIFI 的IP呢， 在 cmd 终端中运行 `ipconfig` ， 查看 无线网的 ip 地址

## 绘制商品列表组件页面结构并美化样式
 1. 手动制作左右两列的经典布局
 2. 使用编程式导航进行路由跳转
  + 最简单的方法：`this.$router.push('/home/goodsInfo')`
  + 传递对象的方法: `this.$router.push({ path: '/home/goodsInfo' + id })`
  + 命名的路由: `this.$router.push({ name: "goodsInfo", params: { id } })`
  + 带查询参数，变成/home/goodsInfo?id=id: `this.$router.push({ path: '/home/goodsInfo', query: { id: id }})`
 3. 给路由规则中定义的路由加上name属性以用于编程式导航的获取

## 绘制商品详情页面
 1. 制作商品图片的轮播图，这里把首页中的轮播图功能给抽离出来单独做成了一个轮播图组件 swipe.vue
 2. 由于首页跟商品详情中轮播的图片宽度要求不一样，所以在 swipe.vue 组件中定义了一个属性，让使用者决定图片宽度是否为100%
  + :isFull  在调用组件的元素中定义的属性，值为true和false
  + :class="{'full': isfull}"  在swipe.vue组件中的img元素中绑定
  + .full {width: 100%;}

## 实现商品详情中加入购物车的功能
 1. 使用mui中的mui-numbox组件实现增加，减少的基本功能
 2. 增加时会有一个上限值，该值为商品的库存数量
 3. 点击加入购物车时需要把商品id、数量、选中状态传递到服务器
 4. 制作小球跳到购物车中的动画效果
  + 在页面通过css绘制出一个小球，并通过`v-show`默认隐藏以及`position`进行初始定位
  + 通过`transition`标签和`before-enter`,`enter`,`after-enter`钩子函数实现小球跳到购物车中的动画效果
  + 发现当页面滚动后，小球的动画无法准确跳到徽标中，原因是小球的动画效果是通过定位实现,已经局限在了某一分辨率下的滚动条未滚动的情况下
  + 只要分辨率和测试的时候不一样，或者滚动条有一定的滚动距离之后，问题就出现了
  + 因此得到结论：不能把位置的横纵坐标直接写死了，而是应该根据不同情况，动态计算这个坐标值
  + 解题思路：先得到徽标的横纵坐标，再得到小球的横纵坐标，然后让 y 值求差， x 值也求差，得到的结果，就是横纵坐标要位移的距离
  + 如何获取徽标和小球的位置？？？   可以通过domObject.getBoundingClientRect()
  ```
  const ballPosition = this.$refs.ball.getBoundingClientRect();
  const badgePosition = document.getElementById("badge").getBoundingClientRect();
  const xDist = badgePosition.left - ballPosition.left;
  const yDist = badgePosition.top - ballPosition.top;
  domObject.style.transform = `translate(${xDist}px, ${yDist}px)`;
  domObject.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
  
  ```

## 实现购物车徽标值的动态变化
 1. 徽标所处的组件和加入购物车的组件不在一起，所以无法直接获取到商品的数量渲染到徽标中
 2. 那么通过什么方法实现？  是父子组件之间的传值？太过麻烦   这里使用状态管理模式：`vuex`
 3. 通过`vuex`中的`state`和`mutations`定义好商品的保存信息
 4. 徽标组件和加入购物车的组件中分别调用`mutations`的方法实现数值变化

 ## 遗憾
 1. 没有使用vue-cli快速构建项目
 2. 不会操作数据库和后台语言，无法使用真实的数据去实现