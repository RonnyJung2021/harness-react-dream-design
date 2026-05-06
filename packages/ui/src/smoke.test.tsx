import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ConfigProvider } from "./ConfigProvider";

describe("vitest smoke", () => {
  it("renders ConfigProvider wrapping a fragment", async () => {
    const user = userEvent.setup();
    render(
      <ConfigProvider>
        <>
          <button type="button">smoke</button>
        </>
      </ConfigProvider>,
    );

    await user.click(screen.getByRole("button", { name: "smoke" }));
    expect(screen.getByRole("button", { name: "smoke" })).toBeInTheDocument();
    expect(document.querySelector(".hrd-config-provider")).toHaveAttribute(
      "data-theme",
      "default",
    );
  });
});
