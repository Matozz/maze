import React, { useState, useEffect, forwardRef } from "react";
import "./Button.css";
import { hexToRGB } from "../../../util/function/hexToRGB";
import { useMergedThemeProps } from "../../../styles";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement>;
  /**
   * Button variants
   */
  variant?: "text" | "contained" | "outlined";
  /**
   * What background color to use
   */
  color?: string;
  /**
   * What text color to use
   */
  textColor?: string;
  /**
   * If it is a icon button
   */
  icon?: boolean;
  disabled?: boolean;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  children?: React.ReactNode;
  // label: string;
  /**
   * Optional click handler
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  preventElevation?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      icon,
      preventElevation,
      children,
      variant,
      disabled,
      size,
      ...oldProps
    }: ButtonProps,
    ref
  ) => {
    const [cssProperties, setCssProperties] = useState({});

    const { color, textColor, style, theme, ...props } = useMergedThemeProps({
      name: "Button",
      oldProps: oldProps,
      defaultProps: { color: "#1976d2" },
    });

    const mode =
      variant === "text"
        ? "maze-button--text"
        : variant === "outlined"
        ? "maze-button--outlined"
        : "maze-button--contained";

    useEffect(() => {
      setCssProperties({
        "--maze-main-theme": hexToRGB(color),
      });
      return () => {
        null;
      };
    }, [color]);

    return (
      <button
        type="button"
        className={[
          "maze-button",
          `maze-button--${size}`,
          `maze-button--${theme}`,
          preventElevation ? "maze-button--noelevation" : "",
          icon ? "maze-button--icon" : "",
          mode,
        ].join(" ")}
        {...props}
        disabled={disabled}
        style={{
          ...cssProperties,
          ...style,
          color: textColor,
        }}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

Button.defaultProps = {
  color: "#1976d2",
  variant: "contained",
  size: "medium",
  type: "button",
};
