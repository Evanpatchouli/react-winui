# 组件文档页编写规范

以 v1.3.0 的 [Checkbox 页](../src/demo/v1.3.0/docs/Checkbox_docs/index.js) 为版式参考。运行 `pnpm dev` 后打开 `/#/v1.3.0/checkbox`。当前版本的页面放在 `src/demo/v1.3.0/docs/<Component>_docs/`，页面文案与同版本文档保持英文。

## 页面顺序

| 区块 | 应当展示的内容 |
| --- | --- |
| 组件名与预览 | 使用带 `hasPadding` 的 `NavPageContainer`。以组件名作为页面的 `h1`，紧接一个最小可用实例，让读者在阅读代码前就能体验控件。 |
| Import | 使用 `h2` 和高亮代码块，展示从发布包根入口导入组件的完整语句。示例依赖额外样式或资源时注明公开入口。 |
| Usage | 使用 `h2`。先给可操作实例，再给对应 JSX。受控示例包含状态初始化、回调及可见结果。涉及键盘操作时，写明如何聚焦和操作。 |
| 特有用法 | 按需在 Usage 后增加小节，成对展示实例和代码。例如 Checkbox 的行内用法、Rating 的只读平均分、Pagination 的大页数模式。 |
| Props | 使用 `h2` 和四列表格，按 `Prop → Type → Default → Description` 排列。每个组件专有公开属性占一行。 |

## 代码和表格

- `index.js` 组织页面。沿用 Checkbox 的 `codes.js` 存放代码片段。含状态或数据处理的示例应把必要的数据和回调写全；修改预览时同步更新片段。示例应通过公开包入口运行。
- 代码块沿用 Prism 的 `SyntaxHighlighter`、`vscDarkPlus` 和 `code code-container`。导入语句使用 `javascript`，组件用法使用 `jsx` 或 `tsx`。
- `props-view.js` 保存本组件的表格行，可以复用 [DocsPropsTable](../src/demo/common/components/DocsPropsTable.js)。对照当前导出的 Props 类型及实现填写默认值。必填项写 `Required`，没有默认值写 `—`，自动生成的值注明生成规则。
- 回调写出完整签名和触发时机。区分受控值与初始值；按实际 API 写明取值范围、禁用或只读行为、可访问名称和 ref 的 DOM 类型。透传的通用 HTML 属性可合并说明。

## 接入与验收

在当前版本的 `docs/index.js` 导出页面，在版本入口注册路由和搜索项，并在 `navbar_items.json` 增加导航项。运行文档站，通过导航和直接 URL 进入页面，操作主示例，核对可见结果、Usage 代码和 Props 表；最后运行 `pnpm build` 验证生产文档。完整示例见 [Rating](../src/demo/v1.3.0/docs/Rating_docs/index.js) 和 [Pagination](../src/demo/v1.3.0/docs/Pagination_docs/index.js)。
