export type ComponentSize = "small" | "medium" | "large";
export type ComponentVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "warning"
  | "danger"
  | "info";

export interface BaseComponentProps {
  className?: string;
  testId?: string;
}
