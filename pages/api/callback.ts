// pages/api/callback.ts
// @ts-nocheck

import { createVercelCompleteHandler } from 'netlify-cms-oauth-provider-node'

const handler = createVercelCompleteHandler({}, { useEnv: true })

export default function callback(req, res) {
  return handler(req, res)
}
