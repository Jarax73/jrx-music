import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { RiPlayCircleFill } from 'react-icons/ri';

export default function Tracks({ token, id, setUrl, artistsAlbums }) {
    Tracks.propTypes = {
        token: PropTypes.string,
        id: PropTypes.string,
        setUrl: PropTypes.func,
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
    console.log(tracks);
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
                        width: '90%',
                        height: '100%',
                        marginTop: '30%',
                        marginLeft: '5%',
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
                                      <span>{track.track_number}</span>
                                      <span>{track.name}</span>
                                      {/* <span>{track.duration_ms}</span> */}
                                      <span
                                          className="play"
                                          onClick={() => {
                                              setUrl(track.uri);
                                          }}
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
