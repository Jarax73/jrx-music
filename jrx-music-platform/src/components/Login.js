import React from 'react';



export default function Login({handleClick}){
    return (
        <div className="home">
            <div className="title">
                <h1>Welcome to Jrx Music by </h1>
                <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="spotify" />            
            </div>
            <button onClick={handleClick}>Connect Spotify</button>
            <h2>Please Login</h2>
        </div>
    )
}