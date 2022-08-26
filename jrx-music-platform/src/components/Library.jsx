import axios from 'axios';
import { useState, useEffect } from 'react';
import { RiPlayCircleFill } from 'react-icons/ri';

export default function Library({ token, setUrl }) {
  const [albums, setAlbums] = useState('');
  const [topArtists, setTopArtists] = useState('');

  useEffect(() => {
    axios
      .get('https://api.spotify.com/v1/browse/new-releases', {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setAlbums(response.data.albums.items));

    axios
      .get('https://api.spotify.com/v1/me/top/artists', {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setTopArtists(response.data.items));
  }, []);

  return (
    <div className="section">
      <h2 style={{ marginLeft: '5%', marginTop: '10%' }}>Your Top Artists</h2>
      <div className="render-artists">
        {!topArtists ? (
          <div
            style={{
              margin: '20% auto',
            }}
          >
            Nothing yet ...
          </div>
        ) : (
          topArtists.map((topArtist) => (
            <div
              className="artist"
              key={topArtist.id}
              onClick={() => {
                setUrl(topArtist.uri);
              }}
            >
              <div>
                {topArtist.images.length ? (
                  <img src={topArtist.images[0].url} alt={topArtist.name} />
                ) : (
                  <img src={topArtist.images[0].url} alt="No image" />
                )}
                <div
                  style={{
                    padding: '5px',
                  }}
                >
                  <div>{topArtist.name}</div>
                  <div className="artist-played">
                    <div>{topArtist.followers.total} followers</div>
                    <div
                      className="play"
                      onClick={() => {
                        setUrl(topArtist.uri);
                      }}
                    >
                      <RiPlayCircleFill />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <h2 style={{ marginLeft: '5%', marginTop: '10%' }}>New releases</h2>
      <div className="render-artists">
        {!albums ? (
          <div
            style={{
              margin: '20% auto',
            }}
          >
            Nothing yet ...
          </div>
        ) : (
          albums.map((album) => (
            <div
              className="artist"
              key={album.id}
              onClick={() => {
                setUrl(album.uri);
              }}
            >
              {album.images.length ? (
                <img src={album.images[0].url} alt={album.name} />
              ) : (
                <img src={album.images[0].url} alt="No image" />
              )}
              <div
                style={{
                  padding: '5px',
                }}
              >
                <div>{album.name}</div>
                <div>{album.artists[0].name}</div>
                <div className="artist-played">
                  <div>{album.total_tracks} songs</div>
                  <div
                    className="play"
                    onClick={() => {
                      setUrl(album.uri);
                    }}
                  >
                    <RiPlayCircleFill />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
