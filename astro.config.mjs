// @ts-check
/**
 * Astro 配置
 * 这个文件决定构建方式、站点地址、以及 URL 变更时的重定向表。
 */
import { defineConfig } from 'astro/config';

export default defineConfig({
  // 站点根地址。现在还没买域名，先留占位。
  // 买了域名之后只改这一行，RSS、sitemap 里的绝对地址会全部跟着变。
  site: 'https://zawujian.pages.dev',

  // 目录式输出：/tools/xxx 会生成 tools/xxx/index.html
  // 好处是部署到任何静态托管都不需要额外配置
  build: {
    format: 'directory',
  },

  // ============================================================
  // 301 重定向表
  // 任何已发布 URL 需要修改时，在这里登记旧地址 -> 新地址。
  // 这是 docs/ROUTES.md 里「铁律二」的执行位置。
  //
  // 例：'/old-path': '/new-path'
  // ============================================================
  redirects: {},
});
