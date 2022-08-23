import React, {useEffect, useState} from 'react';
import axios from "axios";
import Menu from './components/Header';
import Player from './components/Player';
import Home from './components/Home';
import Library from './components/Library';
import Playlists from './components/Playlists';
import Login from './components/Login';
import Aside from './components/Aside';
import {Routes, Route} from 'react-router-dom';


export default function App() {
  const clientID = "af6fe4b7a75e4651bd1531de3f541e53";
    const redirectUrl = "http://localhost:4000";
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
        <Login handleClick={handleClick}/>
            : 
            <React.Fragment>
            <Menu logout={logout} profile={profile}/>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                <Routes>
                    <Route exact path="/" element={<Home token={token} logout={logout} profile={profile} setUrl={setUrl} url={url} />}/>
                    <Route path="/Library" element={<Library />}/>
                    <Route path="/Playlists" element={<Playlists />}/>
                </Routes>
                <Player token={token} url={url}/>
                </div>
                <Aside/>
            </React.Fragment>
        }
    </div>
  )
}