import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginApp from './pages/LoginApp';
import Home from './pages/Home.js';
import Shop from './pages/Shop.js';
import Header from './components/Header.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const isLogged = false;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="Shop" element={<Shop />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();