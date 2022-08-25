import axios from "axios";
import { useState, useEffect } from "react";
import { RiPlayCircleFill } from "react-icons/ri";

export default function Library({token, setUrl}) {
    const [albums, setAlbums] = useState("");
    const [topArtists, setTopArtists] = useState("");

    useEffect(() => {
        axios.get('https://api.spotify.com/v1/browse/new-releases', {
            headers: {
                Accept: "application/json",
                'Content-type': "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => setAlbums(response.data.albums.items))

        axios.get('https://api.spotify.com/v1/me/top/artists', {
            headers: {
                Accept: "application/json",
                'Content-type': "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => setTopArtists(response.data.items))

    }, []);
    console.log(albums);
    console.log(topArtists);
    return (
        <div className='section'>
            <h2 style={{
                marginLeft: '5%', 
                marginTop: '9%',
                position:'fixed', 
                top: '-16%',
                left: '16%'
                }}>New releases</h2>     
            <div className="render-artists">
                <div className="library">
                    {!albums ? "Loading..." : albums.map(album =>
                        <div 
                            key={album.id} 
                            onClick={()=>{setUrl(album.uri)}}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                // width: '100%',
                                margin: '4% 1%',
                                borderRadius: '10px',
                                backgroundColor: '#05476b'
                            }}
                            >
                            
                            {album.images.length ? 
                                <img 
                                    src={album.images[0].url} 
                                    alt={album.name} 
                                    style={{
                                        borderRadius: '10px',
                                        width: '100%',
                                        marginBottom: '10px',
                                        height: '70%',
                                        objectFit: 'cover'
                                    }}
                                    /> :
                                <img src={album.images[0].url} alt="name" />}
                            <div style={{
                                padding: '2%'
                            }}>
                            <div>{album.name}</div>
                            <div>{album.artists[0].name}</div>
                            <div className="artist-played">
                                <div>{album.total_tracks} songs</div>
                                <div className='play' onClick={()=>{setUrl(album.uri)}}>                        
                                    <RiPlayCircleFill/>
                                </div>
                            </div>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}