import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/*  Custom  Styles  */
import './assets/css/config_profile/config_profile.css'
import './assets/css/home/home.css'
import './assets/css/login_sign_up/login_sign_up.css'
import './assets/css/post/post.css'
import './assets/css/profile/profile.css'
import './assets/css/sign_up/sign_up.css'
import './assets/css/upload_image/upload_image.css'
import './assets/css/users_registered/users_registered.css'
import './assets/css/posts_created/posts_created.css'
import './assets/css/notifications/notifications.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
