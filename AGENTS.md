# react-winui Fork 现代化分阶段 Codex 提示词

## 阶段 1：建立现代化工程基线

你正在维护我 fork 的 `react-winui` 项目。

项目目标：

- 保留原 `react-winui` 的 Windows 11 / WinUI 风格和视觉质感。
- 第一阶段只进行工程现代化。
- 不重新设计组件。
- 不修改现有组件视觉效果。
- 不主动重构公共 API。
- 不添加新的业务组件。
- 最终目标是把它发展成一个长期维护的现代 React WinUI 风格组件库。

请先完整分析当前仓库：

- `package.json`
- 源码目录
- Demo / 文档站
- SCSS
- Babel
- CRA / react-scripts
- 构建脚本
- npm 发布相关配置
- 当前组件导出方式
- React / React DOM 依赖方式
- node-sass
- 测试配置

然后执行第一阶段现代化。

### 技术目标

迁移至：

- pnpm
- pnpm workspace
- TypeScript
- Vite
- Sass
- Vitest
- React Testing Library
- ESLint
- Prettier
- Node.js 22+
- React 18 / React 19 兼容

建议仓库逐步调整成：

```text
/
├─ apps/
│  └─ docs/
│
├─ packages/
│  └─ react-winui/
│     ├─ src/
│     ├─ package.json
│     └─ tsconfig.json
│
├─ package.json
├─ pnpm-workspace.yaml
└─ tsconfig.json
```

但是：

**不要为了满足这个目录结构强制一次性大规模移动全部文件。**

如果渐进迁移风险更低，可以先建立新的 workspace，然后逐步移动。

### 本阶段必须完成

1. 从 npm 切换为 pnpm。
2. 创建 workspace。
3. 移除 `react-scripts`。
4. 移除旧 Babel 构建链，如果 Vite / TypeScript 已能替代。
5. 将 `node-sass` 替换为 `sass`。
6. 建立 Vite Demo / docs 开发环境。
7. 建立组件库独立构建流程。
8. 支持：
   - ESM
   - TypeScript declarations
   - tree-shaking
9. 建立：
   - ESLint
   - Prettier
   - Vitest
10. 保证原有 Demo 能正常启动。
11. 保证原有组件样式可以正常加载。
12. 保证 production build 成功。

### 强约束

不要：

- 重写组件
- 修改颜色
- 修改圆角
- 修改阴影
- 修改 hover / pressed 效果
- 修改动画
- 修改组件 DOM 结构，除非构建工具兼容性要求
- 修改组件 Props API
- 删除旧 Props
- 引入 Fluent UI
- 添加新组件

### 视觉原则

第一阶段结束时：

> 新版和原版的界面截图应该尽可能一致。

如果某些 SCSS 因 Dart Sass 与 node-sass 行为差异导致变化，请优先修复兼容问题，而不是重新设计样式。

### 开发方式

不要一开始写很长的规划文档。

先：

1. 分析仓库。
2. 输出简短迁移方案。
3. 立即开始实施。
4. 每完成一个小步骤运行：
   - lint
   - typecheck
   - test
   - build
5. 遇到问题直接修复。

不要只修改配置而不实际运行验证。

### 完成后输出

最后告诉我：

- 修改了哪些文件
- 删除了哪些旧依赖
- 新增了哪些基础设施
- 当前启动命令
- 当前构建命令
- 当前测试命令
- 当前还有哪些遗留问题

然后停止，不要继续进入下一阶段。

---

## 阶段 2：整理 React 依赖与 npm 包发布结构

继续维护当前已经完成第一阶段现代化的 `react-winui` fork。

本阶段只处理：

- React 依赖
- package exports
- npm package 结构
- ESM
- 类型声明
- tree-shaking
- 发布配置

不要重构组件视觉或业务 API。

### 目标

让这个项目真正成为一个现代 React Component Library，而不是一个 Demo 项目打包成 npm 包。

重点检查当前：

```json
react
react-dom
react-router-dom
```

等依赖是否错误地出现在组件库 `dependencies`。

### React

组件库应该优先使用：

```json
"peerDependencies": {
  "react": ">=18",
  "react-dom": ">=18"
}
```

开发环境则在：

```json
"devDependencies"
```

安装 React。

需要同时验证：

- React 18
- React 19

至少在类型和构建层面兼容。

### package.json

整理：

- `main`
- `module`
- `types`
- `exports`
- `sideEffects`
- `files`

