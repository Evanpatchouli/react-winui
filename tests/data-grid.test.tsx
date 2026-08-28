import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import DataGrid, {
  type DataGridColumn,
  type DataGridSelectionChangeHandler,
  type DataGridSortChangeHandler
} from "../src/lib/src/components/DataGrid";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

const products: Product[] = [
  { id: "banana", name: "Banana", category: "Fruit", price: 2 },
  { id: "apple", name: "Apple", category: "Fruit", price: 1 },
  { id: "carrot", name: "Carrot", category: "Vegetable", price: 3 }
];

const productColumns: DataGridColumn<Product>[] = [
  { accessor: "name", header: "Name", id: "name", sortable: true },
  { accessor: "category", header: "Category", id: "category" },
  { accessor: "price", header: "Price", id: "price", sortable: true }
];

const getRow = (name: string): HTMLTableRowElement =>
  screen.getByRole("row", { name: new RegExp(name) }) as HTMLTableRowElement;

const getDataCell = (row: HTMLTableRowElement, columnIndex: number): HTMLElement =>
  row.querySelectorAll<HTMLElement>('[role="gridcell"]')[columnIndex];

describe("DataGrid", () => {
  it("renders an accessible empty grid and forwards its root ref", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <DataGrid
        ref={ref}
        label="Inventory"
        noRowsMessage="Nothing in stock"
        gridAriaLabel="Inventory data"
      />
    );

    const grid = screen.getByRole("grid", { name: "Inventory" });
    expect(ref.current).toBe(grid.parentElement?.parentElement);
    expect(screen.getByRole("gridcell", { name: "Nothing in stock" })).toBeInTheDocument();
    expect(grid).toHaveAttribute("aria-readonly", "true");
  });

  it("renders typed accessors, custom cells, column alignment, and widths", () => {
    render(
      <DataGrid
        columns={[
          { accessor: "name", header: "Product", id: "name", width: 180 },
          {
            accessor: "price",
            align: "end",
            header: "Price",
            id: "price",
            renderCell: (item) => `$${item.price}.00`
          }
        ]}
        items={products}
      />
    );

    expect(screen.getByRole("columnheader", { name: "Product" })).toHaveStyle({ width: "180px" });
    expect(screen.getByRole("columnheader", { name: "Price" })).toHaveClass(
      "ui-data-grid-align-end"
    );
    expect(getRow("Banana")).toHaveTextContent("$2.00");
    expect(getRow("Apple")).toHaveTextContent("$1.00");
  });

  it("cycles uncontrolled sorting through ascending, descending, and cleared states", () => {
    const onSortChange = vi.fn<DataGridSortChangeHandler>();

    render(
      <DataGrid
        columns={productColumns}
        getRowId={(item) => item.id}
        items={products}
        onSortChange={onSortChange}
      />
    );

    const sortButton = screen.getByRole("button", { name: "Sort Name ascending" });
    const firstDataRow = () => screen.getAllByRole("row")[1];

    expect(firstDataRow()).toHaveTextContent("Banana");
    fireEvent.click(sortButton);
    expect(firstDataRow()).toHaveTextContent("Apple");
    expect(screen.getByRole("columnheader", { name: "Name" })).toHaveAttribute(
      "aria-sort",
      "ascending"
    );

    fireEvent.click(screen.getByRole("button", { name: "Sort Name descending" }));
    expect(firstDataRow()).toHaveTextContent("Carrot");
    expect(onSortChange).toHaveBeenLastCalledWith(
      { columnId: "name", direction: "descending" },
      expect.anything()
    );

    fireEvent.click(screen.getByRole("button", { name: "Clear sort for Name" }));
    expect(firstDataRow()).toHaveTextContent("Banana");
    expect(onSortChange).toHaveBeenLastCalledWith(null, expect.anything());
  });

  it("supports controlled sorting without taking ownership of the sort state", () => {
    const onSortChange = vi.fn<DataGridSortChangeHandler>();

    const { rerender } = render(
      <DataGrid
        columns={productColumns}
        items={products}
        onSortChange={onSortChange}
        sortState={null}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Sort Name ascending" }));
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("Banana");
    expect(onSortChange).toHaveBeenCalledWith(
      { columnId: "name", direction: "ascending" },
      expect.anything()
    );

    rerender(
      <DataGrid
        columns={productColumns}
        items={products}
        onSortChange={onSortChange}
        sortState={{ columnId: "name", direction: "ascending" }}
      />
    );
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("Apple");
  });

  it("selects one row with a radio control and emits the original item", () => {
    const onSelectionChange = vi.fn<DataGridSelectionChangeHandler>();
    const onRowClick = vi.fn();

    render(
      <DataGrid
        columns={productColumns}
        getRowId={(item) => item.id}
        items={products}
        onRowClick={onRowClick}
        onSelectionChange={onSelectionChange}
        selectionMode="single"
      />
    );

    const appleRadio = screen.getByRole("radio", { name: "Select row: Apple" });
    fireEvent.click(appleRadio);

    expect(appleRadio).toBeChecked();
    expect(onSelectionChange).toHaveBeenCalledWith(["apple"], expect.anything());
    expect(onRowClick).not.toHaveBeenCalled();

    fireEvent.click(getRow("Banana").querySelector('[role="gridcell"]') as HTMLElement);
    expect(onRowClick).toHaveBeenCalledWith(products[0], 0, expect.anything());
    expect(screen.getByRole("radio", { name: "Select row: Banana" })).toBeChecked();
  });

  it("supports multiple selection, disabled rows, select-all, and Ctrl+A", () => {
    const onSelectionChange = vi.fn<DataGridSelectionChangeHandler>();

    render(
      <DataGrid
        columns={productColumns}
        getRowDisabled={(item) => item.id === "apple"}
        getRowId={(item) => item.id}
        items={products}
        onSelectionChange={onSelectionChange}
        selectionMode="multiple"
      />
    );

    const selectAll = screen.getByRole("checkbox", { name: "Select all rows" });
    fireEvent.click(selectAll);
    expect(onSelectionChange).toHaveBeenLastCalledWith(["banana", "carrot"], expect.anything());
    expect(screen.getByRole("checkbox", { name: "Select row: Banana" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Select row: Apple" })).not.toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Select row: Apple" })).toBeDisabled();

    const bananaCell = getDataCell(getRow("Banana"), 0);
    bananaCell.focus();
    fireEvent.keyDown(bananaCell, { ctrlKey: true, key: "a" });
    expect(onSelectionChange).toHaveBeenLastCalledWith(["banana", "carrot"], expect.anything());
  });

  it("moves a single grid tab stop across rows and columns while skipping disabled rows", async () => {
    render(
      <DataGrid
        columns={productColumns}
        getRowDisabled={(item) => item.id === "apple"}
        getRowId={(item) => item.id}
        items={products}
      />
    );

    const bananaNameCell = getDataCell(getRow("Banana"), 0);
    const carrotNameCell = getDataCell(getRow("Carrot"), 0);
    const carrotPriceCell = getDataCell(getRow("Carrot"), 2);

    expect(bananaNameCell).toHaveAttribute("tabindex", "0");
    bananaNameCell.focus();
    fireEvent.keyDown(bananaNameCell, { key: "ArrowDown" });
    await waitFor(() => expect(carrotNameCell).toHaveFocus());

    fireEvent.keyDown(carrotNameCell, { key: "End" });
    await waitFor(() => expect(carrotPriceCell).toHaveFocus());

    fireEvent.keyDown(carrotPriceCell, { ctrlKey: true, key: "Home" });
    await waitFor(() => expect(bananaNameCell).toHaveFocus());

    fireEvent.keyDown(bananaNameCell, { ctrlKey: true, key: "End" });
    await waitFor(() => expect(carrotPriceCell).toHaveFocus());
  });

  it("honors row and root disabled states", () => {
    const onSelectionChange = vi.fn<DataGridSelectionChangeHandler>();

    render(
      <DataGrid
        columns={productColumns}
        disabled
        getRowDisabled={(item) => item.id === "apple"}
        items={products}
        onSelectionChange={onSelectionChange}
        selectionMode="multiple"
      />
    );

    const root = screen.getByRole("grid").parentElement?.parentElement;
    expect(root).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("button", { name: "Sort Name ascending" })).toBeDisabled();
    expect(screen.getByRole("checkbox", { name: "Select all rows" })).toBeDisabled();
    expect(screen.getAllByRole("row")[1]).toHaveAttribute("aria-disabled", "true");

    fireEvent.click(screen.getByRole("checkbox", { name: "Select row: Banana" }));
    expect(onSelectionChange).not.toHaveBeenCalled();
  });

  it("supports compact density, custom root props, and a custom row id", () => {
    const onRowClick = vi.fn();

    render(
      <DataGrid
        aria-label="Compact products"
        columns={productColumns}
        density="compact"
        getRowId={(item) => item.id}
        items={products.slice(0, 1)}
        onRowClick={onRowClick}
        rootClassName="custom-grid"
      />
    );

    const root = screen.getByRole("grid", { name: "Compact products" }).parentElement
      ?.parentElement;
    expect(root).toHaveClass("ui-data-grid", "ui-data-grid-compact", "custom-grid");
    expect(screen.getByRole("row", { name: /Banana/ })).toHaveAttribute(
      "data-rwu-grid-row-id",
      "banana"
    );

    fireEvent.click(getRow("Banana"));
    expect(onRowClick).toHaveBeenCalledWith(products[0], 0, expect.anything());
  });
});
