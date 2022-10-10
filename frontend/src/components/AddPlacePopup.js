import PopupWithForm from "./PopupWithForm";
import React  from "react";


function EditProfilePopup({isOpen, onClose, onAddCard, isRender}) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
      }, [isOpen]); 

    function handleNameInputChange(e){
        setName(e.target.value);
    }

    function handleLinkInputChange(e){
        setLink(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        onAddCard({
            name,
            link
          });
        
    }
    
    return (
        <PopupWithForm
        title='Новое место'
        name='add-photo'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        buttonName={isRender ? 'Сохранение...' :'Создать'}>
        <input id="input-title" name="name" type="text" className="popup__input popup__input_type_title" placeholder="Название" required minLength="2" maxLength="30" onChange={handleNameInputChange} value={name}/>
        <span className="popup__input-error input-title-error"></span>
        <input id="input-link" name="link" type="url" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" required onChange={handleLinkInputChange} value={link}/>
        <span className="popup__input-error input-link-error"></span>
      </PopupWithForm>
    )
}

export default EditProfilePopup;