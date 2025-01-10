import { NavLink } from "react-router-dom";

function Navbar() {
  const navLinks = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/posts",
      title: "posts",
    },
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navLinks.map((curElem) => (
              <li className="nav-item" key={curElem.title}>
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to={curElem.path}
                >
                  {curElem.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default navapp;