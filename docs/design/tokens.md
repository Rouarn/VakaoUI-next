# 设计令牌

令牌来自品牌视觉资源（色板、字体、圆角、间距、四色星）与 `src/tokens/{brand,theme}.json` 两个文件。组件不允许写死颜色，只能消费 `--vk-*`。

## 颜色

<SwatchGrid
  :items="[
    { name: 'paper', value: '#F3F1EC', note: '主背景' },
    { name: 'raised', value: '#FAF9F5', note: '卡片 / 浮层' },
    { name: 'ink', value: '#171512', note: '主文字' },
    { name: 'muted', value: '#57524A', note: '次级文字' },
    { name: 'faint', value: '#736D62', note: '注释 / HUD' },
    { name: 'accent', value: '#C43A21', note: '朱砂 · 强调色' },
    { name: 'orange', value: '#F0995F', note: '四色星 · 上' },
    { name: 'blue', value: '#5FBEDC', note: '四色星 · 右' },
    { name: 'purple', value: '#A27FC2', note: '四色星 · 下' },
    { name: 'yellow', value: '#EDDF55', note: '四色星 · 左' }
  ]"
/>

### 强调色变更说明

品牌原始 accent 是 `#46A6C6`，饱和度只有 53%，作为实心按钮时白字对比度 2.65:1、作为纸面文字 2.47:1，都不满足 AA。早期版本先改成了低饱和的潮汐青 `#0B6F86`，解决了对比度，但视觉上偏灰、偏冷，与纸面 / 四色星的气质脱节。

当前 0.1.0 改为**朱砂 `#C43A21`**：从品牌橙 `#F0995F` 出发，把色相往红移约 12°、饱和度提到 74%、明度压到 44%，得到有活力、够醒目的暖色强调。取色理由：

- **有温度**：`#C43A21` 与纸面 `#F3F1EC` 同属暖调，放在一起像朱砂印在纸上，而不是冷色 UI 贴在米色背景上。
- **够醒目但面积小**：只用于实心按钮、选中态、focus ring、链接。大面积仍是纸色与墨色，强调色出现得少才响。
- **双项过 AA**：对纸面 4.68:1、白字压在上面 5.03:1，正文与按钮文字都达标。
- **与四色星协调**：朱砂是橙的深色延伸，与 warning 橙同族但明度差足够大（L 44% vs 75%），不会混淆；与 info 蓝形成冷暖对照。
- **暗色可提亮**：暗色下换成 `#FF8A5B`，对深底 8.07:1，按钮改用深墨文字 `#171210`（8.00:1）。

| 候选                 | 色值      | 白字 / 按钮 | 纸面文字 | 结论                     |
| -------------------- | --------- | ----------- | -------- | ------------------------ |
| 朱砂（采用）         | `#C43A21` | 5.03        | 4.68     | 双项过 AA，暖调最贴纸面  |
| 朱红（更亮）         | `#D8402A` | 4.48        | 4.17     | 白字差 0.02，放弃        |
| 赭石（更暗）         | `#8F2917` | 8.00        | 7.45     | 对比度富余，但观感偏"砖" |
| 旧值 · 潮汐青        | `#0B6F86` | 5.49        | 5.12     | 达标但冷灰，已被替换     |
| 旧值 · 品牌原 accent | `#46A6C6` | 2.65        | 2.47     | 不达标，禁止使用         |

`--vk-color-primary-hover` `#AB321C`（5.81 / 6.24）与 `--vk-color-primary-pressed` `#8F2917`（7.45 / 8.00）沿同色相压暗，焦点环用 10% 透明度 `rgba(196,58,33,.10)`。

### 暗色覆盖

| 令牌                         | 亮色      | 暗色      |
| ---------------------------- | --------- | --------- |
| `--vk-color-body`            | `#F3F1EC` | `#121210` |
| `--vk-color-card`            | `#FAF9F5` | `#1A1916` |
| `--vk-color-modal`           | `#FAF9F5` | `#201E1A` |
| `--vk-text-color-1`          | `#171512` | `#F4F1E9` |
| `--vk-text-color-2`          | `#57524A` | `#BDB7AB` |
| `--vk-text-color-3`          | `#736D62` | `#928C80` |
| `--vk-color-primary`         | `#C43A21` | `#FF8A5B` |
| `--vk-color-primary-hover`   | `#AB321C` | `#FFA07E` |
| `--vk-text-color-on-primary` | `#FFF8F4` | `#171210` |

