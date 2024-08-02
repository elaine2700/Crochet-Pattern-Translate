import LinkButton from "./LinkButton";
const BuyMeACoffeeButton = () => {
//<a href="https://www.buymeacoffee.com/crochetspacecraft" target="_blank">
        //<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={styles.image} />
    //</a>
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

