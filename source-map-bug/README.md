### 操作流程
#### 在对应的 easy-dish-online 项目中生成 sourcemap 文件
1. 版本保持一致
> 找到bug 对应的上线版本 
2. easy-dish-online 切换到对应的版本
3. 修改 easy-dish-online 文件 webpack.prod.js
>确保 devtool: 'source-map' 为打开状态
4.  运行 yarn build 生成对应的 map文件

#### 获取bug 位置信息
1. 将生成的 my_app文件复制到该项目中
2. 找到钉钉对应版本的 bug 信息，修改 line 和 column 的值
3. 运行 node index.js 获取对应版本的bug具体位置