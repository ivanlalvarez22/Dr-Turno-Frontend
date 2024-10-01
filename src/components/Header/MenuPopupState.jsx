import React from "react";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import { FaChevronDown } from "react-icons/fa";

function MenuPopupState() {
  const { role, dispatch } = useContext(authContext);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Hace que el desplazamiento sea suave
    });
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <FaChevronDown
            variant="contained"
            {...bindTrigger(popupState)}
            className="cursor-pointer mt-2"
          />
          <Menu {...bindMenu(popupState)}>
            <Link
              to={`/${role === "doctor" ? "doctors" : "users"}/profile/me`}
              className="block px-3 py-1 text-gray-800"
              onClick={scrollToTop}
            >
              <MenuItem onClick={popupState.close}>Mi perfil</MenuItem>
            </Link>

            <Link
              to="/doctors"
              className="block px-3 py-1 text-gray-800"
              onClick={scrollToTop}
            >
              <MenuItem onClick={popupState.close}>Buscar un doctor</MenuItem>
            </Link>

            <Link
              to="/contact"
              className="block px-3 py-1 text-gray-800"
              onClick={scrollToTop}
            >
              <MenuItem onClick={popupState.close}>Contacto</MenuItem>
            </Link>

            <Link
              to="/services"
              className="block px-3 py-1 text-gray-800"
              onClick={scrollToTop}
            >
              <MenuItem onClick={popupState.close}>Servicios</MenuItem>
            </Link>

            <Link to="/login" className="block px-3 py-1 text-gray-800">
              <MenuItem
                onClick={() => {
                  popupState.close();
                  handleLogout();
                }}
              >
                Cerrar sesión
              </MenuItem>
            </Link>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

export default MenuPopupState;
