import { Link } from "react-router-dom";

const HomeCard = ({settings}) => {

    return (
        <div 
            className='home-card'
            style={{backgroundImage: `url(${settings.imgPath})` }}
            >
            <Link 
            className="btn-primary"
            to={settings.linkTo}>
                {settings.buttonText}
            </Link>
        </div>
    )
}

export default HomeCard
