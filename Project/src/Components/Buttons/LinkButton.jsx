import {Link} from 'react-router-dom'
import BaseButton from './BaseButton';

const LinkButton = (props) => {
    const baseButton = new BaseButton(props);
    const {className, content, to, ...rest} = baseButton.getCommonProps();
  return (
    <Link to={to} className={className} {...rest}>
        {content}
    </Link>
  )
}

export default LinkButton