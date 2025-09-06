import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between fixed top-0 left-0 right-0 px-4 md:px-15 border-b border-gray-300 py-3 bg-white transition-all">
      <Link to="/">
        <img
          src={assets.logo}
          alt="logo"
          className="h-10 w-30 object-cover invert opacity-80"
        />
      </Link>
      <UserButton />
    </div>
  );
};

export default Navbar;