确保消费者可以正常：

```tsx
import { Button } from 'react-winui'
```

如果架构允许，同时考虑：

```tsx
import { Button } from 'react-winui/button'
```

但只有在不会显著增加复杂度时才做。

### CSS / SCSS

明确组件库的样式加载策略。

要求：

- 使用者不应该依赖项目内部源码路径。
- 发布包必须包含必要 CSS。
- 不允许发布时缺少字体、图片或 style asset。
- 检查 tree-shaking 与 CSS sideEffects 是否冲突。

### 发布产物

请检查最终 npm package 内容。

不要把以下无关内容全部发布：

- docs 源码
- tests
- screenshots
- 临时脚本
- development config
- node_modules
- 未使用 assets

### 验证

建立一个最小 consumer 测试应用，例如：

```text
examples/test-app
```

或者通过 workspace 建立测试项目。

验证：

```tsx
import { Button } from 'react-winui'
```

可以运行。

同时验证：

- dev
- build
- types
- CSS
- ESM import

### 强约束

不要：

- 改组件外观
- 改组件名称
- 删除现有 public export
- 重写 Props API
- 引入 Fluent UI

兼容性优先。

完成后停止。

---

## 阶段 3：JavaScript / JSX 渐进迁移 TypeScript

继续当前项目。

现在开始将组件源码逐步迁移到 TypeScript。

这是渐进式迁移，不允许一次性机械转换整个项目然后留下大量 `any`。

### 目标

逐个组件：

```text
.jsx
↓
.tsx
```

并建立完善的 public Props 类型。

### 迁移原则

每次只处理一小批相关组件。

例如：

```text
Button
Input
Checkbox
RadioButton
ToggleSwitch
```

完成后运行完整检查，再进入下一批。

### 类型要求

公共 Props 必须显式定义：

```tsx
export interface ButtonProps {
  ...
}
```

尽量基于 React 原生类型扩展，例如：

```tsx
React.ButtonHTMLAttributes<HTMLButtonElement>
React.InputHTMLAttributes<HTMLInputElement>
```

避免重复定义 HTML 原有能力。

### API 兼容

重点：

**不要趁 TypeScript 化顺便破坏旧 API。**

例如旧 API：

```tsx
<Button value="Save" />
```

如果未来更合理的是：

```tsx
<Button>Save</Button>
```

本阶段可以同时支持：

```tsx
export interface ButtonProps {
  value?: React.ReactNode
  children?: React.ReactNode
}
```

内部：

```tsx
const content = children ?? value
```

不要直接删除 `value`。

对于这种遗留 API，可以增加：

```ts
/** @deprecated Prefer children */
```

但不要删除。

### 禁止

不要：

- 大量使用 `any`
- 使用 `@ts-ignore` 掩盖问题
- 为通过编译随便断言 `as unknown as`
- 修改视觉样式
- 更改 DOM 结构，除非必要
- 修改已有 className
- 全量重写组件

### ref

对于适合暴露 DOM ref 的组件，逐步使用：

```tsx
forwardRef
```

但只有在不会破坏 API 的情况下进行。

### React 19

避免新增明显依赖旧 React 模式的实现。

清理：

- legacy lifecycle
- deprecated React APIs
- 不必要的 `ReactDOM.findDOMNode`

如果不存在则不用做。

### 每迁移一个组件

补至少：

- Props 类型
- 基础 render test
- disabled / state test
- event test

组件复杂时再增加 keyboard test。

### 完成标准

所有 public components 最终应具有：

- TypeScript 源码或至少完整 `.d.ts`
- 明确 Props
- 正常 IDE autocomplete

完成本阶段后停止。

---

## 阶段 4：抽取 react-winui Design Tokens

现在开始整理样式系统。

本阶段目标不是重新设计 UI，而是：

> 从现有 react-winui 样式中提取其视觉 DNA。

### 核心原则

最终页面应该保持原来的视觉质感。

不要按照 Fluent UI 的 token 重新设计 react-winui。

### 分析现有 SCSS

识别重复出现的：

- accent color
- text color
- secondary text
- disabled color
- control background
- hover background
- pressed background
- selected background
- border
- hover border
- focus border
- separator
- card background
- flyout background
- acrylic background
- dark theme background
- shadow
- border radius
- spacing
- control height
- typography
- animation duration

整理成自己的 token。

优先考虑：

