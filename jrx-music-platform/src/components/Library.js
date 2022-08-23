import SearchForm from './SearchForm';
import { Link } from 'react-router-dom';

export default function Library() {
    return (
        <div className="section">
            <Link to="/search" >
                <SearchForm />
            </Link>
            <h2 style={{marginLeft: '5%', marginTop: '10%'}}>Library</h2>     
            <div className="render-artists">No Library</div>
        </div>
    )
}
