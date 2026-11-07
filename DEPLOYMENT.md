# 部署说明

文档站与示例站共用同一份静态产物：

```bash
pnpm docs:build
# 产物目录
docs/.vitepress/dist
```

产物为纯静态文件，不依赖 Node 运行时。

## 方案 A：现有服务器的子目录

以部署到 `https://example.com/ui/` 为例：

1. 修改 `docs/.vitepress/config.ts` 的 `base`：

   ```ts
   export default defineConfig({
     base: '/ui/',
     // ...
   })
   ```

2. 重新构建：`pnpm docs:build`。
3. 把 `docs/.vitepress/dist/` 的内容上传到服务器站点根目录下的 `ui/`。

Nginx 参考：

```nginx
location /ui/ {
    alias /var/www/vakao-ui/;
    try_files $uri $uri.html $uri/ /ui/index.html;
}
```

VitePress 已开启 `cleanUrls`，`/ui/components/button` 需要映射到 `components/button.html`，`try_files` 中的 `$uri.html` 即用于此。

## 方案 B：独立静态托管

适用于对象存储、静态托管平台或独立域名：

- 上传 `docs/.vitepress/dist/` 全部内容。
- 开启 SPA 回退：未命中的路径返回 `index.html`。
- 若使用独立域名或 HTTPS 证书，需要域名与证书管理员配合，本仓库不包含相关配置。

## 校验

```bash
npx serve docs/.vitepress/dist   # 任意静态服务器均可
```

检查以下页面：

- `/` 首页
- `/components/table`
- `/examples/login`
- `/guide/theming`（亮 / 暗主题切换）

## 版本对应

文档站产物与 `@vakao/ui` 版本一一对应。发布新版本时重新构建并整体替换产物，避免文档与包版本不一致。
