import Menu from './Header';

export default function Home({ recent, setUrl }) {
    const renderRecentPlayed = () => {
        return recent ? (
            recent
                .filter(function (ele, pos) {
                    return recent.indexOf(ele) === pos;
                })
                .map((item) => (
                    <div
                        className="artist"
                        key={item.track.id}
                        onClick={() => setUrl(item.track.uri)}
                        style={{
                            width: '20%',
                            position: 'relative',
                        }}
                    >
                        <div>
                            <img
                                src={item.track.album.images[0].url}
                                alt=""
                                style={{ height: '80%' }}
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                //   flexDirection: 'column',
                                padding: '5px',
                            }}
                        >
                            <div>
                                <span style={{ color: 'white' }}>
                                    {item.track.artists[0].name} <br />
                                </span>
                                <span style={{ color: '#CFC5C5' }}>
                                    {item.track.name}
                                </span>
                            </div>
                            {/* <div
                          style={{
                              alignSelf: 'flex-end',
                              justifySelf: 'flex-end',
                          }}
                      >
                          <RiPlayCircleFill
                              className="notify"
                              onclick={() => setRecent(item.track.uri)}
                          />
                      </div> */}
                        </div>
                        {console.log(recent[0].track.album.images[0].url)}
                        {console.log(
                            recent.map((item) => item.track.album.images[0].url)
                        )}
                    </div>
                ))
        ) : (
            <p style={{ justifySelf: 'center', alignSelf: 'center' }}>
                Chargement
            </p>
        );
    };
    return (
        <div className="section">
            <div className="render-artists">{renderRecentPlayed()}</div>
        </div>
    );
}
