import axios from 'axios';
import { useState, useEffect } from 'react';
import { RiPlayCircleFill } from 'react-icons/ri';

export default function Playlists({ token, setUrl, setTotalPlaylistTracks }) {
  const [playlists, setPlayLists] = useState([]);
  const total = [];

  for (let i = 0; i < playlists.length; i + 1) {
    total.push(playlists[i].tracks.total);
  }

  useEffect(() => {
    axios
      .get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setPlayLists(response.data.items));
    setTotalPlaylistTracks(total.reduce((a, b) => a + b, 0));
  }, []);

  return (
    <>
      <h2 style={{ marginLeft: '5%', marginTop: '10%' }}>My Playlists</h2>
      <div className="render-artists">
        {playlists === [] ? (
          <div
            style={{
              margin: '20% auto',
            }}
          >
            Nothing yet ...
          </div>
        ) : (
          playlists.map((playlist) => (
            <div
              className="artist"
              key={playlist.id}
              onClick={() => {
                setUrl(playlist.uri);
              }}
              aria-hidden="true"
            >
              {playlist.images.length ? (
                <img src={playlist.images[0].url} alt={playlist.name} />
              ) : (
                <img alt="Nothing" />
              )}

              <div
                style={{
                  paddingLeft: '5px',
                }}
              >
                {playlist.tracks.total > 1 ? (
                  <>
                    {playlist.tracks.total}
                    songs
                  </>
                ) : (
                  <>
                    {playlist.tracks.total}
                    song
                  </>
                )}
              </div>

              <div className="artist-played">
                <div className="artist-detail">{playlist.name}</div>
                <div
                  role="button"
                  className="play"
                  onClick={() => {
                    setUrl(playlist.uri);
                  }}
                  aria-hidden="true"
                >
                  <RiPlayCircleFill />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
