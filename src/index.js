import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';

import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min';
import CartContext from './contexts/CartContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
function zoom() {
  document.body.style.zoom = "60%"
}
root.render(
  <React.StrictMode>
    <CartContext >
      <App onload={zoom} />
    </CartContext>
  </React.StrictMode>
);


