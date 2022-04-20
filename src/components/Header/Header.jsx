import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleLoginModal,
  selectUserInfo,
  logOut
} from '../../modules/auth'
import './Header.scss';
import logo from './logo.svg';

export const Header = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(selectUserInfo);
  const clickHandler = () => {
    if (!isLogin) {
      dispatch(toggleLoginModal())
    } else {
      dispatch(logOut())
    }
  };
  const nav = [
    {
      link: '/new',
      name: 'Новости'
    }
  ];
  return (
    <div className="header">
      <div className="header__container">
        <Link to="/" className="header-logo">
          <img src={logo} className="header-logo__image" alt="logo" />
        </Link>
        <div className="header__nav">
          {nav.map(item => (
            <Link className="link header__link" key={item.name} to={item.link}>
              {item.name}
            </Link>
          ))}
        </div>
        <button
          className="button button_orange"
          onClick={() => clickHandler()}
        >
          {!isLogin ? 'Войти' : 'Выйти'}
        </button>
      </div>
    </div>
  )
}