import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './components/Login';
import Playlists from './components/Playlists';
import { BrowserRouter } from 'react-router-dom';
import Menu from './components/Header';

const token = window.localStorage.getItem('token');
// const clientID = 'af6fe4b7a75e4651bd1531de3f541e53';
// const redirectUrl = 'http://localhost:3000';
// const apiUrl = 'https://accounts.spotify.com/authorize';
// const responseType = 'token';
// const scope = [
//     'streaming',
//     'user-read-email',
//     'user-read-private',
//     'user-modify-playback-state',
//     'user-read-playback-state',
//     'user-read-currently-playing',
//     'user-read-recently-played',
//     'user-read-playback-position',
//     'user-top-read',
//     'user-library-read',
//     'user-library-modify',
// ];
// const handleClick = () => {
//     window.location.href = `${apiUrl}?client_id=${clientID}&redirect_uri=${redirectUrl}&scope=${scope.join(
//         '%20'
//     )}&response_type=${responseType}&show_dialog=true`;
// };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);
