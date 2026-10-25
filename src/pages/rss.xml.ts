/**
 * RSS 订阅源
 * 输出 /rss.xml，导航栏的「订阅更新」指向这里。
 * 三类内容合并按时间倒序，读者用一个阅读器就能跟进全部更新。
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../consts';

export async function GET(context: APIContext) {
  const tools = await getCollection('tools', ({ data }) => !data.draft);
  const notes = await getCollection('notes', ({ data }) => !data.draft);
  const lab = await getCollection('lab', ({ data }) => !data.draft);

  const items = [
    ...tools.map((t) => ({
      title: t.data.title,
      description: t.data.summary,
      pubDate: t.data.publishedAt,
      // directory 输出格式，链接结尾带斜杠
      link: `/tools/${t.id}/`,
    })),
    ...lab.map((l) => ({
      title: l.data.title,
      description: l.data.summary,
      pubDate: l.data.publishedAt,
      link: `/lab/${l.id}/`,
    })),
    ...notes.map((n) => ({
      title: n.data.title,
      description: n.data.summary,
      pubDate: n.data.publishedAt,
      link: `/notes/${n.id}/`,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: `${SITE.name} ${SITE.nameEn}`,
    description: SITE.description,
    site: context.site ?? 'https://example.com',
    items,
    customData: '<language>zh-CN</language>',
  });
}
