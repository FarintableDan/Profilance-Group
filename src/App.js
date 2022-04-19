import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.scss';
import {
  selectLoginModal,
  toggleLoginModal,
} from './modules/auth';
import { HomePage } from "./containers/HomePage/HomePage";
import { Login } from "./components/LoginModal/Login";
import { Header } from "./components/Header/Header";
import { Modal } from "./components/Modal/Modal";
import { PostsPage } from "./containers/PostsPage/PostsPage";

function App() {
  const loginModalState = useSelector(selectLoginModal);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<PostsPage />} />
        </Routes>
      </Router>
      {loginModalState && (
        <Modal
          toggleModal={() => dispatch(toggleLoginModal())}
        >
          <Login />
        </Modal>
      )}
    </div>
  );
}

export default App;
