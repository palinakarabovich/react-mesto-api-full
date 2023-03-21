import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditProfilePopup({ isOpen, onClose, onUpdateAvatar, isRender }) {
  
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.value='';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      link: inputRef.current.value,
    });

  }

  return (
    <PopupWithForm
      title='Change avatar'
      name='edit-avatar'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonName={isRender ? 'Saving...' :'Save'}>
      <input id="input-avatar-link" name="link" type="url" className="popup__input popup__input_type_avatar-link" placeholder="Link: https://some.site/image.jpg" required ref={inputRef} />
      <span className="popup__input-error input-avatar-link-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;