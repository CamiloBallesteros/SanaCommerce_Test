

function NavBar() {
  return (
      <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
              <ul className="navbar-nav ms-1 me-auto">
                  <li className="nav-item">
                      <a className="nav-link logo" href="/">Home</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="/about">About Us</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="/contact">Contact</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="/catalog ">Catalog</a>
                  </li>
              </ul>
              <ul className="navbar-nav me-1">
                  <li className="nav-item">
                      <a className="nav-link" href="/profile">Profile</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="/cart">Cart</a>
                  </li>
              </ul>
          </div>
      </nav>
  );
}

export default NavBar;