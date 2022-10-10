import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isRender }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameInputChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionInputChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  
  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit-profile'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonName={isRender ? 'Сохранение...' :'Сохранить'}>
      <input id="input-name" name="name" type="text" className="popup__input popup__input_type_name" placeholder="Имя" required minLength="2" maxLength="40" onChange={handleNameInputChange} value={name || ''} />
      <span className="popup__input-error input-name-error"></span>
      <input id="input-description" name="about" type="text" className="popup__input popup__input_type_description" placeholder="Профессиональная деятельность" required minLength="2" maxLength="200" onChange={handleDescriptionInputChange} value={description || ''} />
      <span className="popup__input-error input-description-error"></span>
    </PopupWithForm>

  )
}

export default EditProfilePopup;