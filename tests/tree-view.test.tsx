import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TreeView, { TreeItem } from "../src/lib/src/components/TreeView/index";

const getTreeItem = (label: string): HTMLElement => {
  const item = screen.getByText(label).closest<HTMLElement>('[role="treeitem"]');
  if (!item) {
    throw new Error(`Tree item not found: ${label}`);
  }

  return item;
};

describe("TreeView", () => {
  it("renders nested ARIA semantics and an initial uncontrolled state", () => {
    render(
      <TreeView
        aria-label="Project files"
        defaultExpandedItems={["documents"]}
        defaultValue="readme"
      >
        <TreeItem icon={<span>folder</span>} label="Documents" value="documents">
          <TreeItem label="Readme" value="readme" />
          <TreeItem label="Roadmap" value="roadmap" />
        </TreeItem>
        <TreeItem label="Archive" value="archive" />
      </TreeView>
    );

    const tree = screen.getByRole("tree", { name: "Project files" });
    const documents = getTreeItem("Documents");
    const readme = getTreeItem("Readme");

    expect(tree).toHaveAttribute("aria-multiselectable", "false");
    expect(documents).toHaveAttribute("aria-expanded", "true");
    expect(documents.querySelector('[role="group"]')).toBeInTheDocument();
    expect(readme).not.toHaveAttribute("aria-expanded");
    expect(readme).toHaveAttribute("aria-selected", "true");
    expect(readme).toHaveAttribute("tabindex", "0");
    expect(documents).toHaveAttribute("tabindex", "-1");
    expect(tree.querySelector(".ui-tree-item-icon")).toHaveAttribute("aria-hidden", "true");
  });

  it("selects an enabled item with the pointer and blocks disabled interaction", () => {
    const onValueChange = vi.fn();

    render(
      <TreeView aria-label="Files" defaultValue="documents" onValueChange={onValueChange}>
        <TreeItem label="Documents" value="documents" />
        <TreeItem disabled label="System" value="system" />
        <TreeItem label="Pictures" value="pictures" />
      </TreeView>
    );

    const documents = getTreeItem("Documents");
    const system = getTreeItem("System");
    const pictures = getTreeItem("Pictures");

    fireEvent.click(system);
    expect(system).toHaveAttribute("aria-disabled", "true");
    expect(system).toHaveAttribute("aria-selected", "false");
    expect(onValueChange).not.toHaveBeenCalled();

    fireEvent.click(pictures);
    expect(pictures).toHaveAttribute("aria-selected", "true");
    expect(pictures).toHaveFocus();
    expect(documents).toHaveAttribute("aria-selected", "false");
    expect(onValueChange).toHaveBeenCalledWith(
      "pictures",
      expect.objectContaining({ type: "click" })
    );
  });

  it("requests controlled selection without mutating the rendered value", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <TreeView aria-label="Files" onValueChange={onValueChange} value="documents">
        <TreeItem label="Documents" value="documents" />
        <TreeItem label="Pictures" value="pictures" />
      </TreeView>
    );

    fireEvent.click(getTreeItem("Pictures"));

    expect(onValueChange).toHaveBeenCalledWith("pictures", expect.any(Object));
    expect(getTreeItem("Documents")).toHaveAttribute("aria-selected", "true");
    expect(getTreeItem("Pictures")).toHaveAttribute("aria-selected", "false");

    rerender(
      <TreeView aria-label="Files" onValueChange={onValueChange} value="pictures">
        <TreeItem label="Documents" value="documents" />
        <TreeItem label="Pictures" value="pictures" />
      </TreeView>
    );

    expect(getTreeItem("Pictures")).toHaveAttribute("aria-selected", "true");
  });

  it("expands uncontrolled branches with the glyph and reports the next values", () => {
    const onExpandedItemsChange = vi.fn();

    render(
      <TreeView aria-label="Files" onExpandedItemsChange={onExpandedItemsChange}>
        <TreeItem label="Documents" value="documents">
          <TreeItem label="Readme" value="readme" />
        </TreeItem>
      </TreeView>
    );

    const documents = getTreeItem("Documents");
    fireEvent.click(documents.querySelector(".ui-tree-item-toggle") as HTMLElement);

    expect(documents).toHaveAttribute("aria-expanded", "true");
    expect(getTreeItem("Readme")).toBeVisible();
    expect(onExpandedItemsChange).toHaveBeenLastCalledWith(
      ["documents"],
      expect.objectContaining({ type: "click" })
    );

    fireEvent.click(documents.querySelector(".ui-tree-item-toggle") as HTMLElement);
    expect(documents).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Readme")).not.toBeInTheDocument();
    expect(onExpandedItemsChange).toHaveBeenLastCalledWith([], expect.any(Object));
  });

  it("keeps controlled expansion unchanged until its prop updates", () => {
    const onExpandedItemsChange = vi.fn();
    const { rerender } = render(
      <TreeView aria-label="Files" expandedItems={[]} onExpandedItemsChange={onExpandedItemsChange}>
        <TreeItem label="Documents" value="documents">
          <TreeItem label="Readme" value="readme" />
        </TreeItem>
      </TreeView>
    );

    const documents = getTreeItem("Documents");
    fireEvent.keyDown(documents, { key: "ArrowRight" });

    expect(onExpandedItemsChange).toHaveBeenCalledWith(["documents"], expect.any(Object));
    expect(documents).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Readme")).not.toBeInTheDocument();

    rerender(
      <TreeView
        aria-label="Files"
        expandedItems={["documents"]}
        onExpandedItemsChange={onExpandedItemsChange}
      >
        <TreeItem label="Documents" value="documents">
          <TreeItem label="Readme" value="readme" />
        </TreeItem>
      </TreeView>
    );

    fireEvent.keyDown(getTreeItem("Documents"), { key: "ArrowRight" });
    expect(getTreeItem("Readme")).toHaveFocus();
  });

  it("moves roving focus with arrows, Home, and End while skipping disabled items", () => {
    render(
      <TreeView aria-label="Files" defaultExpandedItems={["documents"]}>
        <TreeItem label="Documents" value="documents">
          <TreeItem label="Alpha" value="alpha" />
          <TreeItem disabled label="System" value="system" />
          <TreeItem label="Beta" value="beta" />
        </TreeItem>
        <TreeItem label="Zulu" value="zulu" />
      </TreeView>
    );

    const documents = getTreeItem("Documents");
    documents.focus();
    fireEvent.keyDown(documents, { key: "ArrowRight" });
    expect(getTreeItem("Alpha")).toHaveFocus();

    fireEvent.keyDown(getTreeItem("Alpha"), { key: "ArrowDown" });
    expect(getTreeItem("Beta")).toHaveFocus();

    fireEvent.keyDown(getTreeItem("Beta"), { key: "ArrowDown" });
    expect(getTreeItem("Zulu")).toHaveFocus();

    fireEvent.keyDown(getTreeItem("Zulu"), { key: "Home" });
    expect(documents).toHaveFocus();

    fireEvent.keyDown(documents, { key: "End" });
    expect(getTreeItem("Zulu")).toHaveFocus();

    fireEvent.keyDown(getTreeItem("Beta"), { key: "ArrowLeft" });
    expect(documents).toHaveFocus();

    fireEvent.keyDown(documents, { key: "ArrowLeft" });
    expect(documents).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
  });

  it("selects the focused item with Enter and Space", () => {
    const onValueChange = vi.fn();

    render(
      <TreeView aria-label="Files" onValueChange={onValueChange}>
        <TreeItem label="Alpha" value="alpha" />
        <TreeItem label="Beta" value="beta" />
      </TreeView>
    );

    const alpha = getTreeItem("Alpha");
    alpha.focus();
    fireEvent.keyDown(alpha, { key: "Enter" });
    expect(alpha).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(alpha, { key: "ArrowDown" });
    fireEvent.keyDown(getTreeItem("Beta"), { key: " " });
    expect(getTreeItem("Beta")).toHaveAttribute("aria-selected", "true");
    expect(onValueChange).toHaveBeenNthCalledWith(1, "alpha", expect.any(Object));
    expect(onValueChange).toHaveBeenNthCalledWith(2, "beta", expect.any(Object));
  });

  it("supports prefix and repeated-character typeahead across visible items", () => {
    render(
      <TreeView aria-label="Files">
        <TreeItem label="Alpha" value="alpha" />
        <TreeItem label="Beta" value="beta" />
        <TreeItem label={<strong>Bravo</strong>} textValue="Bravo" value="bravo" />
        <TreeItem label="Charlie" value="charlie" />
      </TreeView>
    );

    const alpha = getTreeItem("Alpha");
    alpha.focus();
    fireEvent.keyDown(alpha, { key: "b" });
    expect(getTreeItem("Beta")).toHaveFocus();

    fireEvent.keyDown(getTreeItem("Beta"), { key: "b" });
    expect(getTreeItem("Bravo")).toHaveFocus();
  });

  it("supports no-selection mode and forwards root and item refs and props", () => {
    const treeRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLDivElement>();
    const onValueChange = vi.fn();

    render(
      <TreeView
        ref={treeRef}
        aria-label="Static outline"
        className="custom-tree"
        data-testid="tree"
        onValueChange={onValueChange}
        selectionMode="none"
      >
        <TreeItem
          ref={itemRef}
          aria-label="Custom item name"
          className="custom-item"
          label="Alpha"
          value={1}
        />
      </TreeView>
    );

    const tree = screen.getByTestId("tree");
    const item = screen.getByRole("treeitem", { name: "Custom item name" });
    fireEvent.click(item);

    expect(treeRef.current).toBe(tree);
    expect(itemRef.current).toBe(item);
    expect(tree).toHaveClass("ui-tree-view", "custom-tree");
    expect(item).toHaveClass("ui-tree-item", "custom-item");
    expect(item).not.toHaveAttribute("aria-selected");
    expect(onValueChange).not.toHaveBeenCalled();
    expect(TreeView.displayName).toBe("TreeView");
    expect(TreeItem.displayName).toBe("TreeItem");
  });
});
