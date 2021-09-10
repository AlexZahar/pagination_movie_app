import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const titleSearchInput = screen.getByPlaceholderText(/Search your title/i);
  expect(titleSearchInput).toBeInTheDocument();
  expect(titleSearchInput).toHaveAttribute("type", "text");
  expect(screen.getByText("Search")).toBeEnabled();
});

test("Search for a movie title", () => {
  render(<App />);

  const titleSearchInput = screen.getByPlaceholderText(/Search your title/i);
  userEvent.type(titleSearchInput, "Jumbo");
  expect(screen.getByPlaceholderText(/Search your title/i)).toHaveValue(
    "Jumbo"
  );

  fireEvent.click(screen.getByTestId("btn-search-title"));

  expect(screen.getByText(/Title/)).toBeInTheDocument();
});
