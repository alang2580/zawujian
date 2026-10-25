/**
 * 内容集合定义（Astro 7 写法：loader + schema）
 *
 * 这里的 zod schema 是「字段校验闸门」：
 * 任何一篇文章的 frontmatter 缺字段、类型写错、日期格式不对，
 * 构建会直接失败并指出是哪个文件，脏数据进不了线上。
 *
 * 新增板块时照抄一份：换 loader 的 base 路径、换 schema 字段，
 * 然后在 src/pages/<板块名>/ 建列表页和详情页即可。
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 藏品：网站、应用、软件推荐
 * 核心是「五段式」—— 解决什么问题、用了多久、坑在哪、什么时候别用、替代品是谁。
 * 这五个字段都是必填，写不出来说明这条还不值得推荐。
 */
const tools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tools' }),
  schema: z.object({
    title: z.string(),
    /** 分类，用于列表页筛选：效率 / 开发 / 设计 / 系统 / 笔记 */
    category: z.string(),
    /** 一句话结论，列表页和首页卡片显示 */
    summary: z.string(),
    /** 它解决什么问题 */
    problem: z.string(),
    /** 用了多久 —— 没有真实使用时长的推荐不值得写 */
    usedFor: z.string(),
    /** 坑在哪，没人主动告诉你的那部分 */
    pitfall: z.string(),
    /** 什么情况下别用它 */
    skipWhen: z.string(),
    /** 替代品是谁 */
    alternative: z.string(),
    /** 评分 1–5，允许小数 */
    score: z.number().min(1).max(5),
    /** 官网或下载地址 */
    url: z.url(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    /** 草稿：true 时不会出现在任何列表里 */
    draft: z.boolean().default(false),
  }),
});

/**
 * 笔记：长文、踩坑复盘、年度小结
 */
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

/**
 * 车间：自己做的工具与创意网页
 */
const lab = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lab' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    /** 用了什么技术，列表页显示成小标签 */
    tech: z.string(),
    /** 作品编号，显示成 NO.01 */
    no: z.string(),
    /** 在线试用地址，没有就留空 */
    demoUrl: z.url().optional(),
    /** 源码地址，没有就留空 */
    repoUrl: z.url().optional(),
    /**
     * 内嵌运行地址（站点内的相对路径）。
     * 填了之后详情页会在正文上方渲染一个 iframe，工具直接在页面里跑。
     * 适用于打包好的独立应用放在 public/ 下的情况。
     */
    embedUrl: z.string().optional(),
    /** iframe 高度，不填默认 820px */
    embedHeight: z.string().optional(),
    publishedAt: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { tools, notes, lab };
