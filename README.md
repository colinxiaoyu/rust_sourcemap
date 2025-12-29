# SourceMap Bug Locator

一个基于 Tauri + React + Rust 的桌面应用，用于定位生产环境中的 JavaScript Bug 原始位置。

## 功能特性

- 📁 选择并解析 `.map` 文件（SourceMap）
- 🔍 通过行号和列号快速定位 Bug 源码位置
- 💻 跨平台桌面应用（支持 Windows、macOS、Linux）
- ⚡ 使用 Rust 高性能解析 SourceMap
- 🎨 现代化 UI 设计，支持亮色/暗色主题

## 技术栈

- **前端**: React 19 + Vite
- **后端**: Rust + Tauri 2
- **SourceMap 解析**: sourcemap crate

## 安装依赖

```bash
npm install
```

## 开发模式

```bash
npm run tauri dev
```

## 构建应用

```bash
npm run tauri build
```

构建完成后，可执行文件将位于 `src-tauri/target/release/` 目录下。

## 使用方法

### 1. 准备 SourceMap 文件

在对应的前端项目中生成 sourcemap 文件：

- 确保构建配置中启用了 source map 生成
- 例如在 Webpack 中设置 `devtool: 'source-map'`
- 运行构建命令生成 `.map` 文件

### 2. 获取 Bug 信息

从错误日志或监控平台获取错误堆栈信息，特别是：
- **行号 (Line)**: 错误发生的行数
- **列号 (Column)**: 错误发生的列数

### 3. 解析 Bug 位置

1. 启动应用
2. 点击"选择文件"按钮，选择对应的 `.map` 文件
3. 输入行号和列号
4. 点击"解析 Bug 位置"按钮
5. 查看原始源码位置信息：
   - 源文件路径
   - 原始行号
   - 原始列号
   - 函数/变量名（如果可用）

## 示例

假设你从生产环境收到以下错误：

```
Error at my_app.23f291801cf3abd36516.js:2:567888
```

操作步骤：
1. 选择 `my_app.23f291801cf3abd36516.js.map` 文件
2. 输入行号: `2`
3. 输入列号: `567888`
4. 点击解析，即可得到原始代码位置

## 参考

基于 [source-map-bug](./source-map-bug/) 目录中的 Node.js 版本实现。

## IDE 设置

推荐使用以下 IDE 配置：

- [VS Code](https://code.visualstudio.com/)
- [Tauri Extension](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## License

MIT
