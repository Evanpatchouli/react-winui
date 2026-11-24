# ColorPicker

`ColorPicker` 将命名预设和系统颜色选择器绑定到同一个颜色值。选择任意颜色后，预设选中标记和自定义色预览会同步更新。

```tsx
import { ColorPicker } from "@evanpatchouli/react-winui";
import "@evanpatchouli/react-winui/styles.css";

<ColorPicker
  aria-label="强调色"
  customColorLabel="选择自定义强调色"
  defaultValue="#038387"
  presets={[
    { value: "#038387", label: "蓝绿色" },
    { value: "#881798", label: "紫色" }
  ]}
  onValueChange={setAccent}
/>;
```

也可从 `@evanpatchouli/react-winui/color-picker` 使用默认导入。

| Prop                             | 类型                           | 用途                                                                                                 |
| -------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `value` / `defaultValue`         | `string`                       | 受控值或非受控初值，接受 `#rrggbb`。默认及无效值显示黑色。                                           |
| `onValueChange`                  | `(value: string) => void`      | 选色发生变化时传出小写十六进制值。                                                                   |
| `presets`                        | `readonly ColorPickerPreset[]` | 每项包含六位 hex 的 `value` 和读屏名称 `label`。同色保留首项，忽略无效色。省略时仅显示系统选色入口。 |
| `customColorLabel`               | `string`                       | 系统选色入口的读屏名称，默认 `Custom color`。                                                        |
| `disabled`                       | `boolean`                      | 禁用整组选色控件。                                                                                   |
| `aria-label` / `aria-labelledby` | `string`                       | 颜色组名称，默认 `Color picker`。                                                                    |

Tab 可到达预设组和系统选色入口。方向键在当前组切换预设。系统颜色面板由浏览器提供，取消时保留原值。可单独使用原有的 `ColorPickerItem`、`ColorPickerPalette` 组合其他布局。

## 设计依据

旧 Demo 将预设和自定义色的事件传给同一处理器，但两者各自维护显示状态。聚合控件复用现有色块，统一选中值，提供分组名称和键盘焦点。参考 WinUI 的简化选色和即时预览，以及 Fluent 的共享颜色值与变更回调。实现使用原生 radio 和 color input，未复制上游源码。[WinUI ColorPicker](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/color-picker) · [Fluent UI React ColorPicker](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-color-picker/library/src/components/ColorPicker/ColorPicker.types.ts)
