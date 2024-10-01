import React, { useState } from "react";
import defaultProfile from "./../../assets/images/default-profile.png";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL, token } from "../../config";
import Tabs from "./Tabs";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "./../../pages/Doctors/DoctorAbout";
import Profile from "./Profile";
import Appointments from "./Appointments";
import { toast } from "react-toastify";
import swal from "sweetalert";

const Dashboard = () => {
  const { data, loading, error, refetch } = useGetProfile(
    `${BASE_URL}/doctors/profile/me`
  );

  const [tab, setTab] = useState("overview");

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

  const handleApproveAppointment = async (appointmentId) => {
    try {
      // Cambiar el estado de la cita a "approved"
      const response = await fetch(`${BASE_URL}/bookings/${appointmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "aprobado" }),
      });

      if (!response.ok) {
        throw new Error("Error al aprobar la cita");
      }

      toast.success("Cita aprobada exitosamente");
      refetch();
    } catch (error) {
      console.error("Error al aprobar la cita:", error);
      toast.error("Hubo un problema al aprobar la cita");
    }
  };

  return (
    <section>
      <div className="container">
        {loading && !error && <Loader />}
        {error && !loading && <Error />}

        {!loading && !error && (
          <div className="lg:grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} refetch={refetch} />
            <div className="lg:col-span-2">
              {data.isApproved === "pending" && (
                <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg">
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>

                  <span className="sr-only">Información</span>
                  <div className="ml-3 text-sm font-medium">
                    Para obtener aprobación, complete su perfil. Revisaremos
                    manualmente y aprobaremos dentro de 3 días.
                  </div>
                </div>
              )}

              <div className="mt-8">
                {tab === "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="max-w-[200px] max-h-[200px] w-[200px] h-[200px] overflow-hidden">
                        <img
                          src={data?.photo || defaultProfile}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </figure>

                      <div>
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                          {data.specialization ? data.specialization : "Doctor"}
                        </span>

                        <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3">
                          {data.name}
                        </h3>

                        <div className="flex items-center gap-[6px]">
                          <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            <img src={starIcon} alt="" />
                            {data.averageRating}
                          </span>
                          <span className=" text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            ({data.totalRating})
                          </span>
                        </div>
                        <p className="text__para font-[15px] lg:max-w[390px] leading-6">
                          {data?.bio}
                        </p>
                      </div>
                    </div>
                    <DoctorAbout
                      name={data.name}
                      about={data.about}
                      qualifications={data.qualifications}
                      experiences={data.experiences}
                    />
                  </div>
                )}
                {tab === "appointments" && (
                  <Appointments
                    appointments={data.appointments}
                    name={data.name}
                    gender={data.gender}
                    onDelete={handleDeleteAppointment}
                    onApprove={handleApproveAppointment}
                  />
                )}
                {tab === "settings" && <Profile doctorData={data} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
