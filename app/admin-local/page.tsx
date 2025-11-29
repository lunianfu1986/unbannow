'use client'

import { useState, useMemo } from 'react'
import type { Metadata } from 'next'

// 注意：Metadata 只能在 server 组件里导出，这里只是给你展示思路。
// 真正的 metadata 要在 app/admin-local/route.ts 或 layout.tsx 那一级写。
// 为了简单，你可以先只用“不在导航里出现”这层保护。

const GAME_OPTIONS = [
  { label: 'Escape from Tarkov', value: 'escape-from-tarkov' },
  { label: 'Counter-Strike 2', value: 'counter-strike-2' },
  { label: 'Apex Legends', value: 'apex-legends' },
  { label: 'Fortnite', value: 'fortnite' },
  { label: 'Destiny 2', value: 'destiny-2' },
  { label: 'Genshin Impact', value: 'genshin-impact' },
  { label: 'War Thunder', value: 'war-thunder' },
  { label: 'Rainbow Six Siege', value: 'rainbow-six-siege' },
  { label: 'FIFA / FC 25', value: 'fc-25' },
]

const CATEGORY_OPTIONS = [
  { label: 'News', value: 'News' },
  { label: 'Guides', value: 'Guides' },
  { label: 'Reviews', value: 'Reviews' },
  { label: 'Esports', value: 'Esports' },
]

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // 空格 -> -
    .replace(/[^a-z0-9-]/g, '') // 去掉非字母数字和-
}

function calcReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

export default function AdminLocalPage() {
  const today = useMemo(
    () => new Date().toISOString().slice(0, 10),
    []
  )

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [date, setDate] = useState(today)
  const [category, setCategory] = useState('Guides')
  const [game, setGame] = useState('escape-from-tarkov')
  const [tagsInput, setTagsInput] = useState('Escape from Tarkov, Ban Appeal')
  const [excerpt, setExcerpt] = useState('')
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200'
  )
  const [author, setAuthor] = useState('UnbanNow Team')
  const [type, setType] = useState('Guide')
  const [body, setBody] = useState('')

  // 当标题变化时，如果 slug 还没手动改过，就自动生成
  function handleTitleChange(val: string) {
    setTitle(val)
    if (!slug) {
      setSlug(slugify(val))
    }
  }

  const readTime = useMemo(() => calcReadTime(body), [body])

  const tags = useMemo(
    () =>
      tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    [tagsInput]
  )

  const markdown = useMemo(() => {
    const frontmatterLines: string[] = []

    frontmatterLines.push('---')
    if (title) frontmatterLines.push(`title: "${title.replace(/"/g, '\\"')}"`)
    if (slug) frontmatterLines.push(`slug: "${slug}"`)
    if (date) frontmatterLines.push(`date: "${date}"`)
    if (excerpt)
      frontmatterLines.push(
        `excerpt: "${excerpt.replace(/"/g, '\\"')}"`
      )
    if (category) frontmatterLines.push(`category: "${category}"`)
    if (game) frontmatterLines.push(`game: "${game}"`)
    if (type) frontmatterLines.push(`type: "${type}"`)
    if (coverImage)
      frontmatterLines.push(`coverImage: "${coverImage}"`)
    if (author)
      frontmatterLines.push(`author: "${author.replace(/"/g, '\\"')}"`)
    if (readTime) frontmatterLines.push(`readTime: "${readTime}"`)

    if (tags.length > 0) {
      frontmatterLines.push('tags:')
      tags.forEach((t) => {
        frontmatterLines.push(`  - ${t}`)
      })
    }

    frontmatterLines.push('---')
    frontmatterLines.push('')

    const fm = frontmatterLines.join('\n')
    const content = body || '# 在这里写正文内容（Markdown）\n'

    return `${fm}${content}\n`
  }, [title, slug, date, excerpt, category, game, type, coverImage, author, readTime, tags, body])

  function handleCopy() {
    navigator.clipboard
      .writeText(markdown)
      .catch((err) => {
        console.error('复制失败', err)
      })
  }

  function handleDownload() {
    const filename = slug || 'unbannow-post'
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    URL.revokeObjectURL(url)
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">
        内部工具：UnbanNow 文章生成器（只生成 .md 文件，不直接发布）
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        在这里像后台一样填写文章信息，右侧会自动生成带 frontmatter 的 Markdown。
        复制或下载 .md 文件后，放入 <code>content/posts</code> 目录，再提交到 GitHub 即可发布。
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 左侧表单 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">标题（title）</label>
            <input
              className="w-full border rounded-md px-3 py-2 text-sm"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="例如：Escape from Tarkov 误封申诉完整指南"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Slug（文件名）</label>
              <input
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="escape-from-tarkov-ban-appeal-guide"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">日期（date）</label>
              <input
                type="date"
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">分类（category）</label>
              <select
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">游戏（game）</label>
              <select
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={game}
                onChange={(e) => setGame(e.target.value)}
              >
                {GAME_OPTIONS.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              标签（tags，逗号分隔）
            </label>
            <input
              className="w-full border rounded-md px-3 py-2 text-sm"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Escape from Tarkov, Ban Appeal, Account Recovery"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">摘要（excerpt）</label>
            <textarea
              className="w-full border rounded-md px-3 py-2 text-sm"
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="一段 1–2 句话的简短摘要，会用在列表页、SEO 描述等位置。"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              封面图链接（coverImage）
            </label>
            <input
              className="w-full border rounded-md px-3 py-2 text-sm"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">作者（author）</label>
              <input
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">类型（type）</label>
              <input
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Guide / News / Review 等"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              正文（Markdown body）
              <span className="ml-2 text-xs text-gray-500">
                预估阅读时间：{readTime}
              </span>
            </label>
            <textarea
              className="w-full border rounded-md px-3 py-2 text-sm font-mono"
              rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="# 标题\n\n在这里写正文内容，支持 Markdown。"
            />
          </div>
        </div>

        {/* 右侧生成的 Markdown */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold">生成的 Markdown (.md 文件内容)</h2>
            <div className="space-x-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1 text-xs border rounded-md hover:bg-gray-50"
              >
                复制 Markdown
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1 text-xs border rounded-md hover:bg-gray-50"
              >
                下载 .md 文件
              </button>
            </div>
          </div>
          <textarea
            className="w-full h-full border rounded-md px-3 py-2 text-xs font-mono"
            value={markdown}
            readOnly
          />
        </div>
      </div>
    </main>
  )
}
