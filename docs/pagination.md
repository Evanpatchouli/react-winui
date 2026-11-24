# Pagination

为当前视图中的分页数据提供页码及上一页、下一页操作。数据切片或远程加载由调用方负责。

```tsx
import { Pagination } from "@evanpatchouli/react-winui";
import "@evanpatchouli/react-winui/styles.css";

<Pagination aria-label="搜索结果分页" pageCount={24} page={page} onPageChange={setPage} />;
```

也可从 `@evanpatchouli/react-winui/pagination` 默认导入。

| Prop                             | 用途                                                                |
| -------------------------------- | ------------------------------------------------------------------- |
| `pageCount`                      | 总页数。按整数处理，零页时隐藏控件。                                |
| `page` / `defaultPage`           | 从 1 起算的受控当前页或非受控初始页，默认 1。越界时显示最近有效页。 |
| `onPageChange(page)`             | 用户请求切换到另一页时触发。                                        |
| `disabled`                       | 禁用所有翻页操作。                                                  |
| `getPageLabel(page)`             | 自定义页码按钮的读屏名称，默认形如 `Page 3`。                       |
| `previousLabel` / `nextLabel`    | 自定义上一页和下一页的读屏名称。                                    |
| `aria-label` / `aria-labelledby` | 命名导航区域，默认名称为 `Pagination`。                             |

大页数显示首页、末页和当前页附近的页码，省略号表示中间区段。Tab 切换按钮，Enter 或空格激活。聚焦页码后，左右键切换相邻页，Home / End 跳至首页或末页。当前页具有 `aria-current="page"`。

现有 Breadcrumb 用于层级导航，DataGrid 展示传入的数据。本组件参考 WinUI PipsPager 的有限可见范围、当前页标记与逐页导航，并采用 Fluent React Button 的原生按钮语义和禁用行为。数字页码实现和主题样式为本库编写，未复制上游源码。[WinUI PipsPager](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/pipspager) · [Fluent UI React Button](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-button/library/src/components/Button/useButton.ts)
