import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => (
  <>
    <div className="header-container">
      <h1 className="covid19">
        COVID19<span className="span-covid">INDIA</span>
      </h1>
      <div className="home-heading">
        <Link className="link-style" to="/">
          <h1
            style={{ fontSize: "18px", marginRight: "40px", color: "#f8fafc" }}
          >
            Home
          </h1>
        </Link>
        <Link className="link-style" to="/about">
          <h1
            style={{ fontSize: "18px", marginRight: "40px", color: "#94A3B8" }}
          >
            About
          </h1>
        </Link>
      </div>
    </div>
  </>
);

export default Header;
