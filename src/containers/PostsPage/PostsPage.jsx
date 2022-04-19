import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectNewsData,
  approveNew,
  removeNew,
} from '../../modules/news';
import {
  selectUserRole
} from '../../modules/auth';
import { Modal } from "../../components/Modal/Modal";
import { CreatePosts } from "../../components/CreatePosts/CreatePosts";
import './PostsPage.scss';

export const PostsPage = () => {
  const [search, setSearch] = useState('');
  const [postModal, setPostsModal] = useState(false);
  const dispatch = useDispatch();
  const newsData = useSelector(selectNewsData);
  const userRole = useSelector(selectUserRole);
  const isAdmin = userRole === 'admin';
  const isUser = userRole === 'user';

  const adminButtons = [
    {
      name: 'approve',
      action: (id) => dispatch(approveNew(id)),
      text: 'Одобрить',
      color: 'orange'
    },
    {
      name: 'remove',
      action: (id) => dispatch(removeNew(id)),
      text: 'Удалить',
      color: 'red'
    },
  ];

  const sortDataBySearch = () => {
    if (search.trim().length && newsData.length) {
      return newsData.filter(item => item.title.indexOf(search.trim()) !== -1);
    }
    return newsData;
  }

  return (
    <section className="section posts">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input posts-search__input"
        placeholder="Введите название поста для сортировки"
      />
      {isUser && (
        <button className="posts-create__button button" onClick={() => setPostsModal(true)}>Создать пост</button>
      )}
      {sortDataBySearch().map(item => {
        if (!item.approved && !isAdmin) return null;
        return (
          <div key={item.id} className="posts-item">
            {item.date && (
              <div className="posts-item__date">
                {item.date}
              </div>
            )}
            {item.title && (
              <div className="posts-item__title">
                {item.title}
              </div>
            )}
            {item.description && (
              <div className="posts-item__description">
                {item.description}
              </div>
            )}
            {isAdmin && !item.approved && (
              <div className="posts-item__footer">
                {adminButtons.map(button => (
                  <button className={`button button_${button.color}`} key={button.name} onClick={() => button.action(item.id)}>{button.text}</button>
                ))}
              </div>
            )}
          </div>
        )
      })}
      {postModal && (
        <Modal toggleModal={() => setPostsModal(false)}>
          <CreatePosts createCallBack={setPostsModal}/>
        </Modal>
      )}
    </section>
  )
}