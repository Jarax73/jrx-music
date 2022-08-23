import SearchForm from './SearchForm';
import { Link } from 'react-router-dom';

export default function Library() {
    return (
        <div className="section">
            <Link to="/search" >
                <SearchForm />
            </Link>
            <h1>On Coming... Don't Worry</h1>            
        </div>
    )
}
