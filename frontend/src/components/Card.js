import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ element, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = element.owner === currentUser._id;
    const isLiked = element.likes.some(i => i === currentUser._id);

    const cardDeleteButtonClassName = (
        `elements__card-delete-button ${isOwn ? 'elements__card-delete-button_visible' : 'elements__card-delete-button_hidden'}`
    );

    const cardLikeButtonClassName = (
        `elements__card-caption-like-button ${isLiked ? 'elements__card-caption-like-button_active' : ''}`
    );

    function handleDeleteClick() {
        onCardDelete(element);
    }

    function handleLikeClick() {
        onCardLike(element);
    }

    function handleImageClick() {
        onCardClick(element);
    }

    return (
        <article id="card">
            <div className="elements__card">
                <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить фото" onClick={handleDeleteClick}></button>
                <img className="elements__card-pic" src={element.link} alt={element.name} onClick={handleImageClick} />
                <div className="elements__card-caption">
                    <h2 className="elements__card-caption-title">{element.name}</h2>
                    <div className="elements__card-caption-like-container">
                        <button className={cardLikeButtonClassName} type="button" aria-label="Нравится" onClick={handleLikeClick}></button>
                        <p className="elements__card-caption-like-sum">{element.likes.length}</p>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default Card;