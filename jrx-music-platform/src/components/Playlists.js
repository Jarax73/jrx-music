import axios from "axios";
import { useState, useEffect } from "react";
import SearchForm from './SearchForm';
import { Link } from 'react-router-dom'


export default function Playlists({ token }){
    const [playlists, setPlaylists] = useState("");

    useEffect(() => {
        axios.get("https://api.spotify.com/v1/me/playlists", {
            Headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response.data)
    }, []);


    return (
        <div className="section">
            <Link to="/search" >
                <SearchForm />
            </Link>
            <h1>On Coming... Don't Worry</h1>            
        </div>
    )
}
