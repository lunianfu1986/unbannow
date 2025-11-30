// pages/api/auth.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createVercelBeginHandler } from 'netlify-cms-oauth-provider-node'

const handler = createVercelBeginHandler({}, { useEnv: true })

export default function auth(req: VercelRequest, res: VercelResponse) {
  return handler(req, res)
}
