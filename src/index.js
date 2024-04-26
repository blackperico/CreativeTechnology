import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home.js';
import Shop from './pages/Shop.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Login from './components/Login.js';
import CreateAccount from './components/CreateAccount.js';
import ResetPassword from './components/ResetPassword.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import accountsResponse from './accounts.json';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  const [login, setLogin] = useState(sessionStorage.getItem('profile') ? true : false);
  const activeAccount = sessionStorage.getItem('profile') ? accountsResponse.find((account) => {
    return account.id === sessionStorage.getItem('profile');
  }) : null;

  function Layout({ children }) {
    return (
      <>
        <Header prop={[login, activeAccount]}/>
          {children}
        <Footer />
      </>
    )
  };

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Login" element={<Login prop = {[login, setLogin]}/>} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();