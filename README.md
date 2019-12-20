# 同构
Webpack 将 source(component, store, router) 分别为 server 和 browser 打两个包， 各自有一个入口。
首次刷新会进入node， node 把所有组件渲染成html，返回浏览器。

# 路由
CSR： JS渲染页面。
SSR： 如果当前路由没有在server注册会404， 
解决： 客户端用BrowserRouter， 服务器端用StaticRouter


# 异步数据
组件中设置静态方法 loadData， node获取data返回给Store

# 作业
解决使用Promis.all时， 接口报错导致页面渲染失败
解决： store里的promise添加catch即可防止终端


# axios 代理实现
避免跨域，所有数据接口请求先由node层处理
============ X =============>(跨域)
浏览器=====> SSR Node ======> 数据接口(mock)