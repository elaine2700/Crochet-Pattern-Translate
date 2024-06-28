import buttonStyles from './buttons.module.css';

const Button = ({content='Default', type = 'filled', variant= 'primary', onClick = null}) => {

  // Type: filled, outline, or ghost.
  // Variant: primary, secondary, or destructive

  const getVariantClass = (variant) =>{
    switch (variant) {
      case 'primary':
        return buttonStyles.btnPrimary;
      case 'secondary':
        return buttonStyles.btnSecondary;
      case 'destructive':
        return buttonStyles.btnDestructive;
      default:
        return buttonStyles.btnPrimary;
    }
  }
  const getTypeClass = (type) =>{
    switch (type){
      case 'filled':
        return buttonStyles.btnFilled;
      case 'outline':
        return buttonStyles.btnOutline;
      case 'ghost':
        return buttonStyles.btnGhost;
      default:
        return buttonStyles.btnFilled;
    }
  }

  const variantClass = getVariantClass(variant);
  const typeClass = getTypeClass(type);
  
  const _onClick = (e) =>{
    e.stopPropagation();
    e.preventDefault();
    if(onClick){
      onClick();
    }
  }

  return (
    <button
      onClick={(e) => _onClick(e)}
      className={`${buttonStyles.btn} ${typeClass} ${variantClass}`}>
      {content}
    </button>
  )
}

export default Button