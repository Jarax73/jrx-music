import axios from "axios";
import { useState, useEffect } from "react";
import SearchForm from './SearchForm';
import { Link } from 'react-router-dom'


export default function Playlists({ token }){
    const [playlists, setPlayLists] = useState("");

    useEffect(() => {
        axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => setPlayLists(response.data.items)).catch(error => error)
    }, []);

    return (
        <div className="section">
            <Link to="/search" >
                <SearchForm />
            </Link>
            <h2 style={{marginLeft: '5%', marginTop: '10%'}}>My Playlists</h2>
            {playlists == [] ? 
                <div className="render-artists">No Playlists</div> : 
                playlists.map(playlist => (
                    <div>{playlist.name}</div>
                ))
                }         
        </div>
    )
}
