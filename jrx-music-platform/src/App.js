import React, {useEffect, useState} from 'react';
import axios from "axios";
import Menu from './components/Menu';
import Player from './components/Player';
import Aside from './components/Aside';
import {RiSearch2Line} from 'react-icons/ri';


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
    const [searchKey, setSearchKey] = useState ("");
    const [artists, setArtists] = useState ("");
    const [tracks, setTracks] = useState ("");
    
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
    }, []);

    const handleClick = () => {
        window.location.href = `${apiUrl}?client_id=${clientID}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=${responseType}&show_dialog=true`;
        };
        
    const logout = () => {
        setToken(null);
        window.localStorage.removeItem("token");
    }

    
    const searchArtists = async (e) => {
        e.preventDefault();

        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            }, 
            params: {
                q: searchKey,
                type: "artist"
            }
        })
        
        setArtists(data.artists.items);
        console.log(data.artists.items);
    }
    

    console.log(artists);
    const renderArtists = () => {
        return artists === "" ? null : artists.map(artist => (
            <div className="artist" key={artist.id}>
                {artist.images.length ? <img width={"100%"} height={"100%"} src={artist.images[0].url} alt="" /> : <div>No image</div>}
                <div className="artist-detail">
                    {artist.name}<br/>
                    {artist.genres[0]}
                </div>
            </div>
            )
        )
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
            : <React.Fragment>
          <Menu logout={logout}/>
          <div style={{display: 'flex', flexDirection: 'column'}}>
          <div className="section">
            <div className="row">           
              <form className="search" onSubmit={searchArtists}>                  
                  <button className="searchArtists" type="submit">
                    <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                    <RiSearch2Line style={{color: '#05476b'}} />
                  </button>
              </form>
            </div>
            <div className="render-artists">
              {renderArtists() }
            </div>
            
          </div>
                <Player token={token} />
            </div>
            <Aside token={token} redirectUrl={redirectUrl}/>
            </React.Fragment>
        }
    </div>
  )
}