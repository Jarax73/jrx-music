import { BrowserRouter, Route, Link } from "react-router-dom";

export default function Menu({logout}){

    return (
        <BrowserRouter>
        <div className="menu">
            <p className="logo">Jrx Music</p>
            <ul>
                <ul>
                    <h2>Menu</h2>
                    <li><Link to=""><img src="" alt=""/>Home</Link></li>
                    <li><Link to=""><img src="" alt="" />Trends</Link></li>
                    <li><Link to=""><img src="" alt="" />Library</Link></li>
                    <li><Link to=""><img src="" alt="" />Discover</Link></li>
                </ul>
                <ul>
                    <h2>Discover</h2>
                    <li><Link to=""><img src="" alt=""/>Playlists</Link></li>
                    <li><Link to=""><img src="" alt="" />Daily Mix</Link></li>
                </ul>
                <ul>
                    <h2>Your collection</h2>
                    <li><Link to=""><img src="" alt="" />Liked Songs</Link></li>
                    <li><Link to=""><img src="" alt="" />Favorite Artists</Link></li>
                </ul>
                
            </ul>
            <div className="logout" onClick={logout}>Logout </div>
        </div>
        </BrowserRouter>
    )
}