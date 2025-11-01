import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { NavLink, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <Navbar>
      <NavbarBrand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Rocket Launch Tracker 🚀
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        {[
          { name: "Home", path: "/" },
          { name: "Upcoming Launches", path: "/upcoming" },
          { name: "Previous Launches", path: "/previous" },
        ].map((link) => (
          <NavbarLink
            key={link.path}
            as={NavLink}
            to={link.path}
            className={
              location.pathname === link.path
                ? "text-blue-400 font-bold px-3 py-2 rounded [text-shadow:_0_0_8px_rgb(59_130_246)]"
                : ""
            }
          >
            {link.name}
          </NavbarLink>
        ))}
      </NavbarCollapse>
    </Navbar>
  );
}

export default Header;
