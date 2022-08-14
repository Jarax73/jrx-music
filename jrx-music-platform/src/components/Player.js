// import React from 'react';
// import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";

// export default function MySpotifyPlayer() {
    
//   };

import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ token, redirectUrl }) => {
    console.log(token);
  const [play, setPlay] = useState(false)

  useEffect(() => {
    setPlay(true)
  }, [redirectUrl])

  if (!token) return null
  return (
    <React.Fragment>
    <SpotifyPlayer
      token={token}
      showSaveIcon
      callback={state => !state.isPlaying && setPlay(false)}
      play={play}
      uris={redirectUrl ? redirectUrl : []}
      styles={{
        activeColor: "#fff",
        bgColor: "#333",
        color: "#fff",
        loaderColor: "#fff",
        sliderColor: "#1cb954",
        trackArtistColor: "#ccc",
        trackNameColor: "#fff",
        height: "55px",
      }}
    />
    </React.Fragment>
  )
}

export default Player