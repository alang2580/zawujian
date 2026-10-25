# 杂物间 PARTS BIN

个人网站：工具推荐（藏品）、自制作品（车间）、长文（笔记）。
技术栈 Astro 7 + Markdown，纯静态输出，不需要服务器和数据库。

> **怎么读这份文档**：用 VS Code 打开本文件，按 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd> 可以看排版后的效果。
> 直接双击打开的话是纯文本，也能看，只是表格和代码块不会上色。

---

## 一、启动

项目位置：`C:\Users\19188\Desktop\web`

按下面五步走，每一步都写了「会看到什么」。对不上就是没成功，去第三节的报错对照表里查。

### 第 1 步 · 打开终端并进入项目目录

方式一（最省事）：打开文件资源管理器，进到 `C:\Users\19188\Desktop\web`，
在顶部地址栏里输入 `cmd` 然后回车。会弹出一个黑色窗口，路径已经在项目里了。

方式二：在 VS Code 里打开这个文件夹，按 <kbd>Ctrl</kbd> + <kbd>反引号</kbd>（Esc 下面那个键）。

如果终端窗口的路径不是项目目录，手动进去：

```bash
cd C:\Users\19188\Desktop\web
```

> 上面这条命令在 CMD 和 PowerShell 里都能用。
> 只有当你当前在**别的盘**（比如 D 盘）时才需要换成 CMD 的写法：`cd /d C:\Users\19188\Desktop\web`

**成功的样子：** 提示符变成 `C:\Users\19188\Desktop\web>`

### 第 2 步 · 确认 Node.js 版本够用

```bash
node -v
```

**成功的样子：** 输出 `v22.22.0` 或更高（例如 `v24.16.0`）。

Astro 7 硬性要求 Node ≥ 22.22.0，低于这个版本会在启动时报错。
如果提示 `'node' 不是内部或外部命令`，说明没装 Node.js，去 https://nodejs.org 下载 LTS 版安装。

### 第 3 步 · 安装依赖（只做一次）

```bash
npm install
```

**成功的样子：** 输出末尾有一行 `added 200 packages in 1m` 之类。
这一步要联网，第一次大约 1 分钟，之后再启动就不用做了。

### 第 4 步 · 启动

```bash
npm run dev
```

**成功的样子：** 终端出现下面这几行，并且光标停在那里不动（窗口不会自己关）：

```
> zawujian@0.1.0 dev
> astro dev

 astro  v7.4.0 ready in 3831 ms
┃ Local    http://localhost:4321/
┃ Network  use --host to expose
15:25:41 watching for file changes...
```

只要看到 `ready` 和 `Local http://localhost:4321/` 这两行，就是起来了。

### 第 5 步 · 打开浏览器

在浏览器地址栏输入：

```
http://localhost:4321
```

**成功的样子：** 出现首页，顶部一条黑色滚动条，下面是「用过三个月，才敢写下来。」

改任何文件保存后，浏览器会自己刷新，不用重启。

---

## 二、怎么关掉

回到那个终端窗口，按 <kbd>Ctrl</kbd> + <kbd>C</kbd>。

**成功的样子：** 终端回到 `C:\Users\19188\Desktop\web>` 提示符，说明服务已停。

也可以另开一个终端执行：

```bash
npx astro dev stop
```

**注意：** `npm run dev` 启动的是一个临时服务器，只在你这个窗口开着时有效。
关掉窗口或电脑重启后网站就没了，要重新执行第 4 步。
想让网站长期在线，得部署出去（见第七节）。

---

## 三、报错对照表

启动时对不上上面「成功的样子」，在这张表里找你的报错：

| 终端里的提示 | 原因 | 怎么办 |
|---|---|---|
| `'npm' 不是内部或外部命令` | 没装 Node.js，或装了没重启终端 | 装 Node.js LTS，然后关掉终端重开 |
| `Cannot find module 'astro'` | 依赖没装 | 执行 `npm install` |
| `Another astro dev server is already running` | 已经有一个服务在跑，Astro 7 不允许开第二个 | 直接打开 `http://localhost:4321`；想换新的先 `npx astro dev stop` |
| `Port 4321 is in use` | 端口被上次没关干净的进程占着 | `npx astro dev stop`，或换端口 `npm run dev -- --port 4322` |
| `You are using Node.js xx. Astro requires Node.js 22.22.0 or higher` | Node 版本太旧 | 去 nodejs.org 装新版，装完重开终端再用 `node -v` 确认 |
| 浏览器打开是白页 | 首次启动要编译，或者服务已经停了 | 等 3 秒刷新；还白就回终端看有没有 `Local http://...` 那行 |
| 页面上所有内容都不见了 | 滚动动效没触发（极少见） | 强制刷新 <kbd>Ctrl</kbd> + <kbd>F5</kbd> |


## 四、发一篇内容

不用手动建文件，用命令生成：

