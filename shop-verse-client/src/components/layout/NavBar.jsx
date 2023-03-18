import SearchField from "./SearchField";
import { Link } from "react-router-dom";

const NavBar = () => {

  const logoStyle= {
    textDecoration: "none",
    pointer: "none",
    fontSize: "1.5rem"
  }

  return (
    <nav>
      <Link to="/" style={{textDecoration: "none"}}><h1 style={logoStyle}>ShopVerse</h1></Link>
      <SearchField />
      <ul>
        <li>
          <Link to="/wishlist">Wishlist</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/profile">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
