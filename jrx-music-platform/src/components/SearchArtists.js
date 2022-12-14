import React from 'react';
import PropTypes from 'prop-types';
import { RiPlayCircleFill } from 'react-icons/ri';

export default function SearchArtists({ artists, play, playerDevice }) {
    SearchArtists.propTypes = {
        playerDevice: PropTypes.object,
        play: PropTypes.func,
        artists: PropTypes.array,
    };

    const renderArtists = () => {
        return (
            <>
                <div className="render-artists" style={{ marginTop: '5%' }}>
                    {artists === ''
                        ? 'Nothing yet...'
                        : artists.map((artist) => (
                              <div
                                  className="artist"
                                  key={artist.id}
                                  onClick={() => play(artist.uri, playerDevice)}
                              >
                                  {artist.images.length ? (
                                      <img src={artist.images[2].url} alt="" />
                                  ) : (
                                      <div>No image</div>
                                  )}
                                  <div className="artist-played">
                                      <div className="artist-detail">
                                          {artist.name}
                                          <br />
                                          {artist.genres[0]}
                                      </div>
                                      <div
                                          className="play"
                                          onClick={() =>
                                              play(artist.uri, playerDevice)
                                          }
                                      >
                                          <RiPlayCircleFill />
                                      </div>
                                  </div>
                              </div>
                          ))}
                </div>
            </>
        );
    };

    return (
        <div>
            <div className="render-artists">{renderArtists()}</div>
        </div>
    );
}
