import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api.js';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth.js';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const history = useHistory();
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltip, setInfoTooltip] = React.useState({ isOpen: false, successful: false });
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [renderSaving, setRenderSaving] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);

  function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  React.useEffect(() => {
    checkToken();
  }, []);

  React.useEffect(() => {
    if (!loggedIn) {
      history.push('/sign-in');
    }
  }, [loggedIn, history]);

  const handleRegister = (email, password) => {
    setRenderSaving(true);
    auth.register(email, password).then((data) => {
      if (data) {
        handleInfoTooltip(true);
        history.push('/sign-in');
      }
    })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip(false);
      })
      .finally(() => {
        setRenderSaving(false);
      })
  }

  const handleLogin = (email, password) => {
    setRenderSaving(true);
    auth.login(email, password).then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        setEmail(email);
        checkToken();
        setLoggedIn(true);
        history.push('/');
      }
    })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip(false);
      })
      .finally(() => {
        setRenderSaving(false);
      })
  }

  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmail('');
    history.push('/sign-in');
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id === card._id ? false : true));

    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.toggleLike(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleUpdateUser = (user) => {
    setRenderSaving(true);
    api.saveUserChanges(user).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderSaving(false);
      });
  }

  const handleUpdateAvatar = (avatar) => {
    setRenderSaving(true);
    api.changeAvatar(avatar).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderSaving(false);
      });
  }

  const handleAddPlaceSubmit = (card) => {
    setRenderSaving(true);
    api.addNewCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderSaving(false);
      })
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltip(false);
  }

  const handleInfoTooltip = (res) => {
    setInfoTooltip({ ...isInfoTooltip, isOpen: true, successful: res });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header
          email={email}
          onSignOut={handleSignOut}
        />

        <Switch>

          <Route path='/react-mesto-api-full/sign-up'>
            <Register
              onRegister={handleRegister}
              isRender={renderSaving}
            />
          </Route>

          <Route path='/react-mesto-api-full/sign-in'>
            <Login
              onLogin={handleLogin}
              isRender={renderSaving}
            />
          </Route>

          <ProtectedRoute
            path='/react-mesto-api-full'
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />

          <Route exact path="/react-mesto-api-full/">
            {loggedIn ? <Redirect to='/react-mesto-api-full/' /> : <Redirect to='/react-mesto-api-full/sign-in' />}
          </Route>

        </Switch>

        <Footer />

        <InfoTooltip
          result={isInfoTooltip}
          onClose={closeAllPopups}
          isRender={renderSaving}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isRender={renderSaving}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isRender={renderSaving}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
          isRender={renderSaving}
        />

        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
        />
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
