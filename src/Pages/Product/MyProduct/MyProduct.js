import {useContext, useState} from "react"
import {AuthContext} from "../../../Context/AuthContext"
import s from "./MyProduct.module.css"
import BorderButton from "../../../Components/UI/Button/BackCountButton/BorderButton";
import TakenProduct from "../../../Components/UI/TakenProduct/TakenProduct";

const MyProduct = ({links}) => {
    const {Auth, setAuth} = useContext(AuthContext)
    const [Product, setProduct] = useState(false)
    const [startY, setStartY] = useState(null)
    const [taken, setTaken] = useState([{id: 1, name: "test"}])

    const del = (id) => {
        setTaken(taken.filter(t => t.id !== id))
    }

    const toggleMenu = () => {
        setProduct(!Product);
    };

    const handleTouchStart = (e) => {
        setStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        if (startY && e.touches[0].clientY - startY > 50) {
            setProduct(false);
            setStartY(null);
        } else if (startY && startY - e.touches[0].clientY > 50) {
            setProduct(true);
            setStartY(null);
        }
    };

    return (
        <div
            className={`${s.product__menu}${Product ? ` ${s.open}` : ''}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            <div className={`${s.first_element}${Product ? '' : ` ${s.close_first_element}`}`}>
                <div className={s.title}>Ваша еда</div>
                <img className={s.arrow} src={process.env.PUBLIC_URL + "/arrowUp.svg"} alt={"arrow"} onClick={toggleMenu}/>
            </div>
            <div className={s.menu}>
                {taken.map(t =>
                    <TakenProduct id={t.id} name={t.name} del={del} mass={"1"}/>
                )}
                <BorderButton>Рассчитать</BorderButton>
            </div>
        </div>
    );
};

export default MyProduct;