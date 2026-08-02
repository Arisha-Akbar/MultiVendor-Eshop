import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/style";

const Navbar = ({ active }) => {
  return (
    <div className="block 800px:flex items-center">
      {navItems &&
        navItems.map((i, index) => (
          <Link
            key={index}
            to={i.url}
            className={`relative block px-4 py-2 800px:py-0 text-sm font-medium transition
            ${
              active === index + 1
                ? "text-amber-400"
                : "text-gray-600 800px:text-white/70 hover:text-white"
            }`}
          >
            {i.title}
            {active === index + 1 && (
              <span className="hidden 800px:block absolute -bottom-4.5 left-1/2 -translate-x-1/2 w-[70%] h-0.5 bg-amber-400 rounded-full" />
            )}
          </Link>
        ))}
    </div>
  );
};

export default Navbar;
