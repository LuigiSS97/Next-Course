import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ActiveLink from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

test("renders correctly", () => {
  render(
    <ActiveLink href="/" activeClassName="active">
      <a>Home</a>
    </ActiveLink>
  );

  expect(screen.getByText("Home")).toBeInTheDocument();
});
