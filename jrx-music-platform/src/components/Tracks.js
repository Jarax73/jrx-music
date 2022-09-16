import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { RiPlayCircleFill } from 'react-icons/ri';

export default function Tracks({
    token,
    id,
    setUrl,
    play,
    playerDevice,
    artistsAlbums,
}) {
    Tracks.propTypes = {
        token: PropTypes.string,
        id: PropTypes.string,
        playerDevice: PropTypes.object,
        setUrl: PropTypes.func,
        play: PropTypes.func,
        artistsAlbums: PropTypes.array,
    };
    const [tracks, setTracks] = useState([]);
    useEffect(() => {
        axios
            .get(`https://api.spotify.com/v1/albums/${id}/tracks?market=ES`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
            })
            .then((response) => setTracks(response.data.items));
    }, []);

    return (
        <div className="section">
            <h2></h2>
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
                    <img src={artistsAlbums[0].images[0].url} />
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
                                      <div
                                          style={{
                                              display: 'flex',
                                              width: '50%',
                                              justifyContent: 'space-between',
                                          }}
                                      >
                                          <span>{track.track_number}</span>
                                          <span
                                              style={{
                                                  justifySelf: 'flex-start',
                                              }}
                                          >
                                              {track.name}
                                          </span>
                                      </div>
                                      <span
                                          className="play"
                                          onClick={() =>
                                              playerDevice.devices[0] ===
                                              undefined
                                                  ? setUrl(track.uri)
                                                  : play(track.uri)
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
