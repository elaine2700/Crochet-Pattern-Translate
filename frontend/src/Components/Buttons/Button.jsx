import buttonStyles from './buttons.module.css';

const Button = ({
  content='Default', 
  styleType = 'filled', 
  variant= 'primary',
  size='medium',
  use='normal', 
  onClick = null}) => {

  // TODO Accept submit to button Type - Button type : button, submit, reset
  // StyleType: filled, outline, or ghost.
  // Variant: primary, secondary, or destructive
  // Size: small, medium, large
  // Use: normal, icon.

  const getVariantClass = (variant) =>{
    switch (variant) {
      case 'primary':
        return buttonStyles.primary;
      case 'secondary':
        return buttonStyles.secondary;
      case 'destructive':
        return buttonStyles.destructive;
      default:
        return buttonStyles.primary;
    }
  }
  const getTypeClass = (type) =>{
    switch (type){
      case 'filled':
        return buttonStyles.filled;
      case 'outline':
        return buttonStyles.outline;
      case 'ghost':
        return buttonStyles.ghost;
      default:
        return buttonStyles.filled;
    }
  }
  const getSizeClass = (size) =>{
    switch(size){
      case 'small':
        return buttonStyles.small;
      case 'medium':
        return buttonStyles.medium;
      case 'large':
        return buttonStyles.large;
      default:
        return buttonStyles.medium
    }
  }
  const getUseClass = (use) =>{
    switch (use){
      case 'normal':
        return null;
      case 'icon':
        return buttonStyles.icon;
      default:
        return null;
    }
  }

  const variantClass = getVariantClass(variant);
  const typeClass = getTypeClass(styleType);
  const sizeClass = getSizeClass(size);
  const useClass = getUseClass(use);
  
  const _onClick = (e) =>{
    e.stopPropagation();
    e.preventDefault();
    if(onClick){
      onClick();
    }
  }

  return (
    <button type='button'
      onClick={(e) => _onClick(e)}
      className={`${buttonStyles.btn} ${typeClass} ${variantClass} ${sizeClass} ${useClass}`}>
      {content}
    </button>
  )
}

export default Button