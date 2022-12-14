import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { RiPlayCircleFill } from 'react-icons/ri';
import { AppContext } from '../App';

export default function RecentlyPlayed({ play, playerDevice, logout }) {
    RecentlyPlayed.propTypes = {
        play: PropTypes.func,
        playerDevice: PropTypes.object,
        logout: PropTypes.func,
    };
    const [recentlyPlayed, setRecentlyPlayed] = useState('');
    const token = useContext(AppContext);

    useEffect(() => {
        axios
            .get(
                'https://api.spotify.com/v1/me/player/recently-played?limit=10',
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => setRecentlyPlayed(response.data.items))
            .catch((error) =>
                error.message === 'The access token expired' ? logout() : null
            );
    }, []);

    return (
        <div className="section">
            <h2 style={{ marginLeft: '5%', marginTop: '10%' }}>
                Recently Played
            </h2>
            <div className="render-artists">
                {recentlyPlayed == ''
                    ? 'Nothing yet...'
                    : recentlyPlayed.map((played) => (
                          <div
                              className="recent-track artist"
                              key={played.track.id}
                              onClick={() =>
                                  play(played.track.uri, playerDevice)
                              }
                          >
                              {played.track.album.images.length ? (
                                  <img
                                      src={played.track.album.images[0].url}
                                      alt={played.track.name}
                                  />
                              ) : (
                                  <img
                                      src={played.track.album.images[0].url}
                                      alt="No image"
                                  />
                              )}
                              <div className="artist-played">
                                  <div className="artist-detail names">
                                      <div>
                                          {played.track.album.artists[0].name}{' '}
                                      </div>
                                      <br />
                                      <div>{played.track.name}</div>
                                  </div>
                                  <div
                                      className="play"
                                      onClick={() =>
                                          play(played.track.uri, playerDevice)
                                      }
                                  >
                                      <RiPlayCircleFill />
                                  </div>
                              </div>
                          </div>
                      ))}
            </div>
        </div>
    );
}
