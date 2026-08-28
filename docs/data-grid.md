# DataGrid

`DataGrid` 是面向本地数组的 Windows 风格数据表格。它在保留 react-winui 视觉语言的基础上，提供类型化列定义、客户端排序、单行或多行选择、禁用行和可预测的键盘网格焦点。

## 使用

```tsx
import { DataGrid } from "@evanpatchouli/react-winui";
import "@evanpatchouli/react-winui/styles.css";

const columns = [
  { id: "name", header: "Name", accessor: "name", sortable: true },
  { id: "status", header: "Status", accessor: "status" }
];

<DataGrid
  columns={columns}
  getRowId={(item) => item.id}
  items={projects}
  selectionMode="multiple"
/>;
```

也支持独立入口：

```tsx
import DataGrid from "@evanpatchouli/react-winui/data-grid";
```

## API

| Prop                                       | 类型                                | 默认值       | 说明                                                                       |
| ------------------------------------------ | ----------------------------------- | ------------ | -------------------------------------------------------------------------- |
| `items`                                    | `readonly T[]`                      | `[]`         | 渲染到数据行的项目数组。                                                   |
| `columns`                                  | `readonly DataGridColumn<T>[]`      | `[]`         | 列定义、访问器、排序值和自定义单元格渲染器。                               |
| `getRowId`                                 | `(item, index) => string \| number` | `index`      | 为每个数据行解析稳定 ID。                                                  |
| `sortState` / `defaultSortState`           | `DataGridSortState \| null`         | `null`       | 受控或非受控排序状态。点击可排序表头会按升序、降序、清除循环。             |
| `onSortChange`                             | `(sortState, event) => void`        | `undefined`  | 可排序表头请求新排序状态时触发。                                           |
| `selectionMode`                            | `"none" \| "single" \| "multiple"`  | `"none"`     | 启用单选或多选；多选包含表头全选框。                                       |
| `selectedRowIds` / `defaultSelectedRowIds` | `readonly (string \| number)[]`     | `[]`         | 受控或非受控选中行 ID。                                                    |
| `onSelectionChange`                        | `(selectedRowIds, event) => void`   | `undefined`  | 选中行变化时触发。                                                         |
| `getRowDisabled`                           | `(item, index) => boolean`          | `false`      | 将指定数据行标记为不可选择且不会进入键盘导航。                             |
| `onRowClick`                               | `(item, index, event) => void`      | `undefined`  | 点击行的非交互区域时触发；点击 checkbox/radio 等交互元素不会冒泡为行操作。 |
| `noRowsMessage`                            | `ReactNode`                         | `"No items"` | 数据数组为空时显示的内容。                                                 |
| `label` / `gridAriaLabel`                  | `ReactNode` / `string`              | `undefined`  | 可见标签或无可见标签时的 accessible name。                                 |
| `density`                                  | `"compact" \| "standard"`           | `"standard"` | 控制行内间距。                                                             |
| `disabled`                                 | `boolean`                           | `false`      | 禁用排序、选择和行交互。                                                   |
| `rootClassName`                            | `string`                            | `undefined`  | 外层 DataGrid class。                                                      |

`DataGridColumn<T>` 的 `accessor` 可以是 `keyof T` 或 `(item) => ReactNode`；`renderCell` 只负责显示内容，`sortValue` 用于为复杂显示值提供稳定的可比较值。组件默认使用列的 `id` 读取同名 item 属性。

## 交互与无障碍

- 表面使用 `role="grid"`、`role="row"`、`role="columnheader"` 和 `role="gridcell"`，并暴露 `aria-rowcount`、`aria-colcount`、`aria-sort`、`aria-selected` 和 `aria-readonly`。
- 数据单元格使用 roving `tabIndex`，网格只保留一个可 Tab 进入的单元格。方向键按二维网格移动，`Home` / `End` 移动到当前行首尾，Ctrl 或 Command 加 `Home` / `End` 移动到网格首尾。
- `PageUp` / `PageDown` 以固定步长移动；Enter 或 Space 在启用选择时操作当前行，Ctrl 或 Command 加 `A` 在多选模式选中所有可用行。
- 禁用行保留在表格中供阅读，但不会进入键盘导航或全选结果。checkbox 和 radio 使用原生表单语义，并提供行级 accessible name。

## 当前边界

本批只支持本地数组、列级 cell/renderCell、客户端排序、单/多行选择和固定 DOM 的键盘 grid。不实现编辑、列拖拽或缩放、虚拟化、分组、分页、行详情、异步数据源和服务端排序适配层。`DataGrid` 是新组件，不改变旧 `TableView` 的 Props 或 DOM。

## 借鉴边界

- WinUI / Windows 11：数据表面、列标题、选择行、禁用行、表头全选和桌面数据浏览场景参考 [CommunityToolkit WinUI DataGrid](https://learn.microsoft.com/en-us/dotnet/api/communitytoolkit.winui.ui.controls.datagrid?view=win-comm-toolkit-dotnet-7.0)。
- Fluent UI React v9：`items` / `columns` / `getRowId`、controlled / uncontrolled sort and selection、focus mode、selection state 分离和测试边界参考 [Fluent UI DataGrid types](https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-table/library/src/components/DataGrid/DataGrid.types.ts) 与 [DataGrid implementation](https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-table/library/src/components/DataGrid/useDataGrid.ts)。
- ARIA 键盘模型参考 [WAI-ARIA Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)。

仅参考公开 API、行为、无障碍和测试思路；未复制 Fluent UI 或 WinUI 源码、Griffel 样式或 Fluent 视觉 token。
