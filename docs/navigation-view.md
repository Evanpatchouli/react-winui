# NavigationView

`NavigationView` is an application navigation shell with WinUI-style expanded, compact, minimal,
and auto pane modes. It is independent from the legacy `NavBar` family, whose API and visual
contract remain unchanged.

```tsx
<NavigationView
  defaultValue="home"
  paneHeader="Contoso"
  settingsItem={{ icon: <SettingsIcon />, label: "Settings", value: "settings" }}
  header="Home"
  content={<HomePage />}
>
  <NavigationView.Item icon={<HomeIcon />} label="Home" value="home" />
  <NavigationView.Item icon={<LibraryIcon />} label="Library" value="library">
    <NavigationView.Item label="Downloads" value="downloads" />
  </NavigationView.Item>
</NavigationView>
```

## API

- `items` and compound `children` define primary items; `footerItems` and `settingsItem` share the
  same single-selection value.
- `value` / `defaultValue` and `onValueChange` control selection.
- `paneOpen` / `defaultPaneOpen` and `onPaneOpenChange` control the pane.
- `expandedItems` / `defaultExpandedItems` and `onExpandedItemsChange` control nested branches.
- `paneDisplayMode="auto"` resolves to expanded at 1008 px and wider, compact from 641–1007 px,
  and minimal at 640 px and narrower. Compact and minimal panes use an overlay while open.
- `compactPaneLength` and `openPaneLength` adjust pane widths without changing the WinUI behavior.
- `header`, `content`, `paneHeader`, `footer`, and `settingsItem` provide the application shell slots.

`NavigationView.Item` supports `value`, `label`, `icon`, `textValue`, `disabled`, `selectable`, and
nested items. Selectable branches use a separate disclosure button; `selectable={false}` makes the
main item act as a disclosure.

## Keyboard and accessibility

- The pane is a named `nav` landmark with list semantics; only the exact selection receives
  `aria-current="page"`.
- Arrow Up / Down, Home, End, and typeahead move roving focus across visible enabled items.
- Arrow Right expands a branch or moves to its first child; Arrow Left collapses or returns to the
  parent.
- Escape and light-dismiss close an overlay and restore focus to the visible pane toggle.
- Back closes an open overlay before calling the application `onBack` handler.
- If a selected descendant is hidden by a collapsed branch, its deepest visible ancestor retains
  the visual selected indicator without falsely receiving `aria-current`.

## Current scope

This release implements the left adaptive pane. WinUI's top navigation mode, hierarchical data
providers, virtualization, drag-and-drop, and router-specific links are intentionally outside the
current P1 scope.

Behavior and layout were informed by WinUI NavigationView, Windows 11, Fluent UI React navigation
state patterns, and WAI-ARIA disclosure/navigation guidance. No Fluent UI or WinUI implementation
source, Griffel style, or visual token was copied.
