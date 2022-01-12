import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("Header component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Header />);

    screen.logTestingPlaygroundURL();

    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Posts")).toBeInTheDocument();
  });
});
