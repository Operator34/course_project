import React from 'react';
import ReactDOM from 'react-dom/client';

import "bootstrap/dist/css/bootstrap.css"
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './app/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)

reportWebVitals();
