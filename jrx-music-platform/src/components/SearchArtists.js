import { useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import axios from 'axios';
import {RiPlayCircleFill} from 'react-icons/ri';

export default function SearchArtists({ token, setUrl }) {
    const [searchKey, setSearchKey] = useState('');
    const [artists, setArtists] = useState('');
    

    const searchArtists = async (e) => {
        e.preventDefault();

        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            }, 
            params: {
                q: searchKey,
                type: "artist"
            }
        })
        
        setArtists(data.artists.items);
    }

    console.log(artists);
    
    const renderArtists = () => {
        return <div>
            <h2 style={{width: '54vw', maxWidth: '60vw'}}>Search Results</h2>
            <div className="render-artists">
        {artists === "" ? <div>...</div> : artists.map(artist => (
            <div className="artist" key={artist.id} onClick={()=>setUrl(artist.uri)}>
                {artist.images.length ? <img src={artist.images[0].url} alt="" /> : <div>No image</div>}
                <div className='artist-played'>
                    <div className="artist-detail">
                        {artist.name}<br/>
                        {artist.genres[0]}
                    </div>
                    <div className='play' onClick={()=>{setUrl(played.track.uri)}}>                        
                        <RiPlayCircleFill/>
                    </div>
                </div>
            </div>
            )
        )
    }
        </div>
    </div>
    }
    

    return (
        <div>
            <div className="row">
                <form className="search" onSubmit={searchArtists}>
                    <button className="searchArtists" type="submit">
                        <input
                            type="text"
                            onChange={e => setSearchKey(e.target.value)}
                        />
                        <RiSearch2Line style={{ color: '#05476b' }} />
                    </button>
                </form>
            </div>
            <div className="render-artists">{renderArtists()}</div>
        </div>
    );
}
