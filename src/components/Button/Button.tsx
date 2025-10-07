import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
  className = "",
  testId,
  type = "button",
  "aria-label": ariaLabel = "",
  ...rest
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    size !== "medium" && styles[size],
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      {...rest}
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      data-testid={testId}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
export type { ButtonProps };
