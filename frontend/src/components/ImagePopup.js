function ImagePopup({ card, onClose }) {
    return (
        <section className={`popup popup_type_photo ${card !== null && 'popup_opened'}`}>
            <div className="popup__container popup__container_type_photo">
                <button className="popup__close-button" type="button" aria-label="Закрыть окно" onClick={onClose}></button>
                <img className="popup__photo" src={card?.link} alt={card?.name} />
                <h2 className="popup__photo-title">{card?.name}</h2>
            </div>
        </section>
    )
}

export default ImagePopup;