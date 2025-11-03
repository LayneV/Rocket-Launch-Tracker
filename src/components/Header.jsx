import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { NavLink } from "react-router-dom";
import { DarkThemeToggle } from "flowbite-react";
import { useThemeMode } from "flowbite-react";

function Header() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Upcoming Launches", path: "/upcoming" },
    { name: "Previous Launches", path: "/previous" },
  ];

  return (
    <Navbar>
      <NavbarBrand>
        <span className="self-center sm:text-3xl md:text-4xl whitespace-nowrap text-3xl font-semibold [text-shadow:_0_1px_2px_rgba(0,0,0,0.05)] dark:[text-shadow:_0_0_8px_rgb(59_130_246)]] dark:text-white drop-shadow-lg ">
          Rocket Launch Tracker 🚀
        </span>
      </NavbarBrand>

      <NavbarToggle />
      <NavbarCollapse>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            className={({ isActive }) =>
              `px-3 py-2 rounded ${
                isActive
                  ? "text-blue-400 text-xl font-bold [text-shadow:_0_0_8px_rgb(59_130_246)]"
                  : "text-gray-700 text-xl dark:text-gray-300 hover:text-blue-400"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}{" "}
        <DarkThemeToggle />
      </NavbarCollapse>
    </Navbar>
  );
}

export default Header;
