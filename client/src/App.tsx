import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Login from './pages/auth/Login';
import NotFound from './pages/404/NotFound';
import Register from './pages/auth/Register';
import { store } from './store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <Router>
        <Provider store={store}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/sign-up" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Provider>
      </Router>
    </>
  );
}

export default App;
