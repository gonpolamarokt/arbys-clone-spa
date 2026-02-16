import { Link, NavLink } from 'react-router-dom';

function Header({ cartCount }) {
  return (
    <header className="header">
      <div className="container nav-wrap">
        <Link to="/" className="logo" aria-label="El Rocinante Home">
          <span className="logo-pill">El</span>
          <span className="logo-main">Rocinante</span>
        </Link>
        <nav className="nav-links" aria-label="Main Navigation">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/bag">Order Summary</NavLink>
        </nav>
        <Link to="/bag" className="cart-chip">
          Order <span>{cartCount}</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
