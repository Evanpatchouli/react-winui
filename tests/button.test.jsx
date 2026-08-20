import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Button from "../src/lib/src/components/Button/index.js";

describe("Button", () => {
  it("keeps the legacy value prop and handles click events", () => {
    const onClick = vi.fn();

    render(<Button value="Save" onClick={onClick} />);

    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders the disabled state", () => {
    render(<Button value="Save" disabled />);

    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });
});
