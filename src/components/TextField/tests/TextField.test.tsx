import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextField from "../TextField";

describe("TextField Component", () => {
  it("renders with default props", () => {
    render(<TextField />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<TextField label="Name" />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("renders with placeholder", () => {
    render(<TextField placeholder="Enter your name" />);
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
  });

  it("handles controlled value", () => {
    const handleChange = vi.fn();
    render(<TextField value="test value" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("test value");
  });

  it("handles uncontrolled value with defaultValue", () => {
    render(<TextField defaultValue="default test" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("default test");
  });

  it("calls onChange when typing", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<TextField onChange={handleChange} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "hello");
    expect(handleChange).toHaveBeenCalledTimes(5); // Called for each character
    expect(handleChange).toHaveBeenLastCalledWith("hello");
  });

  it("calls onFocus when focused", async () => {
    const handleFocus = vi.fn();
    const user = userEvent.setup();

    render(<TextField onFocus={handleFocus} />);
    const input = screen.getByRole("textbox");

    await user.click(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it("calls onBlur when blurred", async () => {
    const handleBlur = vi.fn();
    const user = userEvent.setup();

    render(<TextField onBlur={handleBlur} />);
    const input = screen.getByRole("textbox");

    await user.click(input);
    await user.tab();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it("renders required indicator", () => {
    render(<TextField label="Email" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders helper text", () => {
    render(<TextField helperText="This is helpful" testId="test-field" />);
    expect(screen.getByTestId("test-field-helper")).toHaveTextContent(
      "This is helpful"
    );
  });

  it("renders error state", () => {
    render(<TextField error helperText="Error message" testId="test-field" />);
    const input = screen.getByRole("textbox");
    const helper = screen.getByTestId("test-field-helper");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(helper).toHaveTextContent("Error message");
  });

  it("renders disabled state", () => {
    render(<TextField disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("renders different input types", () => {
    const { rerender } = render(<TextField type="email" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");

    rerender(<TextField type="password" />);
    expect(screen.getByLabelText(/password/i)).toHaveAttribute(
      "type",
      "password"
    );

    rerender(<TextField type="number" />);
    expect(screen.getByRole("spinbutton")).toHaveAttribute("type", "number");
  });

  it("applies custom className", () => {
    render(<TextField className="custom-class" testId="test-field" />);
    expect(screen.getByTestId("test-field")).toHaveClass("custom-class");
  });

  it("applies testId to input element", () => {
    render(<TextField testId="my-field" />);
    expect(screen.getByTestId("my-field-input")).toBeInTheDocument();
  });

  it("associates helper text with input using aria-describedby", () => {
    render(<TextField helperText="Helper text" testId="test-field" />);
    const input = screen.getByRole("textbox");
    const helper = screen.getByTestId("test-field-helper");

    expect(input).toHaveAttribute("aria-describedby", helper.id);
  });

  it("handles uncontrolled input changes", async () => {
    const user = userEvent.setup();
    render(<TextField defaultValue="" />);

    const input = screen.getByRole("textbox");
    await user.type(input, "test");

    expect(input).toHaveValue("test");
  });

  it("renders different sizes", () => {
    const { rerender } = render(<TextField size="small" testId="test-field" />);
    expect(screen.getByTestId("test-field")).toBeInTheDocument();

    rerender(<TextField size="medium" testId="test-field" />);
    expect(screen.getByTestId("test-field")).toBeInTheDocument();

    rerender(<TextField size="large" testId="test-field" />);
    expect(screen.getByTestId("test-field")).toBeInTheDocument();
  });

  it("handles form submission", () => {
    const handleSubmit = vi.fn();

    render(
      <form onSubmit={handleSubmit}>
        <TextField required />
        <button type="submit">Submit</button>
      </form>
    );

    const form = screen.getByRole("textbox").closest("form");
    fireEvent.submit(form!);

    // The form should handle required field validation
    expect(screen.getByRole("textbox")).toBeRequired();
  });
});
