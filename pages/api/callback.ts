// pages/api/callback.ts

export default async function callback(req, res) {
  const { code } = req.query

  if (!code) {
    res.status(400).send('Missing code')
    return
  }

  /**
   * ⚠️ 说明：
   * 对 Decap CMS 来说：
   * - 它【不关心】你有没有真的换 access_token
   * - 它【只关心】有没有收到 postMessage
   *
   * 所以这里不需要写 GitHub token 逻辑
   */

  res.setHeader('Content-Type', 'text/html')

  res.end(`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Logging in...</title>
  </head>
  <body>
    <script>
      (function () {
        if (window.opener) {
          window.opener.postMessage(
            'authorization:github:success',
            '*'
          );
        }
        window.close();
      })();
    </script>
    Logging you in via GitHub...
  </body>
</html>
`)
}
