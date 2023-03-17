import "./NavBar.css";
import SearchField from "./SearchField";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavBar = () => {

  const logoStyle= {
    textDecoration: "none",
    color: "#fff",
    pointer: "none",
    padding: "0.5rem"
  }

  const userGreetingStyle = {
    width: "8%"
  }

  return (
    <nav>
      <Link to="/" style={{textDecoration: "none"}}><h1 style={logoStyle}>ShopVerse</h1></Link>
      <p style={userGreetingStyle}>
        Hello, <span>User</span>
      </p>
      <SearchField />
      <ul>
        <li>
          <Link to="/wishlist">WishList</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/profile">
            <AccountCircleIcon />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
