import React, {useEffect, useState} from 'react';
import axios from "axios";
import Menu from './components/Header';
import Player from './components/Player';
import Home from './components/Home';
import Aside from './components/Aside';
import {RiSearch2Line} from 'react-icons/ri';
import RecentlyPlayed from './components/RecentlyPlayed';
import SearchArtists from './components/SearchArtists';


export default function App() {
  const clientID = "af6fe4b7a75e4651bd1531de3f541e53";
    const redirectUrl = "http://localhost:3000";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const responseType = "token";
    const scope = [
        "streaming",
        "user-read-email", 
        "user-read-private", 
        "user-modify-playback-state",
        "user-read-playback-state", 
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-position",
        "user-top-read",
        "user-library-read",
        "user-library-modify"
    ];
    const [token, setToken] = useState ("");
    const [profile, setProfile] = useState ("");
    const [playlists, setPlaylists] = useState ("");
    const [url, setUrl] = useState ("");
    
    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem ("token");

        if(!token && hash){
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
            window.location.hash = "";
            window.localStorage.setItem ("token", token);
            
            console.log(localStorage);
        }
        setToken(token);
        
        axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Accept: "application/json",
                'Content-type': "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => setProfile(response.data)).catch(error => console.log(error));

        // axios.get("https://api.spotify.com/v1/me/playlists", {
        //     Headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${token}`
        //     }
        // }).then(response => setPlaylists(response.data)).catch(error => console.log(error));

    }, []);

    const handleClick = () => {
        window.location.href = `${apiUrl}?client_id=${clientID}&redirect_uri=${redirectUrl}&scope=${scope.join("%20")}&response_type=${responseType}&show_dialog=true`;
        };
        
    const logout = () => {
        setToken(null);
        window.localStorage.removeItem("token");
    }

  return (
    <div className="container">
        {!token ?
        <div className="home">
            <div className="title">
            <h1>Welcome to Jrx Music by   </h1>               
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="spotify" />
            </div>
            <button onClick={handleClick}>Connect Spotify</button>
            <h2>Please login</h2> 
        </div>
            : 
            <Home token={token} logout={logout} profile={profile} setUrl={setUrl} url={url} />
        }
    </div>
  )
}