暗色不是亮色反相：基础色逐项重新取，语义色的浅底与文字按深底重新计算。两套主题保持同一组键，亮暗切换只换值、不换结构。

## 字体

| 令牌                       | 值                                                                                   | 依据                             |
| -------------------------- | ------------------------------------------------------------------------------------ | -------------------------------- |
| `--vk-font-family`         | `Inter, -apple-system, 'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif` | 中文优先，贴近品牌手册的正文字体 |
| `--vk-font-family-display` | `Archivo, Inter, 'PingFang SC', 'Noto Sans SC', sans-serif`                          | 标题、数字展示                   |
| `--vk-font-family-serif`   | `'Instrument Serif', Georgia, 'Songti SC', serif`                                    | 引文                             |
| `--vk-font-family-mono`    | `'SF Mono', Menlo, Consolas, monospace`                                              | 数字、代码、HUD                  |

字号阶梯（重新拉开三档）：

| 令牌                     | 值     | 用途               |
| ------------------------ | ------ | ------------------ |
| `--vk-font-size-caption` | `12px` | 角标、表头、脚注   |
| `--vk-font-size-small`   | `13px` | 说明文字、次要信息 |
| `--vk-font-size-medium`  | `14px` | 控件与正文默认     |
| `--vk-font-size-large`   | `16px` | 正文大号、表单单行 |
| `--vk-font-size-title`   | `20px` | 卡片 / 弹层标题    |
| `--vk-font-size-xl`      | `24px` | 区块标题           |
| `--vk-font-size-2xl`     | `30px` | 页面标题           |
| `--vk-font-size-3xl`     | `38px` | 展示标题           |
| `--vk-font-size-4xl`     | `48px` | Hero               |

行高：`tight 1.15`（展示标题）/ `snug 1.35`（小标题）/ `1.5`（控件）/ `relaxed 1.75`（长文）。

## 圆角

| 令牌                  | 值      | 用途                   |
| --------------------- | ------- | ---------------------- |
| `--vk-radius-small`   | `6px`   | 标签、复选框、行内代码 |
| `--vk-radius-medium`  | `10px`  | 按钮、输入框、卡片     |
| `--vk-radius-large`   | `14px`  | 面板、示例容器、代码块 |
| `--vk-radius-x-large` | `20px`  | 浮层、产品外壳         |
| `--vk-radius-full`    | `999px` | 开关、胶囊标签         |

## 间距

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96`，对应 `--vk-space-1` 到 `--vk-space-10`，全部落在 4px 栅格上。组件内部只用 1–4 档，页面与区块用 5–10 档。

## 动效

| 令牌               | 值      | 用途               |
| ------------------ | ------- | ------------------ |
| `--vk-motion-fast` | `160ms` | hover、focus、开关 |
| `--vk-motion-base` | `240ms` | 展开、淡入         |
| `--vk-motion-slow` | `480ms` | 页面级转场         |

缓动统一使用 `cubic-bezier(.4, 0, .2, 1)`。所有过渡在 `prefers-reduced-motion: reduce` 下关闭。

## 尺寸与阴影

| 令牌                       | 值     |
| -------------------------- | ------ |
| `--vk-height-small`        | `28px` |
| `--vk-height-medium`       | `36px` |
| `--vk-height-large`        | `44px` |
| `--vk-border-width`        | `1px`  |
| `--vk-border-width-strong` | `2px`  |
| `--vk-focus-ring-width`    | `2px`  |
| `--vk-z-index-dropdown`    | `1000` |
| `--vk-z-index-modal`       | `2000` |
| `--vk-z-index-popup`       | `2100` |

阴影只用于浮层：`shadow-1` 给下拉 / 气泡，`shadow-2` 给对话框。卡片、表格、示例容器一律用 1px 边框分隔，不投影。

## 已修复：变量名与消费方不一致

早期版本的生成脚本没有在数字前插入连字符，`space1` / `textColor1` 被输出成 `--vk-space1` / `--vk-text-color1`，而组件消费的是 `--vk-space-1` / `--vk-text-color-1`。结果所有间距与文字色实际取不到值，组件退化为 0 内边距与继承色。当前版本已修正生成规则，并加入"消费方变量 ⊆ 生成变量"的校验，避免再次回归。
