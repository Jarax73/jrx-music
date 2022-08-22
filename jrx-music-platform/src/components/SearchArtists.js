import { useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import axios from 'axios';

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
            <h2 style={{marginLeft: '5%'}}>Search Results</h2>
            <div className="render-artists">
        {artists === "" ? <div>...</div> : artists.map(artist => (
            <div className="artist" key={artist.id} onClick={()=>setUrl(artist.uri)}>
                {artist.images.length ? <img src={artist.images[0].url} alt="" /> : <div>No image</div>}
                <div className="artist-detail">
                    {artist.name}<br/>
                    {artist.genres[0]}
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
