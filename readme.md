# A chrome extension for web developing features a grid line on web page.

Based on Vue, Jquery, lodash.

提供一个类似于PS辅助线功能的Chrome扩展工具，方便前端开发或设计人员在网页上创建参考线。

### 功能

+ 创建辅助线，快捷键 N
+ 位置信息， 获取当前窗口以及鼠标坐标的信息，快捷键 I
+ 辅助线之间距离，点击已创建辅助线，选中，鼠标移动到另一辅助线上。
+ 删除选中辅助线， 快捷键 Delete
+ 隐藏所有辅助线，快捷键 H
+ 清空所有辅助线，快捷键 C

### Build

```javascript
npm install
gulp js
```

### Usage

+ Chrome -> 更多工具 -> 扩展程序 -> 拖入 dist.ctx，或点击"加载已解压的扩展程序" 选择 dist 目录
+ 通过 [Webstore](https://chrome.google.com/webstore/detail/measuring/cibkjdgbiinfkjoikhmnjpcoidgfafob?utm_source=chrome-ntp-icon) 安装

Screenshot

![Screenshot](screenshot.png)