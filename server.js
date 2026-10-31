// 引入 Node.js 原生模块（零第三方依赖，无需 npm install）
const http = require('http');
const fs = require('fs');
const path = require('path');

// 服务器监听端口
const PORT = process.env.PORT || 3000;

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  // 解析请求路径（去掉查询字符串）
  const urlPath = req.url.split('?')[0];

  // 1) 访问首页：返回页面
  if (urlPath === '/' || urlPath === '/index.html') {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, 'utf8', (err, html) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('服务器读取页面文件出错：' + err.message);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    });
    return;
  }

  // 2) 访问 /time：返回当前服务器时间（JSON），供页面实时刷新
  if (urlPath === '/time') {
    const now = new Date();
    const timeStr = now.toLocaleString('zh-CN', { hour12: false });
    const body = JSON.stringify({
      time: timeStr,
      iso: now.toISOString()
    });
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(body);
    return;
  }

  // 3) 其他路径：404
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found');
});

// 启动服务器
server.listen(PORT, () => {
  console.log('服务器已启动：http://localhost:' + PORT);
  console.log('按 Ctrl + C 可停止服务器');
});
