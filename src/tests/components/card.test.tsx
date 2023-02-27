import React from "react";
import { render } from "@testing-library/react";
import Card from "../../components/card";

describe("Card Component", () => {
  it("default window", async () => {
    const { getByTestId } = render(<Card />);

    expect(getByTestId("message")).toBeInTheDocument();
  });
});
