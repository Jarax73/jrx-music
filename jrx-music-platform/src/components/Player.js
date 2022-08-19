import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import axios from "axios";

const Player = ({ token}) => {
  const [url, setUrl] = useState("");

    console.log(token);
  const [play, setPlay] = useState(false);
  
  const initialVolume = 20;

  useEffect(() => {
    setPlay(true)
    searchTracks();
  }, [url])

  console.log(url);

  const searchTracks = async () => {
  
    // const {data} = await axios.get('https://api.spotify.com/v1/browse/new-releases?limit=10', {
    //     headers: {
    //         Accept: "application/json",
    //         'Content-type': "application/json",
    //         Authorization: `Bearer ${token}`
    //     }
    // })
    // setUrl(data.items.map(item=> item.track.uri));
    // setUrl(data.albums.items[0].uri);
    // console.log(data.albums.items[0].uri);
    // console.log(data.items.map(item=> item.track.uri));
  }
  

  if (!token) return null
  return (
    <div className="player-container">
      <SpotifyPlayer
        token={token}
        showSaveIcon
        callback={state => !state.isPlaying && setPlay(false)}
        initialVolume={initialVolume}
        play={play}
        uris={url ? url : []}
        styles={{
          activeColor: "#fff",
          bgColor: "#05476b",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#515151",
          trackArtistColor: "#CFC5C5",
          trackNameColor: "#fff",
        }}
      />
    </div>
  )
}

export default Player