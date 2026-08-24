# TreeView

`TreeView` 用于展示需要强调父子关系的多层数据。它提供 `TreeView` / `TreeItem` 复合 API，保留
WinUI 的缩进、展开箭头和整行状态视觉，同时按 Web treeview 规范管理语义与焦点。

现有 `NavBarSubMenu` 面向导航栏和路由内容，没有 `tree` / `treeitem` / `group` 语义、独立选择
状态或树形键盘模型，因此不适合作为通用 TreeView，也没有被替换。

## 示例

```tsx
const [value, setValue] = useState<TreeItemValue>("readme");
const [expandedItems, setExpandedItems] = useState<readonly TreeItemValue[]>(["documents"]);

<TreeView
  aria-label="Project files"
  expandedItems={expandedItems}
  value={value}
  onExpandedItemsChange={setExpandedItems}
  onValueChange={setValue}
>
  <TreeItem label="Documents" value="documents">
    <TreeItem label="Readme" value="readme" />
    <TreeItem label="Roadmap" value="roadmap" />
  </TreeItem>
  <TreeItem disabled label="System files" value="system" />
</TreeView>;
```

`@evanpatchouli/react-winui/tree-view` 同时提供默认 `TreeView` 和具名 `TreeItem` 入口。

## API

### TreeView

| Prop                                     | 说明                                     |
| ---------------------------------------- | ---------------------------------------- |
| `value` / `defaultValue`                 | 受控 / 非受控的单选值；`null` 表示未选择 |
| `onValueChange`                          | 鼠标、Enter 或 Space 请求改变选择时触发  |
| `expandedItems` / `defaultExpandedItems` | 受控 / 非受控的已展开分支值              |
| `onExpandedItemsChange`                  | 箭头图标或键盘请求展开、折叠时触发       |
| `selectionMode`                          | `single`（默认）或 `none`                |
| `children`                               | 由 `TreeItem` 构成的层级内容             |

### TreeItem

| Prop        | 说明                                        |
| ----------- | ------------------------------------------- |
| `value`     | 树内唯一的 `string                          | number` 标识 |
| `label`     | 可见的非交互式内容                          |
| `textValue` | `label` 不是纯文本时供 typeahead 使用的文本 |
| `icon`      | 可选装饰图标，不进入无障碍树                |
| `disabled`  | 阻止焦点、选择、展开和鼠标交互              |
| `children`  | 嵌套 `TreeItem`；存在子项时当前节点成为分支 |

## 键盘与无障碍

- 根节点使用 `role="tree"`，节点使用 `role="treeitem"`，展开的子层使用 `role="group"`。
- roving `tabIndex` 使整个 TreeView 在页面 Tab 顺序中只保留一个入口；焦点与选择相互独立。
- `ArrowDown` / `ArrowUp` 在可见且未禁用的节点间移动，`Home` / `End` 移到首尾。
- `ArrowRight` 展开折叠分支，再次按下进入第一个可用子节点；`ArrowLeft` 折叠分支或回到父节点。
- `Enter` / `Space` 选择当前节点；快速输入字符按可见节点名称循环匹配。
- 叶节点不设置 `aria-expanded`；禁用节点设置 `aria-disabled` 且不进入 roving focus。
- 每个 TreeView 都应通过 `aria-label` 或 `aria-labelledby` 提供名称。

## 当前边界

本次只提供 P1 所需的单选、静态嵌套结构。不包含多选复选框级联、虚拟化、异步子节点、拖放、
节点重排或数据源适配器；这些能力应在真实需求出现后单独设计，避免提前扩大 API。

## 参考边界

- [WinUI Tree view](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/tree-view)：层级缩进、展开箭头、任意深度、选择与展开行为。
- [Fluent UI React v9 Tree types](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-tree/library/src/components/Tree/Tree.types.ts)：复合组件、受控 open items、稳定 item value 与 roving focus 的 API / 状态边界。
- [WAI-ARIA Tree View Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/)：角色关系、焦点与选择分离、方向键、Home / End 和 typeahead 约定。

仅参考公开行为、API 和测试思路；未复制 Fluent UI 实现源码、Griffel 样式或视觉 token。
