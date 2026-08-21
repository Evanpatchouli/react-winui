# react-windows-ui Design Tokens

阶段 4 的 token 层只抽取现有样式中的视觉值，不重新设计组件。新的语义变量以 `--rwu-*` 命名，组件和浏览器 SCSS 的消费端已完成迁移；主题兼容桥接仍保留。

## 使用方式

消费者继续加载 canonical stylesheet：

```js
import "@evanpatchouli/react-winui/styles.css";
```

新组件优先使用语义 token：

```css
.my-control {
  color: var(--rwu-color-text-primary);
  background: var(--rwu-color-surface-control);
  border: 1px solid var(--rwu-color-border-control);
  border-radius: var(--rwu-radius-control);
  transition: background var(--rwu-duration-control) ease;
}
```

## Token 分类

| 分类 | 示例 | 用途 |
| --- | --- | --- |
| 颜色 / 文字 | `--rwu-color-accent`、`--rwu-color-text-primary`、`--rwu-color-text-secondary` | 主色、正文和弱化文字 |
| 颜色 / surface | `--rwu-color-surface-canvas`、`--rwu-color-surface-control`、`--rwu-color-surface-dialog` | 页面、控件和弹窗表面 |
| 颜色 / 状态 | `--rwu-color-surface-control-hover`、`--rwu-color-surface-control-pressed`、`--rwu-color-danger` | hover、pressed 与状态色 |
| 颜色 / border | `--rwu-color-border-control`、`--rwu-color-border-input`、`--rwu-color-border-divider` | 控件、输入框和分隔线 |
| 圆角 | `--rwu-radius-small`、`--rwu-radius-control`、`--rwu-radius-dialog` | 保留现有 4px、5px、8.6px 等圆角 |
| 间距 | `--rwu-spacing-xs` 至 `--rwu-spacing-3xl` | 复用现有 4/5/8/10/15/20/30px 间距 |
| 阴影 | `--rwu-shadow-flyout`、`--rwu-shadow-dialog`、`--rwu-shadow-alert` | 下拉菜单、Dialog 和 Alert 层级 |
| 动效 | `--rwu-duration-fast`、`--rwu-duration-control`、`--rwu-duration-dropdown` | 复用现有 transition/animation 时长 |

完整 token 列表以 `src/lib/scss/themes/tokens.scss` 为准。

## Theme 机制

现有主题行为保持不变：`src/lib/scss/themes/light.scss` 定义 `:root`，`src/lib/scss/themes/dark.scss` 通过 `[data-theme="dark"]` 覆盖旧的 `--color-*` 变量。`Appearance` / `AppTheme` 仍然负责设置该属性。

`--rwu-color-*` 语义 token 有意引用旧的 `--color-*` 变量，因此可以同时满足：

- light/dark 主题自动切换；
- 既有 `--PrimaryColor` / `--PrimaryColorLight` 自定义主色继续生效；
- 旧消费者覆盖 `--color-*` 时不发生意外断裂。

旧的 `--color-*` 变量（包括历史拼写 `--color-button-border-bottom-defult`）暂不删除；新代码优先使用 `--rwu-*`。

## 组件样式约定

- 新组件必须优先使用 `--rwu-*`，不要复制现有 SCSS literal。
- 不引入 Fluent UI 的视觉 token、Griffel recipe 或默认外观。
- DOM、className、Props 和现有交互状态不因 token 抽取而改变。
- 数据 URI、组件专属几何值和浏览器兼容值只有在确认复用关系后再抽取。
- 任何视觉数值调整都必须通过后续 Visual Regression 基线确认。
