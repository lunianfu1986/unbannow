// pages/api/auth.ts

export default function auth(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID

  if (!clientId) {
    res.status(500).send('Missing GITHUB_CLIENT_ID')
    return
  }

  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/callback`

  const githubAuthUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=repo`

  res.redirect(githubAuthUrl)
}
