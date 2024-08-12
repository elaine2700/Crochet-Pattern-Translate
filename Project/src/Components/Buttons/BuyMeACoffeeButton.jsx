import LinkButton from "./LinkButton";
const BuyMeACoffeeButton = () => {
  return (
    <LinkButton 
        to="https://www.buymeacoffee.com/crochetspacecraft"
        target="_blank"
        content={<p><span>🧶</span>Buy me yarn</p>}
        size="medium"
    />
  )
}

export default BuyMeACoffeeButton;

