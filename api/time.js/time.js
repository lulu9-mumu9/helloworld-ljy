// Vercel Serverless 函数：处理 /time 接口
// Vercel 会把 api/ 目录下每个 .js 文件作为一个无服务器函数
// 必须导出 handler 函数（不能使用 server.listen()）

module.exports = (req, res) => {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const now = new Date();
  const timeStr = now.toLocaleString('zh-CN', { hour12: false });
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.statusCode = 200;
  res.end(JSON.stringify({ time: timeStr, iso: now.toISOString() }));
};
