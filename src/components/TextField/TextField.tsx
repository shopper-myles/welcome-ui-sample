import { useState, useId } from "react";
import styles from "./TextField.module.css";
import type { TextFieldProps } from "./TextField.types";

export const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  value,
  defaultValue,
  size = "medium",
  disabled = false,
  error = false,
  helperText,
  required = false,
  type = "text",
  onChange,
  onBlur,
  onFocus,
  className = "",
  testId,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const inputId = useId();
  const helperTextId = useId();

  const isControlled = value !== undefined;
  const inputValue = isControlled ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const containerClasses = [
    styles.container,
    styles[size],
    disabled && styles.disabled,
    error && styles.error,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inputClasses = [styles.input, error && styles.inputError]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses} data-testid={testId}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>

      <input
        id={inputId}
        type={type}
        className={inputClasses}
        placeholder={placeholder}
        value={inputValue}
        disabled={disabled}
        required={required}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        aria-describedby={helperText ? helperTextId : undefined}
        aria-invalid={error}
        data-testid={`${testId}-input`}
      />

      {helperText && (
        <div
          id={helperTextId}
          className={`${styles.helperText} ${error ? styles.errorText : ""}`}
          data-testid={`${testId}-helper`}
        >
          {helperText}
        </div>
      )}
    </div>
  );
};

export default TextField;
export type { TextFieldProps };
