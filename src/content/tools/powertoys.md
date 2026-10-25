---
title: PowerToys
category: 系统
summary: 微软官方出的 Windows 增强工具集，装一个顶一堆小软件。
problem: Windows 本身缺少窗口分屏模板、批量重命名、屏幕取色这些基础能力。
usedFor: 重装系统后第一批装的东西（改成你的实际情况）
pitfall: 模块多，全开会拖慢开机；它偶尔会和新版 Windows 的输入法打架。
skipWhen: 你现在电脑已经在卡，再加常驻组件只会更卡，先解决卡的问题。
alternative: 单个功能各有替代，比如窗口布局可以用 AquaSnap
score: 4.3
url: https://github.com/microsoft/PowerToys
publishedAt: 2026-10-14
tags: [Windows, 效率, 官方]
draft: false
---

## 我只开这四个模块

模块很多，但常驻后台的东西不是越多越好。下面四个是我留着一直开的：

- **FancyZones**：把窗口拖到自定义区域就自动吸附，比系统自带的分屏灵活。
- **PowerRename**：批量改名支持正则，改一百个文件名一次搞定。
- **Color Picker**：按快捷键取屏幕上任何一个像素的颜色值。
- **Text Extractor**：框选屏幕任意区域，把里面的文字抠出来复制。

其余模块按需再开，不用预先全打开。

## 一个容易被忽略的点

它会随系统启动常驻。如果哪天发现开机变慢，第一件事是去它的设置里关掉不用的模块，
而不是去猜是哪个软件在拖后腿。
