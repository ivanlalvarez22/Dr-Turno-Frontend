import React, { useEffect, useRef, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import Logo from "./Logo";
import defaultProfile from "../../assets/images/default-profile.png";
import MenuPopupState from "./MenuPopupState";
import NotificationsMenu from "./NotificationsMenu";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";

const navLinks = [
  { path: "/home", display: "Inicio" },
  { path: "/doctors", display: "Buscar un médico" },
  { path: "/services", display: "Servicios" },
  { path: "/contact", display: "Contacto" },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role } = useContext(authContext);

  // Fetch data based on role
  const fetchUrl =
    role && user?._id
      ? `${BASE_URL}/${role === "patient" ? "users" : "doctors"}/${user._id}`
      : null;

  const {
    data: userData,
    loading,
    error,
    refetch,
  } = useFetchData(fetchUrl, {
    enabled: !!role && !!user && !!user._id, // Enable fetching only if role and user and user._id are not null
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleStickyHeader = () => {
      if (window.scrollY > 80) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    };
    window.addEventListener("scroll", handleStickyHeader);
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/" onClick={scrollToTop}>
              <Logo />
            </Link>
          </div>

          <div
            className="navigation md:flex"
            ref={menuRef}
            onClick={toggleMenu}
          >
            <ul className="menu flex items-center gap-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    onClick={scrollToTop}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primaryColor text-lg font-semibold"
                        : "text-textColor text-lg font-medium hover:text-primaryColor transition-colors"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 relative">
            {user ? (
              <div className="flex items-center gap-2">
                <NotificationsMenu
                  notifications={userData?.notifications}
                  refetch={refetch}
                  role={role}
                />
                <Link
                  to={`/${role === "doctor" ? "doctors" : "users"}/profile/me`}
                  onClick={scrollToTop}
                >
                  <figure className="w-[45px] h-[45px] overflow-hidden rounded-full cursor-pointer">
                    <img
                      src={user?.photo || defaultProfile}
                      className="w-full rounded-full"
                      alt="Imagen de perfil"
                    />
                  </figure>
                </Link>

                <MenuPopupState />
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-semibold h-[44px] flex items-center justify-center rounded-full transition duration-300 ease-in-out hover:bg-primaryDark">
                  Ingresar
                </button>
              </Link>
            )}
            {!user && ( // Show BiMenu only if user is not authenticated
              <span className="md:hidden" onClick={toggleMenu}>
                <BiMenu className="w-6 h-6 cursor-pointer" />
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
