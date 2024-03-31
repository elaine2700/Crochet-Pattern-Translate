import { useEffect } from 'react';
import buttonStyles from './buttons.module.css';

const Button = ({content='Default', type = 'filled', variant= 'primary', onClick = null}) => {

  // Type: filled, outline, or ghost.
  // Variant: primary, secondary, or destructive
  // TODO organize button library and stying.

  const width = 100;
  const height = 100;
  const _variant = variant;
  
  const _onClick = (e) =>{
    e.stopPropagation();
    e.preventDefault();
    if(onClick){
      onClick();
    }
  }

  switch(type){
    case 'filled':
      return (
        <button
          onClick={(e) => _onClick(e)}
          className={`${buttonStyles.btn} ${buttonStyles.btnFilled} ${buttonStyles.btnPrimary}`}>
          {content}
        </button>
      )
    
    case 'outline':
      return (
        <button
          onClick={(e) => _onClick(e)}
          className={`${buttonStyles.btn} ${buttonStyles.btnOutline} ${buttonStyles.btnSecondary}`}>
          {content}
        </button>
      )

    case 'ghost':
      return (
        <button
          onClick={(e) => _onClick(e)}
          className={`${buttonStyles.btn} ${buttonStyles.btnSecondary}`}>
          {content}
        </button>
      )
    
    default:
      return (
        <button className={`${buttonStyles.btn} ${buttonStyles.btnPrimary}`}>
          {content}
        </button>
      )
  }

  
}

export default Button