import type {
  ComponentSize,
  ComponentVariant,
  BaseComponentProps,
} from "~/src/types/common";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}
export interface ButtonProps extends BaseComponentProps {
  children: React.ReactNode;
  variant?: ComponentVariant;
  size?: ComponentSize;
  disabled?: boolean;
  onClick?: () => void;
}
