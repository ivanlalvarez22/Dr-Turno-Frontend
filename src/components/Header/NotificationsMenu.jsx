import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";

function NotificationsMenu({ notifications, refetch, role }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Ajustar el rol según el tipo de usuario
  role = role === "patient" ? "users" : role === "doctor" ? "doctors" : role;

  // Comprobar cuántas notificaciones no leídas hay
  const unreadCount = () => {
    return notifications
      ? notifications.filter((notification) => !notification.read).length
      : 0;
  };

  // Función para desplazar la ventana al principio
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Manejar la apertura y cierre del menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    refetch();
  };

  // Función para cerrar el menú si se hace clic fuera de él
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    // Agregar event listener para cerrar el menú al hacer clic fuera de él
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remover event listener al desmontar el componente
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div onClick={toggleMenu} className="cursor-pointer relative">
        <FaRegBell className="text-primaryColor w-7 h-7 opacity-85 mr-4 mt-4" />
        {unreadCount() > 0 && (
          <div className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
            {unreadCount()}
          </div>
        )}
      </div>
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute top-12 right-[-85px] mt-2 p-1 w-60 bg-white rounded-md shadow-lg z-10`}
      >
        <div>
          {unreadCount() > 0 ? (
            notifications
              .slice(-5)
              .reverse()
              .map((notification, index) => (
                <Link
                  key={index}
                  to={`/${role}/notifications/`}
                  className={`block px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-blue-100 mt-2 mb-2 ${
                    notification.read ? "bg-white" : "bg-yellow-50"
                  }`}
                  onClick={() => {
                    scrollToTop();
                    toggleMenu();
                  }}
                >
                  {notification.message}
                </Link>
              ))
          ) : (
            <div className="px-3 py-1 text-sm text-gray-800">
              No hay notificaciones
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationsMenu;
