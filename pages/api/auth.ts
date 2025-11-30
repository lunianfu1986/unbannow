// pages/api/auth.ts
// 关闭这个文件的 TypeScript 检查，避免类型不匹配的问题
// @ts-nocheck

import { createVercelBeginHandler } from 'netlify-cms-oauth-provider-node'

// 使用环境变量（OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET / COMPLETE_URL / ORIGIN）
const handler = createVercelBeginHandler({}, { useEnv: true })

export default function auth(req, res) {
  return handler(req, res)
}
