# Rating

用整数星级收集评分，或用只读星级展示带小数的平均分。

```tsx
import { Rating } from "@evanpatchouli/react-winui";
import "@evanpatchouli/react-winui/styles.css";

<Rating aria-label="服务评分" defaultValue={3} name="serviceScore" />;
<Rating readOnly aria-label="平均评分" value={4.5} starColor="#d97706" />;
```

也可以从 `@evanpatchouli/react-winui/rating` 默认导入。

| Prop                             | 用途                                                              |
| -------------------------------- | ----------------------------------------------------------------- |
| `value` / `defaultValue`         | 受控分数 / 非受控初值。0 表示尚未评分。可编辑模式四舍五入到整数。 |
| `onValueChange(value)`           | 用户选择新分数时调用，传入数值。                                  |
| `max`                            | 星数，默认 5。有效范围 1 至 100，小数向下取整。                   |
| `readOnly`                       | 使用只读仪表语义，并按实际比例填充小数星。                        |
| `starColor`                      | 指定选中、悬停预览及小数星的填充色，支持 CSS 颜色或 `var(...)`。默认使用主题强调色，禁用时采用主题禁用色。 |
| `disabled`                       | 禁用输入并显示禁用态。                                            |
| `name`                           | 原生表单字段名，省略时各实例自行分组。                            |
| `getItemLabel(value, max)`       | 生成选项或只读分数的无障碍文本，默认形如 `3 of 5`。               |
| `aria-label` / `aria-labelledby` | 命名评分组，默认 `Rating`。                                       |

Tab 进入评分组，方向键切换星级，空格选择当前选项。鼠标悬停预览星数，点击后确认。只读模式作为一个整体向读屏软件报告当前值和范围。

本实现沿用 WinUI 的可编辑与只读星级、平均分部分填充，并参考 Fluent UI v9 的受控初值、单选组和可定制选项名称。仓库此前仅有通用滑块和单选控件。星形、交互和主题样式均在本库实现，未复制上游源码。[WinUI RatingControl](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/rating) · [Fluent UI React Rating](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-rating/library/src/components/Rating/Rating.types.ts)
