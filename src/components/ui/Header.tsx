import React from "react";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex justify-center items-center h-16 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center">
          <img
            src="logo.png" // public folder path
            alt="Campervan Calendar Logo"
            className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto"
          />
        </Link>
      </div>
    </header>
  );
};