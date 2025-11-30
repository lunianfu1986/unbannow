// pages/api/callback.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createVercelCompleteHandler } from 'netlify-cms-oauth-provider-node'

const handler = createVercelCompleteHandler({}, { useEnv: true })

export default function callback(req: VercelRequest, res: VercelResponse) {
  return handler(req, res)
}
