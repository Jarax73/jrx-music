import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SpotifyApiContext, SpotifyApiAxiosContext } from 'react-spotify-api';
// import { StateProvider } from './components/Artist/Artist';
// import reducer, {initialState} from './apis/reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SpotifyApiAxiosContext.Provider>
        <SpotifyApiContext.Provider>
            <App />
        </SpotifyApiContext.Provider>
    </SpotifyApiAxiosContext.Provider>
);
