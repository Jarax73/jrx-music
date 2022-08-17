import { BrowserRouter, Route, Link } from "react-router-dom";
import {RiHome2Fill} from 'react-icons/ri';
import {RiPlayList2Fill} from 'react-icons/ri';
import {RiMusic2Fill} from 'react-icons/ri';
import {RiLogoutCircleRFill} from 'react-icons/ri';



export default function Menu({logout}){

    return (
        <BrowserRouter>
        <div className="menu">
            <p className="logo">Jrx Music</p>
            <ul>
                <Link to=""><li><span className="icons"><RiHome2Fill/></span><div>Home</div></li></Link>
                <Link to=""><li><span className="icons"><RiMusic2Fill/></span><div>Library</div></li></Link>
                <Link to=""><li><span className="icons"><RiPlayList2Fill/></span><div>Playlists</div></li></Link>
                
            </ul>
            <div className="logout" onClick={logout}><span className="icons"><RiLogoutCircleRFill/></span><span>Log Out </span></div>
        </div>
        </BrowserRouter>
    )
}