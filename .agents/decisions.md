# 架构决策

## 2026-08-20：渐进式 workspace 迁移

- workspace 包暂使用现有 `src/lib`，Demo 使用新建的 `apps/docs`，不强制搬迁历史 Demo 和组件源码。
- 组件构建使用 Vite 8 library mode + `preserveModules`，输出 ESM，外置 React/React DOM/React Router。
- 声明文件在 TypeScript 全量迁移前沿用现有 public `.d.ts` 并随构建复制到 `dist`。
- CSS 由 Sass JS API 单独编译到既有 `dist/react-windows-ui.min.css`，保持原 Demo 和消费者路径。

## 2026-08-20：移除 CRA 模板

- `src/cra-template` 不属于 pnpm workspace，也不再参与 Vite Demo 或组件包构建。
- 项目不再维护 `cra-template-windows-ui`，因此删除模板目录并将文档示例统一为 Vite + pnpm。

## 2026-08-20：组件包发布边界

- 组件包继续保留在 `src/lib`，通过 `exports` 暴露 root ESM、`button` 直达入口和 CSS 资源；不把 `src`、`scss`、tests 或开发配置发布到 npm。
- React 与 React DOM 由消费者提供，最低 peer 版本为 18；`react-router-dom` 因 `Link` 组件在运行时直接依赖它，作为 `>=6` peer 保留。
- `styles.css` 是新的 canonical CSS specifier，原有 `dist/react-windows-ui.min.css` 路径继续保留，避免已有应用出现发布路径 breaking change。
- `examples/test-app` 使用空 `paths` 覆盖根 tsconfig 的源码别名，确保 consumer 类型检查通过真实 package exports，而不是仓库内部源码路径。
