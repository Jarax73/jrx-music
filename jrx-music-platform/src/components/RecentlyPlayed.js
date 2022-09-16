import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { RiPlayCircleFill } from 'react-icons/ri';

export default function RecentlyPlayed({ token, setUrl, play, playerDevice }) {
    RecentlyPlayed.propTypes = {
        token: PropTypes.string,
        setUrl: PropTypes.func,
        play: PropTypes.func,
        playerDevice: PropTypes.object,
    };
    const [recentlyPlayed, setRecentlyPlayed] = useState('');

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
            .catch((error) => error);
    }, []);

    return (
        <div className="section">
            <h2 style={{ marginLeft: '5%', marginTop: '10%' }}>
                Recently Played
            </h2>
            <div className="render-artists">
                {recentlyPlayed == ''
                    ? 'Nothing yet ...'
                    : recentlyPlayed.map((played) => (
                          <div
                              className="recent-track artist"
                              key={played.track.id}
                              onClick={() =>
                                  playerDevice.devices[0] === undefined
                                      ? setUrl(played.track.uri)
                                      : play(played.track.uri)
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
                                          playerDevice.devices[0] === undefined
                                              ? setUrl(played.track.uri)
                                              : play(played.track.uri)
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
