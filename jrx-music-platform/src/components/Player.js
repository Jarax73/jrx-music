import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ token, searchTracks}) => {
  console.log(searchTracks);
    console.log(token);
  const [play, setPlay] = useState(false);
  const redirectUrl = "spotify:playlist:37i9dQZF1DXdTBzNcDowKf";
  const initialVolume = 20;

  useEffect(() => {
    setPlay(true)
  }, [redirectUrl])

  if (!token) return null
  return (
    <div className="player-container">
      <SpotifyPlayer
        token={token}
        showSaveIcon
        callback={state => !state.isPlaying && setPlay(false)}
        initialVolume={initialVolume}
        play={play}
        uris={redirectUrl ? redirectUrl : []}
        styles={{
          activeColor: "#fff",
          bgColor: "#2679a7",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#05476b",
          trackArtistColor: "#CFC5C5",
          trackNameColor: "#fff",
        }}
      />
    </div>
  )
}

export default Player