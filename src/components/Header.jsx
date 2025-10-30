import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar>
      <NavbarBrand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Rocket Launch Tracker 🚀
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink>Home</NavbarLink>
        <NavbarLink>Upcoming Launches</NavbarLink>
        <NavbarLink>Previous Launches</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Header;
