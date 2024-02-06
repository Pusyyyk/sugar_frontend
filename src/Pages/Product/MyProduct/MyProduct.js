import {useContext, useState} from "react"
import s from "./MyProduct.module.css"
import TakenProduct from "../../../Components/UI/TakenProduct/TakenProduct";
import {TakenContext} from "../../../Context/TakenContext";
import BackCountButton from "../../../Components/UI/Button/BackCountButton/BorderButton";

const MyProduct = () => {
    const [Product, setProduct] = useState(false)
    const [startY, setStartY] = useState(null)
    const {Taken, setTaken} = useContext(TakenContext)

    const del = (id) => {
        setTaken(Taken.filter(t => t.del_id !== id))
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
                {Taken.map((t, index) =>
                    <TakenProduct key={index} name={t.name} del_id={t.del_id} del={del} mass={t.gr}/>
                )}
                <BackCountButton>Рассчитать</BackCountButton>
            </div>
        </div>
    );
};

export default MyProduct;