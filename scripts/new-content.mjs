#!/usr/bin/env node
/**
 * 新建一条内容
 *
 * 用法：
 *   npm run new -- tools raycast "Raycast"
 *   npm run new -- notes why-no-nav "为什么这个站不做导航"
 *   npm run new -- lab bookmark-export "书签导出器"
 *
 * 三个参数依次是：板块名、slug（英文小写）、标题（可以带空格，用引号包起来）。
 * 生成的文件默认 draft: true，写完把 draft 改成 false 才会出现在站点上。
 */

import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// ---------- 三个板块的模板 ----------
const templates = {
  tools: (title, date) => `---
title: ${title}
category: 效率
summary: （一句话结论，列表页会显示这句）
problem: （它解决什么问题）
usedFor: （你实际用了多久，例如：3 个月）
pitfall: （坑在哪，别人不会主动告诉你的那部分）
skipWhen: （什么情况下别用它）
alternative: （替代品是谁）
score: 3
url: https://example.com
publishedAt: ${date}
tags: []
draft: true
---

## 正文

（这里写正文。上面五段是速览，这里展开讲细节。）
`,

  notes: (title, date) => `---
title: ${title}
summary: （一句话说明这篇在讲什么）
publishedAt: ${date}
tags: []
draft: true
---

（正文从这里开始。）
`,

  lab: (title, date) => `---
title: ${title}
summary: （一句话说明这个工具做什么）
tech: HTML
no: "01"
publishedAt: ${date}
draft: true
---

（说明它怎么用、为什么做它。）
`,
};

// ---------- 参数解析与校验 ----------
const [, , section, slug, ...titleParts] = process.argv;
const title = titleParts.join(' ');

if (!section || !slug || !title) {
  console.error(`
用法：npm run new -- <板块> <slug> <标题>

  npm run new -- tools raycast "Raycast"
  npm run new -- notes why-no-nav "为什么这个站不做导航"
  npm run new -- lab bookmark-export "书签导出器"

板块只能是：tools / notes / lab
slug 只能用小写字母、数字和连字符
`);
  process.exit(1);
}

if (!templates[section]) {
  console.error(`板块 "${section}" 不存在。可选：${Object.keys(templates).join(' / ')}`);
  process.exit(1);
}

// slug 必须是英文小写 + 连字符，否则生成的 URL 会很难看
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error(`slug "${slug}" 不合法。只能用小写字母、数字、连字符，例如 raycast-vs-alfred`);
  process.exit(1);
}

const dir = join(root, 'src', 'content', section);
const file = join(dir, `${slug}.md`);

if (existsSync(file)) {
  console.error(`文件已存在，没有覆盖：${file}`);
  process.exit(1);
}

if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const date = new Date().toISOString().slice(0, 10);
writeFileSync(file, templates[section](title, date), 'utf8');

console.log(`
已创建：src/content/${section}/${slug}.md

接下来：
  1. 打开这个文件，把括号里的占位内容换成真实内容
  2. 写完把 frontmatter 里的 draft: true 改成 false
  3. 本地预览：npm run dev  然后打开 http://localhost:4321/${section}/${slug}
`);
