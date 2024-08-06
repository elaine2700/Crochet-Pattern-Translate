import LinkButton from "./LinkButton";
const BuyMeACoffeeButton = () => {
  return (
    <LinkButton 
        to="https://www.buymeacoffee.com/crochetspacecraft"
        target="_blank"
        content={<img className="fit" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" style={{height: '38px'}} alt="Buy Me A Coffee"/>}
        size="small"
    />
  )
}

export default BuyMeACoffeeButton;

