import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/auth/Login';
import NotFound from './pages/404/NotFound';
import Register from './pages/auth/Register';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Global } from '@emotion/react';
import { globalCss } from './theme/theme';

function App() {
  return (
    <>
      <Global styles={globalCss} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Router>
        <Provider store={store}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/sign-up" element={<Register />} />

            <Route path="/dashboard" element={<div>Dashboard</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Provider>
      </Router>
    </>
  );
}

export default App;
