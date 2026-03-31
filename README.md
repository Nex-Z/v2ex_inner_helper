# V2EX 国内体验增强

一个 Chrome 扩展，为 V2EX 镜像站点添加增强功能。

## 功能特性

- **Bing 搜索集成**：在 V2EX 搜索框中输入关键词时，自动添加 Bing 搜索选项，方便使用 Bing 搜索站内内容
- **链接自动重定向**：自动将 v2ex.com 链接重定向到 global.v2ex.co 镜像站点
- **设置开关**：通过扩展图标弹窗可随时开启/关闭链接重定向功能

## 安装方式

1. 下载或克隆本仓库
2. 打开 Chrome，访问 `chrome://extensions/`
3. 开启右上角的「开发者模式」
4. 点击「加载已解压的扩展程序」
5. 选择本仓库文件夹即可

## 使用方法

### 搜索增强

在 V2EX 站点（如 global.v2ex.co）的搜索框中输入关键词，下拉列表中会自动出现"Bing 搜索"选项，点击即可使用 Bing 搜索站内内容。

### 链接重定向

当浏览 V2EX 页面时，点击任何指向 v2ex.com 的链接会自动跳转到 global.v2ex.co 对应页面。

### 关闭重定向

点击浏览器工具栏中的扩展图标，在弹出窗口中关闭「自动将 v2ex.com 链接重定向到 global.v2ex.co」开关即可。

## 权限说明

- `storage`：用于保存用户设置（链接重定向功能的开关状态）
- `content_scripts`：在 V2EX 和 Bing 页面中注入脚本以实现功能

## 项目结构

```
├── manifest.json    # 扩展配置文件
├── content.js       # 内容脚本，实现搜索增强和链接重定向
├── popup.html       # 弹窗页面
├── popup.js         # 弹窗逻辑
├── popup.css        # 弹窗样式
└── icons/           # 扩展图标
```

## 技术栈

- Manifest V3
- 原生 JavaScript
- CSS3