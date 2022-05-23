import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'

export default function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand logo" href="#">PETS</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className={location.pathname === "/" ? " nav-item active" : "nav-item"}>
                            <Link className='nav-link' to="/">Home</Link>
                        </li>
                        <li className={location.pathname === "/categories" ? " nav-item active" : "nav-item"}>
                            <Link className='nav-link' to="/categories">Categories</Link>
                        </li>
                        <li className={location.pathname === "/tags" ? " nav-item active" : "nav-item"}>
                            <Link className='nav-link' to="/tags">Tags</Link>
                        </li>
                        <li className={location.pathname === "/pets" ? " nav-item active" : "nav-item"}>
                            <Link className='nav-link' to="/pets">Pets</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}