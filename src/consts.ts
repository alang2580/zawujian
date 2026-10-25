/**
 * 全站常量
 * 站名、导航、评论配置都集中在这里。
 * 改名或调整导航只动这个文件，不用去翻各个页面。
 */

export const SITE = {
  /** 中文站名 */
  name: '杂物间',
  /** 英文副名，排版上用 */
  nameEn: 'PARTS BIN',
  /** 一句话描述，用于首页和 SEO */
  description: '我试过的工具、我自己做的东西、以及我踩过的坑。每条推荐都写清什么情况下别用。',
  /** 建站年份 */
  since: 2026,
  /** 期号显示在首屏右上角，格式：期号 + 年月 */
  issue: '001',
  /** 邮箱，留空则不显示联系入口 */
  email: 'hello@example.com',
} as const;

/**
 * 导航项
 * 新增板块时在这里加一项，导航会自动多出入口。
 * 顺序就是显示顺序，不要超过 5 项，多了会挤。
 */
export const NAV = [
  { label: '藏品', href: '/tools' },
  { label: '车间', href: '/lab' },
  { label: '笔记', href: '/notes' },
  { label: '关于', href: '/about' },
] as const;

/**
 * Giscus 评论配置
 *
 * 怎么拿到这四个 ID：
 * 1. 在 GitHub 建一个公开仓库，例如 yourname/zawujian-comments
 * 2. 给仓库安装 giscus App：https://github.com/apps/giscus
 * 3. 打开 https://giscus.app/zh-CN ，填入仓库名
 * 4. 页面下方会生成一段配置代码，把 repo / repoId / categoryId 抄到这里
 *
 * 四个值没填全时，评论区不会渲染，页面上什么都不显示（不会出现空白框）。
 */
export const GISCUS = {
  repo: '',          // 形如 'yourname/zawujian-comments'
  repoId: '',        // 形如 'R_kgDOxxxxxxx'
  category: 'Announcements',
  categoryId: '',    // 形如 'DIC_kwDOxxxxxxxx'
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  inputPosition: 'top',
  lang: 'zh-CN',
} as const;

/** 判断评论是否已经配置好 */
export const isGiscusReady = Boolean(GISCUS.repo && GISCUS.repoId && GISCUS.categoryId);
