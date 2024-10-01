import React from "react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { Link } from "react-router-dom";
import defaultProfile from "./../../assets/images/default-profile.png";

const MisReservas = ({ onDelete }) => {
  const { data, loading, error } = useFetchData(
    `${BASE_URL}/users/appointments/my-appointments`
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Hace que el desplazamiento sea suave
    });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  const citas = data?.appointments || [];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 mt-8">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Profesional
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha de Creación
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha de Reserva
            </th>
            <th scope="col" className="px-6 py-3">
              Hora
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {citas.length > 0 ? (
            citas
              .slice()
              .reverse()
              .map((item) => (
                <tr key={item._id}>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <div className="flex items-center">
                      <figure className="w-[45px] h-[45px] overflow-hidden rounded-full cursor-pointer">
                        <img
                          src={item.doctor.photo || defaultProfile}
                          className="w-full"
                          alt=""
                        />
                      </figure>

                      <Link
                        to={`/doctors/${item.doctor._id}/`}
                        className="block pl-3"
                        onClick={scrollToTop}
                      >
                        <div>
                          <div
                            className="text-base font-semibold text-irisBlueColor truncate max-w-[180px]"
                            title={item.doctor.name}
                          >
                            {item.doctor.name}
                          </div>
                          <div
                            className="text-normal text-gray-500 truncate max-w-[150px]"
                            title={item.doctor.specialization}
                          >
                            {item.doctor.specialization}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </th>

                  <td
                    className={`px-6 py-4 ${
                      item.status === "aprobado"
                        ? "bg-green-100 text-green-600 font-bold"
                        : item.status === "pendiente"
                        ? "bg-yellow-100 text-yellow-600 font-bold"
                        : item.status === "cancelado"
                        ? "bg-red-100 text-red-600 font-bold"
                        : ""
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="px-6 py-4">{formatDate(item.createdAt)}</td>
                  <td className="px-6 py-4 text-black-600 font-bold">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-black-600 font-bold">
                    {item.time}
                  </td>
                  <td className="px-6 py-4">
                    {item.status === "cancelado" ? (
                      <span className="text-red-600 font-bold">
                        Turno cancelado
                      </span>
                    ) : (
                      <button
                        onClick={() => onDelete(item._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                      >
                        Cancelar
                      </button>
                    )}
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center">
                No se encontraron reservas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MisReservas;
