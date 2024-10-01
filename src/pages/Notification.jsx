import React, { useContext, useState, useEffect } from "react";
import useFetchData from "./../hooks/useFetchData";
import { BASE_URL, token } from "./../config";
import { authContext } from "./../context/AuthContext";
import Loading from "../components/Loader/Loading";
import Error from "../components/Error/Error";

const Notification = () => {
  const { user, role } = useContext(authContext);
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 5;

  const fetchUrl = role
    ? `${BASE_URL}/${role === "patient" ? "users" : "doctors"}/${user?._id}`
    : null;

  const {
    data: userData,
    loading,
    error,
    refetch,
  } = useFetchData(fetchUrl, {
    enabled: !!role && !!user,
  });

  useEffect(() => {
    if (userData && Array.isArray(userData.notifications)) {
      const reversedNotifications = [...userData.notifications].reverse();
      setNotifications(reversedNotifications);
    }
  }, [userData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  const onMarkAsRead = async (notificationId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/notifications/${notificationId}/mark-as-read`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ read: true }),
        }
      );

      if (response.ok) {
        const updatedNotifications = notifications.map((notification) => {
          if (notification._id === notificationId) {
            return { ...notification, read: true };
          }
          return notification;
        });
        setNotifications(updatedNotifications);
      } else {
        console.error("Error al marcar notificación como leída");
      }
    } catch (error) {
      console.error("Error marcando notificación como leída:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="max-w-full w-[1080px] px-5 mx-auto">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 mt-8">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left w-1/3">
                Notificación
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de Creación
              </th>
              <th scope="col" className="px-6 py-3">
                Hora de Creación
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {currentNotifications.length > 0 ? (
              currentNotifications.map((notification) => (
                <tr key={notification._id}>
                  <td
                    scope="row"
                    className="flex items-center px-3 py-4 text-gray-900 whitespace-nowrap"
                    style={{ verticalAlign: "middle" }}
                  >
                    <p
                      className="text-base font-semibold text-textColor pr-6 max-w-xs overflow-hidden overflow-ellipsis"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {notification.message}
                    </p>
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      notification.read
                        ? "text-green-600 font-bold"
                        : "text-yellow-600 font-bold"
                    }`}
                  >
                    {notification.read ? "Leída" : "No leída"}
                  </td>
                  <td className="px-6 py-4">{formatDate(notification.date)}</td>
                  <td className="px-6 py-4">
                    {new Date(notification.date).toLocaleTimeString("es-ES")}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onMarkAsRead(notification._id)}
                      disabled={notification.read}
                      className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 ${
                        notification.read ? "cursor-not-allowed" : ""
                      }`}
                    >
                      Marcar como leída
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No se encontraron notificaciones.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 cursor-pointer"
        >
          Anterior
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={indexOfLastNotification >= notifications.length}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 cursor-pointer"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Notification;
