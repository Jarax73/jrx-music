import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ token}) => {
    console.log(token);
  const [play, setPlay] = useState(false);
  const redirectUrl = 'spotify:artist:6HQYnRM4OzToCYPpVBInuU';
  const initialVolume = 20;

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
      initialVolume={initialVolume}
      play={play}
      uris={redirectUrl ? redirectUrl : []}
      styles={{
        height: '50%',
        activeColor: "#fff",
        bgColor: "#2679a7",
        color: "#fff",
        loaderColor: "#fff",
        sliderColor: "#2679a7",
        trackArtistColor: "#CFC5C5",
        trackNameColor: "#fff",
        height: "55px",
      }}
    />
    </React.Fragment>
  )
}

export default Player