import React, { useContext, useState } from "react";
import { authContext } from "./../../context/AuthContext";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL, token } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { toast } from "react-toastify";
import swal from "sweetalert";

const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");

  const {
    data: userData,
    loading,
    error,
    refetch,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const handleDeleteAppointment = async (appointmentId) => {
    swal({
      title: "¡Atención!",
      text: "¿Está seguro/a de cancelar la cita?",
      icon: "warning",
      buttons: ["No", "Sí, cancelar cita"],
    }).then(async (response) => {
      if (response) {
        try {
          // Cambiar el estado de la cita a "cancelled"
          const response = await fetch(
            `${BASE_URL}/bookings/${appointmentId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ status: "cancelado" }),
            }
          );

          if (!response.ok) {
            throw new Error("Error al cancelar la cita");
          }

          toast.success("Cita cancelada exitosamente");
          refetch();
        } catch (error) {
          console.error("Error al cancelar la cita:", error);
          toast.error("Hubo un problema al cancelar la cita");
        }
      }
    });
  };

  return (
    <section>
      <div className="container">
        {loading && !error && <Loading />}

        {error && !loading && <Error errMessage={error} />}

        {!loading && !error && (
          <div className="lg:grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <div className="pb-[50px] px-[30px] mb-[40px] rounded-md bg-indigo-50 p-10 shadow-xl max-w-md mx-auto">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  <img
                    src={userData.photo}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {userData.name}
                </h3>

                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {userData.email}
                </p>

                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Tipo de Sangre:{" "}
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {userData.bloodType}
                  </span>
                </p>

                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Obra Social:{" "}
                  <span className="ml-2 text-headingColor text-[18px] leading-8">
                    {userData.healthInsurance}
                  </span>
                </p>
              </div>

              <div className="mt-[50px] md:mt-[100px]">
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                >
                  Cerrar Sesión
                </button>
                <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                  Borrar Cuenta
                </button>
              </div>
            </div>

            <div className="sm:col-span-2 sm:px-[30px]">
              <div className="flex flex-col lg:flex-row">
                <button
                  onClick={() => {
                    setTab("bookings");
                    refetch();
                  }}
                  className={` ${
                    tab === "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor mt-4 mx-2`}
                >
                  Mis Reservas
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={` ${
                    tab === "settings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor mt-4 mx-2`}
                >
                  Configuración de Perfil
                </button>
              </div>

              {tab === "bookings" && (
                <MyBookings onDelete={handleDeleteAppointment} />
              )}
              {tab === "settings" && <Profile user={userData} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
