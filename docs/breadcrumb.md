# Breadcrumb

`Breadcrumb` 用一条持久可见的路径表达当前页面或文件夹层级。它使用原生链接承载上级导航，最后一项自动作为当前页面。

```tsx
import { Breadcrumb } from "@evanpatchouli/react-winui";
import "@evanpatchouli/react-winui/styles.css";

<Breadcrumb
  items={[
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/projects/winui", label: "WinUI" },
    { label: "Breadcrumb" }
  ]}
  maxVisibleItems={4}
/>;
```

也支持独立入口：

```tsx
import Breadcrumb from "@evanpatchouli/react-winui/breadcrumb";
```

## API

| Prop                | 类型                           | 默认值                       | 说明                                                              |
| ------------------- | ------------------------------ | ---------------------------- | ----------------------------------------------------------------- |
| `items`             | `readonly BreadcrumbItem[]`    | 必填                         | 从根节点到当前位置的有序路径。                                    |
| `separator`         | `ReactNode`                    | chevron                      | 项目之间的分隔内容；分隔符不会进入辅助技术的阅读顺序。            |
| `maxVisibleItems`   | `number`                       | `undefined`                  | 可见条目上限，包含省略号按钮；超出部分从第二项开始进入 overflow。 |
| `overflowAriaLabel` | `string`                       | `Show more breadcrumb items` | overflow 按钮和菜单的 accessible name。                           |
| `onItemClick`       | `(item, index, event) => void` | `undefined`                  | 任一可交互条目激活后调用，`index` 对应原始 `items` 下标。         |
| `aria-label`        | `string`                       | `Breadcrumb`                 | Breadcrumb 导航 landmark 的 accessible name。                     |
| native nav props    | `HTMLAttributes<HTMLElement>`  | —                            | 支持 `className`、`style`、`id`、`data-*` 和 forwarded `ref`。    |

`BreadcrumbItem` 支持：

- `label`：必填的可见内容。
- `href`：存在时渲染为链接；没有 `href` 但提供 `onClick` 时渲染为按钮。
- `icon`：标签前的装饰内容。
- `disabled`：渲染为不可交互的层级节点。
- `ariaLabel`：覆盖条目的 accessible name。
- `target` / `rel`：传递给带有 `href` 的链接。
- `id`：可选稳定标识，用作列表节点的 React key。

## 行为与无障碍

- 根节点是带默认 `aria-label="Breadcrumb"` 的 `<nav>`，路径使用 `<ol>` 表达层级。
- 最后一项是当前页面，渲染为非交互内容并设置 `aria-current="page"`；不会因为存在 `href` 或 `onClick` 而导航。
- 上级条目按 `href` / `onClick` 分别渲染为 `<a>` / `<button>`；没有交互属性的条目保持为文本节点。
- overflow 菜单保留首项和末项，中间被折叠的条目通过现有 `Popover` 打开；支持 Tab、Escape、outside pointer 和关闭后的焦点恢复。
- 没有设置 `maxVisibleItems` 时不自动测量宽度，路径保持单行并允许横向滚动；这样不会在 400% 缩放或异步字体加载时引入不稳定的布局判断。

## 借鉴边界

- WinUI / Windows 11：参考 [BreadcrumbBar](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/breadcrumbbar) 的 ItemsSource 路径模型、水平 chevron 分隔、当前项不执行导航和 overflow ellipsis 交互。
- Fluent UI React：参考 [Breadcrumb guidance](https://fluent2.microsoft.design/components/web/react/core/breadcrumb/usage) 的 `<nav>` / `<ol>` 语义、`aria-current`、dividers 不可交互以及 overflow 菜单边界。
- 视觉只使用 react-winui 的 `--rwu-*` token；没有复制 Fluent UI / WinUI 源码、Griffel 样式或视觉 token。
- 当前实现不加入自动 ResizeObserver 布局折叠、完整 Fluent compound component API、文件路径专用模式或导航历史推导。
