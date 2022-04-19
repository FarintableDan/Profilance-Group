import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  auth,
  clearSubmitError
} from '../../modules/auth';
import { selectSubmitError } from "../../modules/auth";
import { loginValidate, passwordValidate } from "../../modules/helpers";
import './Login.scss';

export const Login = () => {
  const dispatch = useDispatch();
  const submitError = useSelector(selectSubmitError);
  const [ form, setForm ] = useState({
    login: '',
    password: ''
  });
  const [ errors, setErrors ] = useState([]);

  const inputHandler = (type, value) => {
    setForm({
      ...form,
      [type]: value
    })
  };

  const logIn = (e) => {
    e.preventDefault();
    dispatch(clearSubmitError())
    setErrors([]);
    if (Object.keys(form).every(item => fields[item].validateRules(form[item]))) {
      dispatch(auth(form));
    }
  };

  const fields = {
    "login": {
      placeholder: 'Логин',
      validateRules: (value) => {
        return loginValidate(value, (data) => {
          setErrors(data)
        })
      },
      type: 'text'
    },
    "password": {
      placeholder: 'Пароль',
      validateRules: (value) => {
        console.log(value)
        return passwordValidate(value, (data) => {
          setErrors(data)
        })
      },
      type: 'password'
    }
  };

  console.log(errors)

  return (
    <div className="login">
      <h3 className="login-title">
        Авторизация
      </h3>
      <form className="login-form" onSubmit={(e) => logIn(e)}>
        {Object.keys(fields).map(field => (
          <input
            value={form[field]}
            name={field}
            onChange={(e) => inputHandler(field, e.target.value)}
            type={fields[field].type}
            placeholder={fields[field].placeholder}
            className="login-form__input input"
            key={field}
          />
        ))}
        {(errors.length > 0 || submitError) && (
          <div className="login-form__errors">
            {errors.map((error, k) => (
              <div className="login-form__errors-error" key={k}>
                *{error}
              </div>
            ))}
            {submitError && (
              <div className="login-form__errors-error">
                *Проверьте введенные данные и повторите попытку
              </div>
            )}
          </div>
        )}
        <button className="button button_orange login-form__button" type="submit" value="submit">Войти</button>
      </form>
    </div>
  )
}