# V2EX 国内体验增强浏览器插件 Spec

## Why
V2EX 是一个知名的技术社区，但在国内访问 `v2ex.com` 域名时经常遇到网络问题。用户通常使用 `global.v2ex.co` 镜像站点访问，但该镜像站点的搜索功能仅支持 Google，且点击站内链接时会跳转到原始域名导致访问失败。

## What Changes
- 在 `global.v2ex.co` 搜索框添加 Bing 搜索选项，支持 `site:v2ex.com` 站内搜索
- 自动将 `v2ex.com` 链接重定向到 `global.v2ex.co`，确保链接可正常访问
- 提供插件设置页面，允许用户控制链接重定向功能的开关

## Impact
- Affected code: 浏览器插件的 content script、background script、popup 页面

## ADDED Requirements

### Requirement: Bing 站内搜索
The system SHALL provide a Bing search option on `global.v2ex.co` search box.

#### Scenario: 用户使用 Bing 搜索
- **WHEN** 用户在 `global.v2ex.co` 页面点击搜索框输入关键词
- **THEN** 显示 Bing 搜索选项，点击后在新标签页打开 Bing 搜索结果（格式：`site:v2ex.com keyword`）

### Requirement: 链接重定向
The system SHALL automatically redirect `v2ex.com` links to `global.v2ex.co`.

#### Scenario: 用户点击 v2ex.com 链接
- **GIVEN** 链接重定向功能已开启
- **WHEN** 用户点击指向 `v2ex.com` 的链接
- **THEN** 链接被重定向到 `global.v2ex.co`（路径部分保持不变）

#### Scenario: 用户关闭重定向功能
- **GIVEN** 链接重定向功能已关闭
- **WHEN** 用户点击指向 `v2ex.com` 的链接
- **THEN** 链接保持原样，不做重定向

### Requirement: 插件设置页面
The system SHALL provide a settings page for the extension.

#### Scenario: 用户配置重定向开关
- **WHEN** 用户打开插件设置页面
- **THEN** 显示链接重定向功能的开关选项
- **AND** 用户的设置被持久化保存
