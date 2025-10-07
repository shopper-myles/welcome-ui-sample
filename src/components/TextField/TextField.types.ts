import type { ComponentSize, BaseComponentProps } from "~/src/types/common";

export interface TextFieldProps extends BaseComponentProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  size?: ComponentSize;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}
