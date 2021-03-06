import React from "react";
import { useMergedThemeProps } from "../../..";
import styles from "./DialogContent.module.scss";

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Display the top and bottom dividers.
   */
  dividers?: boolean;
  style?: React.CSSProperties;
}

export const DialogContent = ({
  children,
  dividers = false,
  ...oldProps
}: DialogContentProps) => {
  const { theme, style, ...props } = useMergedThemeProps({
    name: "DialogContentText",
    oldProps: oldProps,
  });
  return (
    <div
      className={`maze-dialog-content ${
        dividers ? "maze-dialog-dividers" : ""
      } ${styles.content}`}
      {...props}
      style={{
        borderColor:
          theme === "dark"
            ? "rgba(255, 255, 255, 0.12)"
            : "rgba(0, 0, 0, 0.12)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
