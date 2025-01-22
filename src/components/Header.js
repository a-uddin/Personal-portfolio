import { Link } from "react-router-dom";
import { useState } from "react";
import './Header.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="anowar-uddin text-xl font-bold text-gradient-to-r from-blue-400 to-green-400 no-underline text-white">
          Anowar Uddin
        </Link>

        {/* Desktop Links */}
        <ul className="anowar-nav hidden md:flex space-x-6 text-sm font-medium items-center">
  <li className="group relative">
    <Link
      to="/"
      className="hover:text-green-400 transition-all duration-300 no-underline text-white relative z-10"
    >
      Home
    </Link>
    <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
  </li>
  <li className="group relative">
    <Link
      to="/about"
      className="hover:text-green-400 transition-all duration-300 no-underline text-white relative z-10"
    >
      About Me
    </Link>
    <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
  </li>
  <li className="group relative">
    <Link
      to="/experience"
      className="hover:text-green-400 transition-all duration-300 no-underline text-white relative z-10"
    >
      Experience
    </Link>
    <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
  </li>
  <li className="group relative">
    <Link
      to="/education"
      className="hover:text-green-400 transition-all duration-300 no-underline text-white relative z-10"
    >
      Education
    </Link>
    <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
  </li>
  <li className="group relative">
    <Link
      to="/skills"
      className="hover:text-green-400 transition-all duration-300 no-underline text-white relative z-10"
    >
      Skills
    </Link>
    <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
  </li>
  <li className="group relative">
    <Link
      to="/projects"
      className="hover:text-green-400 transition-all duration-300 no-underline text-white relative z-10"
    >
      Projects
    </Link>
    <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
  </li>
</ul>


        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="absolute bg-gray-900 top-14 left-0 w-full text-center space-y-4 py-4 text-sm font-medium md:hidden">
            <li>
              <Link
                to="/"
                className="block hover:text-green-400 transition-colors no-underline text-white"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block hover:text-green-400 transition-colors no-underline text-white"
                onClick={() => setIsOpen(false)}
              >
                About Me
              </Link>
            </li>
            <li>
              <Link
                to="/experience"
                className="block hover:text-green-400 transition-colors no-underline text-white"
                onClick={() => setIsOpen(false)}
              >
                Experience
              </Link>
            </li>
            <li>
              <Link
                to="/education"
                className="block hover:text-green-400 transition-colors no-underline text-white"
                onClick={() => setIsOpen(false)}
              >
                Education
              </Link>
            </li>
            <li>
              <Link
                to="/skills"
                className="block hover:text-green-400 transition-colors no-underline text-white"
                onClick={() => setIsOpen(false)}
              >
                Skills
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className="block hover:text-green-400 transition-colors no-underline text-white"
                onClick={() => setIsOpen(false)}
              >
                Projects
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
