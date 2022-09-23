import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { RiPlayCircleFill } from 'react-icons/ri';
import { AppContext } from '../App';

export default function Tracks({ play, playerDevice, logout }) {
    Tracks.propTypes = {
        playerDevice: PropTypes.object,
        play: PropTypes.func,
        logout: PropTypes.func,
    };

    const [tracks, setTracks] = useState([]);
    const [album, setAlbum] = useState([]);
    const token = useContext(AppContext);
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
    console.log(album);
    return (
        <div className="section">
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <div className="tracks">
                    <div
                        style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            marginLeft: '10%',
                        }}
                    >
                        <h2
                            style={{
                                width: '80%',
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
                        <span
                            className="play"
                            onClick={() => play(album.uri, playerDevice)}
                        >
                            <RiPlayCircleFill />
                        </span>
                    </div>
                    {album.length === 0 ? (
                        <div className="track">Waiting</div>
                    ) : (
                        <div className="cover-image">
                            <img src={album.images[0].url} />
                        </div>
                    )}
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {tracks == []
                        ? 'Nothing yet ...'
                        : tracks.map((track) => (
                              <div className="track" key={track.id}>
                                  <div
                                      className="artist-played"
                                      style={{
                                          width: '80%',
                                          margin: '0 auto',
                                      }}
                                  >
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