```css
--rwu-color-accent
--rwu-text-primary
--rwu-text-secondary

--rwu-control-background
--rwu-control-background-hover
--rwu-control-background-pressed

--rwu-control-border
--rwu-control-border-hover

--rwu-radius-small
--rwu-radius-medium
--rwu-radius-large

--rwu-shadow-flyout
--rwu-shadow-dialog

--rwu-spacing-xs
--rwu-spacing-sm
--rwu-spacing-md
--rwu-spacing-lg
```

命名可以根据当前项目情况调整。

### Dark / Light

把目前已有 Dark / Light theme 行为整理成可维护的 token override。

例如：

```css
.rwu-theme-light {
  ...
}

.rwu-theme-dark {
  ...
}
```

或者更适合当前架构的实现。

### 重要

不要一次性把所有 SCSS 完全重写。

允许：

```text
旧 SCSS
↓
逐步替换重复 literal 为 token
```

每修改一批组件就运行 Visual Regression。

### 禁止

不要：

- 改颜色，只因为觉得 Fluent 更现代
- 改 border-radius
- 改阴影
- 改 padding
- 改字体大小
- 改控件高度

除非确认原项目本身就是明显 bug。

### 建立样式规范文档

新增一份轻量文档，例如：

```text
docs/design-system.md
```

只记录：

- Token 分类
- Theme 机制
- 新组件如何使用 token
- 禁止硬编码哪些样式
- Fluent UI 组件迁入时如何适配

不要写成长篇理论文档。

### 完成目标

未来新组件应该可以只依赖：

```text
react-winui tokens
```

而不复制旧组件的 CSS literal。

完成后停止。

---

## 阶段 5：建立测试与视觉回归基线

当前项目视觉风格非常重要。

现在建立长期测试基础。

### 测试体系

使用：

```text
Vitest
React Testing Library
Playwright
```

分别负责：

### Vitest

测试：

- component state
- helper
- hook
- props behavior

### Testing Library

测试：

- DOM
- user interaction
- accessibility semantics
- keyboard behavior

### Playwright

测试：

- 实际浏览器交互
- hover
- focus
- pressed
- menu
- dialog
- overlay
- keyboard
- dark/light theme

### Visual Regression

这是本项目高优先级能力。

为现有组件建立截图基线。

至少覆盖：

```text
Default
Hover
Pressed
Focus
Disabled
Dark
Light
```

不是每个组件都必须全部覆盖，但根据组件实际状态合理选择。

例如 Button：

```text
Button/
├─ default
├─ hover
├─ pressed
├─ focus
├─ disabled
├─ dark
└─ light
```

### 目标

未来如果 Codex 修改：

```css
border-radius: 4px
```

变成：

```css
border-radius: 8px
```

Playwright Visual Regression 必须能够发现。

### CI

建立基本 CI：

```text
install
lint
typecheck
unit-test
build
playwright
```

Visual Regression 的 snapshot 更新必须是显式行为。

不要让 CI 自动接受新 screenshot。

### 注意

不要为了测试方便大规模修改组件实现。

完成后停止。

---

## 阶段 6：建立 Fluent UI v9 组件借鉴规范

现在开始准备从 Fluent UI React v9 借鉴缺失组件。

先不要一次性实现大量组件。

本阶段主要建立迁移规则，并实现 1 个小组件作为模板。

建议第一组件：

```text
Tooltip
```

### 总原则

> 借 Fluent UI 的脑子，不借 Fluent UI 的脸。

可以重点研究 Fluent UI 的：

- accessibility
- keyboard navigation
- focus management
- state management
- event handling
- API design
- edge cases
- testing strategy
- component composition

不要直接搬：

- Fluent visual tokens
- Griffel styling
- Fluent Web / Microsoft 365 外观
- 与当前 react-winui 不一致的视觉 recipe

### Tooltip 实现

分析 Fluent UI v9 Tooltip 的：

- Props
- open state
- controlled/uncontrolled
- trigger
- positioning
- delay
- keyboard
- screen reader
- aria
- edge cases
- tests

然后为 react-winui 设计自己的 Tooltip。

视觉必须使用：

```text
react-winui Design Tokens
```

和当前 Windows 11 风格。

### 源码复用

如果复制或修改了 Fluent UI 的实际实现代码：

必须记录来源。

建立：

```text
THIRD_PARTY_NOTICES.md
```

记录：

- 来源仓库
- 原文件
- License
- 修改情况

