import BaseButton from "./BaseButton"

const Button = (props) => {
  const baseButton = new BaseButton(props);
  const {className, content, onClick, ...rest} = baseButton.getCommonProps();

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <button type='button'
      onClick={handleClick} className={className} {...rest}
>
        {content}
    </button>
  )
}

export default Button
