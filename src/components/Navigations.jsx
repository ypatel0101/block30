
import 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
      <div>
        <ul>
          <li>
            <Link to="Home">Home</Link>
          </li>
          <li>
            <Link to="Register">Register</Link>
          </li>
          
          <li>
            <Link to="Account">Account</Link>
          </li>
        </ul>
      </div>
    );
  };
  
  export default NavBar;