如果只是学习 API / 思路，不必机械记录每个概念。

### API 原则

新组件使用现代 React API。

不要为了兼容一个不存在的旧组件而设计 Legacy API。

例如：

```tsx
<Tooltip content="Save">
  <Button>Save</Button>
</Tooltip>
```

优先选择符合现代 React 使用习惯的接口。

### 测试

Tooltip 必须包含：

- render
- hover open
- delay
- keyboard
- focus
- close
- controlled state
- accessibility
- dark/light
- visual regression

Tooltip 完成后停止。

不要接着一次性实现其他组件。

---

## 阶段 7：逐步补齐 WinUI / Fluent 缺失组件

现在项目已经具有：

- Modern tooling
- TypeScript
- Design Tokens
- Tests
- Visual Regression
- Fluent UI 借鉴规范

开始逐个补充组件。

### 实现顺序

优先：

```text
P0

Tooltip
Popover / Flyout
Menu
ContextMenu
Toast
InfoBar
ComboBox
```

然后：

```text
P1

NumberBox
AutoSuggestBox
TreeView
Expander
SettingsCard
SettingsExpander
CommandBar
NavigationView
```

之后：

```text
P2

DatePicker
Calendar
DataGrid
TeachingTip
Breadcrumb
Tag
Badge
```

最后：

```text
P3

ColorPicker
Rating
Pagination
其他
```

### 非常重要

不要一次性实现整个列表。

每次只实现：

```text
1 个组件
```

或者最多一组强相关组件，例如：

```text
Menu
MenuItem
MenuDivider
ContextMenu
```

### 每个组件标准流程

1. 查 WinUI 3 对应控件行为。
2. 查 Fluent UI v9 实现。
3. 分析 API。
4. 分析 accessibility。
5. 分析 keyboard。
6. 分析 edge cases。
7. 设计适合 react-winui 的 API。
8. 使用现有 Design Tokens 实现视觉。
9. 写测试。
10. 写 Visual Regression。
11. 写 docs Demo。
12. build。
13. 停止。

### NavigationView

`NavigationView` 是本项目未来的重要核心组件。

不要简单照搬普通 Web Sidebar。

应该参考 Windows 11 / WinUI NavigationView 的：

- pane
- compact
- expanded
- menu items
- selected indicator
- footer
- settings
- back button
- hamburger
- responsive behavior
- icons
- nested navigation

视觉继续遵循 react-winui，而不是 Microsoft 365 Web Navigation。

### Settings 系列

实现：

```text
SettingsCard
SettingsExpander
```

时优先参考 Windows 11 Settings / WinUI Gallery。

目标是让这个组件库可以自然实现类似：

```tsx
<SettingsCard
  title="Notifications"
  description="Allow desktop notifications"
  icon={<NotificationIcon />}
>
  <ToggleSwitch />
</SettingsCard>
```

### 完成一个组件后

告诉我：

- API
- Fluent UI 借鉴内容
- WinUI 借鉴内容
- 是否复制实际源码
- 新增测试
- Visual Regression 状态
- docs Demo
- 后续建议

然后停止，等待我指定下一个组件。

---

# 全项目长期原则

整个项目长期遵守以下规则。

## 第一原则

```text
Visual DNA = react-winui
```

不要把项目逐渐改成 Fluent UI Web。

## 第二原则

```text
Behavior / Accessibility / Architecture
=
参考 Fluent UI v9
```

## 第三原则

新组件优先参考：

```text
WinUI 3
Windows 11
WinUI Gallery
```

确定桌面端应该长什么样。

然后参考：

```text
Fluent UI React v9
```

确定 React 行为怎么实现。

## 第四原则

不要过度设计。

不要提前建立复杂 framework。

当前组件需要什么，就增加什么。

## 第五原则

兼容旧组件。

旧组件逐步改进，而不是集中 breaking rewrite。

如需要 breaking change：

先 deprecated。

以后 major version 再删除。

## 第六原则

所有视觉变化必须通过 Visual Regression。

## 第七原则

不要留下：

```text
TODO implementation
fake implementation
placeholder
大量 any
@ts-ignore
未运行的测试
只写配置不验证
```

每次任务都必须真正运行：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

涉及浏览器组件时再运行 Playwright。

## 第八原则

保持轻量文档。

只写：

- 当前实现需要的说明
- 架构决策
- API
- 组件开发规范
- 第三方源码来源

不要为了“看起来专业”制造大量没人维护的文档。