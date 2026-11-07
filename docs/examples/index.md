# 示例站

这一组页面把组件组合成真实界面，全部示例与文档同源渲染，构建后随文档站一起静态部署。

- [登录表单](/examples/login)：Form 校验、Input、Checkbox 与错误提示。
- [数据列表](/examples/data-table)：Table 排序、Select 筛选与 Pagination。
- [设置页](/examples/settings)：Tabs、Switch、Select 与保存反馈。

## 本地运行

```bash
pnpm docs:dev    # 文档站 + 示例站
pnpm docs:build  # 产出 docs/.vitepress/dist
```

构建产物是纯静态文件，可直接放到任意静态服务器或对象存储。
