import React, { useContext } from 'react';
import {Link} from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProvider';

const Header = () => {
    const {user, logOut} = useContext(AuthContext);
    const handleSignOut = ()=> {
        logOut()
        .then(()=> { })
        .catch(error => console.error(error))

    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Authentication</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              {
                user ? <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/profile">Profile</Link>
              </li> : <li className="nav-item">
                <Link className="nav-link disabled" aria-current="page" to="/profile">Profile</Link>
              </li>
              }
              {/* {
                user ?  <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/orders">Orders</Link>
              </li> :  <li className="nav-item">
                <Link className="nav-link disabled" aria-current="page" to="/orders">Orders</Link>
              </li>
              } */}
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/orders">Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin">SignUp</Link>
              </li>
               
              <li className="nav-item">
                 {
                    user ?
                    <>
                     <span>{user.email}</span> <button onClick={handleSignOut}>Sign Out</button>
                    </>  : <Link to='/login' className="nav-link">LogIn</Link>
                 }
              </li>

              
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    );
};

export default Header;