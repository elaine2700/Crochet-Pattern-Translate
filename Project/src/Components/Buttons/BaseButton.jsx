import {Component} from 'react';
import buttonStyles from './buttons.module.css';
// styleType: filled, outline, or ghost.
// variant: primary, secondary, or destructive
// Size: small, medium, large
// use: normal, icon.
class BaseButton extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    getVariantClass = (variant) =>{
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
    getTypeClass = (type) =>{
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
    getSizeClass = (size) =>{
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
    getUseClass = (use) =>{
        switch (use){
        case 'normal':
            return null;
        case 'icon':
            return buttonStyles.icon;
        default:
            return null;
        }
    }

    getClassName() {
        const { styleType, variant, size, use } = this.props;
        const variantClass = this.getVariantClass(variant);
        const typeClass = this.getTypeClass(styleType);
        const sizeClass = this.getSizeClass(size);
        const useClass = this.getUseClass(use);
        return `${buttonStyles.btn} ${typeClass} ${variantClass} ${sizeClass} ${useClass}`;
    }
    getCommonProps() {
        return {
            className: this.getClassName(),
            content: this.props.content,
            ...this.props
        };
    }
}

export default BaseButton;