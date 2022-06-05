import { forwardRef } from "react";
/**
 * An input with left and right icons.
 * Created with signup/login form in focus. Can be generalised for other
 * cases by styling the div wrapping it all */
function InputBase(props, ref) {
  const {
    className = "",
    leftIcon = <></>,
    rightIcon = <></>,
    onRightIconClick = null,
    ...rest
  } = props;
  const divProps = { className: className.concat(" input-container") };
  return (
    <div {...divProps}>
      <span className="input-container_icon">{leftIcon}</span>
      <input className="input-container_input" {...rest} ref={ref} />
      <span className="input-container_icon" onClick={onRightIconClick}>
        {rightIcon}
      </span>
    </div>
  );
}
export const Input = forwardRef(InputBase);