import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../../pages";

describe("Home Page test", () => {
  it("renders correctly", () => {
    const { getByText, getByAltText } = render(<Home />);

    expect(getByText("Olá Dev!")).toBeInTheDocument();
    expect(getByAltText("Home Image")).toBeInTheDocument();
  });
});
