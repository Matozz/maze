import React, { useState, useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import "./switch.css";
import { hexToRGB } from "../../../util/hexToRGB";

/**
 * @type React.ForwardRefRenderFunction<HTMLInputElement, SwitchPropTypes>
 */
export const Switch = forwardRef(
  (
    {
      // checked,
      size,
      disabled,
      name,
      label,
      value,
      onChange,
      color,
      style,
      ...props
    },
    ref
  ) => {
    const [cssProperties, setCssProperties] = useState({});
    useEffect(() => {
      setCssProperties({ "--maze-main-theme": hexToRGB(color) });
      return () => {};
    }, [color]);
    return (
      <>
        <label
          className={[
            "maze-switch",
            disabled && "maze-switch-disabled",
            `maze-switch--${size}`,
          ].join(" ")}
          style={{ ...cssProperties, ...style }}
          {...props}
        >
          <input type="checkbox" ref={ref} disabled={disabled} />
          <span>{label}</span>
        </label>
      </>
    );
  }
);

const SwitchPropTypes = {
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  /**
   * What background color to use
   */
  color: PropTypes.string,
  // checked: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Switch.propTypes = SwitchPropTypes;

Switch.defaultProps = {
  // checked: false,
  size: "medium",
  disabled: false,
  color: "#1976d2",
};