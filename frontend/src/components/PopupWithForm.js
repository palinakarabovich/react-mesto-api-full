function PopupWithForm({ title, name, isOpen, children, onClose, onSubmit, buttonName }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container popup__container_type_edit">
                <button className="popup__close-button" type="button" aria-label="Close popup" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form className="popup__form" name={`popup-${name}-form`} id={`popup-${name}-form`} onSubmit={onSubmit}>
                    {children}
                    <button className="popup__save-button" type="submit" value="Save">{buttonName}</button> 
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;