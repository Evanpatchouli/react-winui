# Sass `@import` 弃用警告修复

日期：2026-08-21

## 完成内容

- 将 `src/lib/scss/main.scss`、`imports.scss`、主题入口、浏览器入口、NavBar 子模块和 Select 子模块的 `@import` 全部迁移为 `@use`。
- 为依赖 `_base/parents.scss` 中 selector 的组件显式加入 `@use ... as *`，保留原有跨文件 `@extend` 行为。
- 为移动端浏览器入口显式引入各组件和浏览器 mixin，并使用命名空间调用，避免 Sass 模块隔离后 mixin 不可见。
- 保持 SCSS selector、声明、主题变量、mixin 和生成顺序；没有改变颜色、间距、圆角、阴影或动画。

## 验证结果

- `pnpm --filter react-winui build:styles`：通过且不再输出 Sass deprecation warning
- `pnpm lint`：通过
- `pnpm typecheck`：通过
- `pnpm test`：通过，55/55
- `pnpm format:check`：通过
- `pnpm build`：通过，library/docs production build 成功
- `rg "@import" src/lib/scss`：无结果
- 使用仓库原始 SCSS 生成基线后对比：规则/声明结构一致，仅 `@extend` 生成的 selector 列表顺序变化，规范化后完全一致

## 未处理遗留项

- docs 构建仍有既有大 chunk warning；与 Sass `@import` 无关。
