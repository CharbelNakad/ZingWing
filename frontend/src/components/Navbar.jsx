import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar-shell">
      <div className="navbar page-section">
        <NavLink to="/" className="brand-mark">
          <span className="brand-icon">ZW</span>
          <div>
            <span className="brand-name">Zing Wing</span>
            <p className="brand-tagline">Turn daily habits into XP missions.</p>
          </div>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About Us
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            Contact Us
          </NavLink>
          <NavLink to="/missions" className="nav-link">
            Missions
          </NavLink>
          <NavLink to="/missions/new" className="nav-button">
            Add Mission
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
