import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AnimatedRoutes from './AnimatedRoutes';
import reportWebVitals from './reportWebVitals';
import BackgroundMusic from './BackgroundMusic';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <BackgroundMusic />
    <AnimatedRoutes />
  </BrowserRouter>
);

reportWebVitals();
