import imgSuccess from '../images/entrance-success.svg';
import imgError from '../images/entrance-error.svg';

function InfoTooltip({ onClose, result: { isOpen, successful } }) {
    return (
        <div className={`popup popup_type_entrance ${isOpen && 'popup_opened'}`}>
            <div className="popup__container popup__container_type_entrance">
                <button className="popup__close-button" type="button" aria-label="Закрыть окно" onClick={onClose}></button>
                <img className="popup__photo popup__photo_type_entrance" src={successful ? imgSuccess : imgError} />
                <h2 className="popup__title popup__title_type_entrance">{successful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;