import { BrowserRouter, Route, Link } from "react-router-dom";

export default function Menu({logout}){

    return (
        <BrowserRouter>
        <div className="menu">
            <p className="logo">Jrx Music</p>
            <ul>
                <li><Link to=""><img src="" alt=""/>Home</Link></li>
                <li><Link to=""><img src="" alt="" />Library</Link></li>
                <li><Link to=""><img src="" alt=""/>Playlists</Link></li>
                
            </ul>
            <div className="logout" onClick={logout}>Logout </div>
        </div>
        </BrowserRouter>
    )
}