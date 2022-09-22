import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { RiPlayCircleFill } from 'react-icons/ri';

export default function Tracks({ token, play, playerDevice, logout }) {
    Tracks.propTypes = {
        token: PropTypes.string,
        playerDevice: PropTypes.object,
        play: PropTypes.func,
        logout: PropTypes.func,
    };

    const [tracks, setTracks] = useState([]);
    const [album, setAlbum] = useState([]);
    let { albumId } = useParams();

    useEffect(() => {
        axios
            .get(
                `https://api.spotify.com/v1/albums/${albumId}/tracks?market=ES`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-type': 'application/json',
                    },
                }
            )
            .then((response) => setTracks(response.data.items))
            .catch((error) =>
                error.message === 'The access token expired' ? logout() : null
            );
        axios
            .get(`https://api.spotify.com/v1/albums/${albumId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
            })
            .then((response) => setAlbum(response.data));
    }, []);

    return (
        <div className="section">
            <h2
                style={{
                    width: '80%',
                    marginLeft: '10%',
                    wordWrap: 'break-word',
                }}
            >
                {album.length === 0 ? (
                    <div style={{ margin: 'auto' }}></div>
                ) : (
                    <div>
                        {album.name} ({album.artists[0].name})
                    </div>
                )}
            </h2>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: '100%',
                }}
            >
                <div className="tracks">
                    {album.length === 0 ? (
                        <div style={{ margin: 'auto' }}>Waiting</div>
                    ) : (
                        <img src={album.images[0].url} />
                    )}
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '81%',
                        height: '100%',
                        marginTop: '30%',
                        marginLeft: '10%',
                    }}
                >
                    {tracks == []
                        ? 'Nothing yet ...'
                        : tracks.map((track) => (
                              <div
                                  style={{
                                      width: '100%',
                                      height: '100px',
                                      margin: 'auto',
                                  }}
                                  key={track.id}
                              >
                                  <div className="artist-played">
                                      <div>
                                          <span>{track.track_number}</span>
                                          {'. '}
                                          <span>{track.name}</span>
                                      </div>
                                      <span
                                          className="play"
                                          onClick={() =>
                                              play(track.uri, playerDevice)
                                          }
                                      >
                                          <RiPlayCircleFill />
                                      </span>
                                  </div>
                              </div>
                          ))}
                </div>
            </div>
        </div>
    );
}