```bash
npm run new -- tools raycast "Raycast"
npm run new -- notes why-no-nav "为什么这个站不做导航"
npm run new -- lab bookmark-export "书签导出器"
```

三个参数分别是：板块、slug（英文小写）、标题。

生成的文件默认是 `draft: true`，**不会出现在站点上**。
写完把 draft 改成 `false` 才会发布。

`draft: true` 这个设计是有意的：让你可以边写边存，不怕半成品被看到。

## 五、目录在哪

| 位置 | 放什么 |
|---|---|
| `src/content/tools/*.md` | 藏品，一条一个文件 |
| `src/content/notes/*.md` | 笔记 |
| `src/content/lab/*.md` | 车间作品 |
| `src/consts.ts` | 站名、导航、评论配置 |
| `src/content.config.ts` | 每个板块的字段定义与校验规则 |
| `src/styles/global.css` | 配色变量、字体、正文排版 |
| `docs/ROUTES.md` | 路由规范，加页面前先读 |
| `design-draft/index.html` | 最初的设计稿，留作视觉参考 |

## 六、评论怎么接通

现在评论区是**未配置状态**，本地开发时会显示一段提示，正式站点上不会显示任何东西。

接通需要三步：

1. 在 GitHub 建一个**公开**仓库，专门存评论，例如 `yourname/zawujian-comments`
2. 给这个仓库安装 giscus App：https://github.com/apps/giscus
3. 打开 https://giscus.app/zh-CN ，填入仓库名，页面下方会生成配置代码，
   把里面的 `data-repo` / `data-repo-id` / `data-category-id` 三个值抄进
   `src/consts.ts` 的 `GISCUS` 里

填完刷新页面，评论区就出现了。

**代价说清楚**：读者要评论必须登录 GitHub 账号。如果这点不能接受，
换成 Waline（需要自己部署一个免费云函数，比 Giscus 麻烦）。

## 七、构建与发布

```bash
npm run build     # 产物输出到 dist/
npm run preview   # 本地预览构建后的结果
```

上线时把项目推到 GitHub，在 Cloudflare Pages 里连上仓库，
构建命令填 `npm run build`，输出目录填 `dist`，以后每次 push 自动更新。

买了域名之后，改 `astro.config.mjs` 里的 `site` 那一行即可。

## 八、内嵌的应用怎么更新

`/lab/memovid` 这个作品页里嵌了一个能直接用的工具（照片转视频）。
它不是这个项目的代码，是开源项目 [Hilichiu/memovid](https://github.com/Hilichiu/memovid)
构建好之后放进 `public/lab/memovid-app/` 的。

**它怎么被挂上去的**

`src/content/lab/memovid.md` 里有两行关键字段：

```yaml
embedUrl: /lab/memovid-app/index.html   # 打包产物入口
embedHeight: 1170px                    # iframe 高度，按实际内容量出来的
```

详情页看到 `embedUrl` 就会在正文上方渲染 iframe。删掉这两行，内嵌区就消失，不影响其它页面。

**要改这个工具怎么办**

源码放在 `.workbuddy/vendor/memovid/`（不进构建，只是个工作副本）。改了之后三步：

```bash
cd .workbuddy/vendor/memovid
npm install          # 第一次才需要
npm run build
```

然后把 `dist/` 里的东西覆盖到 `public/lab/memovid-app/`，再回项目根目录 `npm run build`。

**三个容易被忘的本地改动**（都在 vendor 目录里，别被原仓库覆盖）

1. `vite.config.ts` 的 `base` 必须是 `/lab/memovid-app/`，原值是给 GitHub Pages 用的 `/memovid/`
2. `index.html` 的 favicon 用 `%BASE_URL%icon.png`，写成绝对路径会 404
3. `src/i18n/translations.json` 加了 `zh-CN` 简体包，默认语言在 `src/hooks/useTranslation.ts` 里

**上线前必须知道的限制**

`public/lab/memovid-app/assets/` 里那个 `ffmpeg-core-*.wasm` 是 **32MB 单文件**。
Cloudflare Pages 单个文件上限是 25 MiB，直接传大概率会被拒。
真上线时的处理办法：把这个 wasm 挪到对象存储（R2 / S3）或别的域名下，
再改应用里加载编码器的路径；或者换一个单文件限制更宽松的托管。

另外这个版本是**单线程** FFmpeg，产物里没有 `SharedArrayBuffer`，
所以不需要配置 COOP/COEP 跨源隔离响应头 —— 这点已经查过，不用再折腾。

## 九、三条不能破的规矩

1. 一级路径只放内容类型，永远英文复数名词（`/tools` `/notes` `/lab`）
2. 已发布的 URL 不改，要改就登记 301 重定向
3. 新增页面前先问：里面会不会装一堆同质条目？不会就归到已有板块

详细规则见 `docs/ROUTES.md`。
