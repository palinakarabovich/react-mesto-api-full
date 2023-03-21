import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onAddPlace, onCardClick, onEditAvatar, onEditProfile, onCardLike, onCardDelete, cards }) {

    const currentUser = React.useContext(CurrentUserContext);

    const cardElements = cards.map((item) => {
        return <Card element={item} key={item._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
    })

    return (
        <main className="content">
            <section className="profile page__center">
                <div className="profile__content">
                    <div className="profile__pic">
                        <img src={currentUser.avatar} alt="Avatar" className="profile__avatar" />
                        <button className="profile__avatar-edit-button" aria-label="Change avatar" onClick={onEditAvatar}></button>
                    </div>
                    <div className="profile__info">
                        <div className="profile__info-row">
                            <h1 className="profile__info-name">{currentUser.name}</h1>
                            <button className="profile__info-edit-button" type="button" aria-label="Edit profile" onClick={onEditProfile}></button>
                        </div>
                        <p className="profile__info-caption">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-photo-button" type="button" aria-label="Add card" onClick={onAddPlace}></button>
            </section>
            <section className="elements page__center">
                {cardElements}
            </section>
        </main>
    )
}

export default Main;