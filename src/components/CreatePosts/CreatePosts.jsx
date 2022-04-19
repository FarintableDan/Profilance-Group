import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addNew,
} from '../../modules/news';
import './CreatePosts.scss';

export const CreatePosts = (props) => {
  const { createCallBack } = props;
  const [ form, setForm ] = useState({
    title: '',
    description: '',
  });
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.stopPropagation();
    const { title } = form;
    if (title.trim().length) {
      dispatch(addNew(form))
      createCallBack(false);
    }
  }

  const onChangeHandler = (type, value) => {
    return setForm({
      ...form,
      [type]: value
    })
  }

  const fields = [
    {
      name: 'title',
      placeholder: 'Введите тему',
      type: 'input',
      value: form.title
    },
    {
      name: 'description',
      placeholder: 'Введите описание',
      type: 'textarea',
      value: form.description
    },
  ]

  return (
    <div className="posts-create">
      <h3 className="posts-create__title">Создать пост</h3>
      <form onSubmit={(e) => submitHandler(e)} className="posts-create__form">
        {fields.map(field => {
          if (field.type === "input") {
            return (
              <input
                className="input posts-create__form-input"
                type="text"
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => onChangeHandler(field.name, e.target.value)}
                key={field.name}
              />
            )
          }

          if (field.type === "textarea") {
            return (
              <textarea
                className="textarea posts-create__form-textarea"
                name={field.name}
                rows="8"
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => onChangeHandler(field.name, e.target.value)}
                key={field.name}
              />
            )
          }

          return null;
        })}

        <button className="button button_orange" type="submit">Создать</button>
      </form>
    </div>
  )
}