import buttonStyles from './buttons.module.css';

const Button = ({content='Default', variant = 'primary', onClick = null}) => {

  // TODO organize button library and stying.

  const width = 100;
  const height = 100;
  const _variant = variant;
  
  const _onClick = (e) =>{
    e.stopPropagation();
    e.preventDefault();
    onClick();
  }


  switch(_variant){
    case 'primary':
      return (
        <button
          onClick={(e) => _onClick(e)}
          className={`${buttonStyles.btn} ${buttonStyles.btnPrimary}`}>
          {content}
        </button>
      )
    
    case 'secondary':
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