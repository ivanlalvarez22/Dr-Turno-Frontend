import { formateDate } from "../../utils/FormateDate";
import defaultProfile from "./../../assets/images/default-profile.png";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Appointments = ({ appointments, onDelete, onApprove, name, gender }) => {
  const handleApprove = async (appointment) => {
    swal({
      title: "¡Atención!",
      text: "¿Está seguro/a de aprobar la cita?",
      icon: "warning",
      buttons: ["No", "Sí, aprobar la cita"],
    }).then(async (response) => {
      if (response) {
        if (response) {
          const { _id, user, date, time } = appointment;
          const to = user.email;
          const subject = "Cita Aprobada";
          const genderMessage = gender === "masculino" ? "el Dr." : "la Dra.";
          const body = `Hola ${user.name},\n\nTu cita con ${genderMessage} ${name} está aprobada.\n\nDetalles de la cita:\nFecha: ${date}\nHora: ${time}\n\nGracias.`;

          try {
            // Llama a la función onApprove (si existe alguna lógica adicional para aprobar la cita)
            await onApprove(_id);

            // Construye la URL adecuada según el tipo de dispositivo
            let redirectUrl;
            if (
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              )
            ) {
              // Si es un dispositivo móvil
              redirectUrl = `mailto:${to}?subject=${encodeURIComponent(
                subject
              )}&body=${encodeURIComponent(body)}`;
            } else {
              // Si es una computadora de escritorio
              const gmailComposeUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodeURIComponent(
                to
              )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                body
              )}`;
              redirectUrl = gmailComposeUrl;
            }

            // Abre el enlace en una nueva pestaña
            window.open(redirectUrl, "_blank");

            // Construye la URL de WhatsApp
            const whatsappUrl = `https://api.whatsapp.com/send?phone=+${encodeURIComponent(
              user.phone
            )}&text=${encodeURIComponent(body)}`;

            // Abre el enlace de WhatsApp en una nueva pestaña
            window.open(whatsappUrl, "_blank");

            // En este punto, la cita ya ha sido aprobada y el correo electrónico del médico está abierto en el cliente de correo electrónico.
          } catch (error) {
            console.error("Error al aprobar la cita:", error);
            // Maneja el error según sea necesario
          }
        }
      }
    });
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Desplaza al principio de la página
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Obra Social
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              Teléfono
            </th>
            <th scope="col" className="px-6 py-3">
              Reservado
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
          {appointments.length > 0 ? (
            appointments
              .slice()
              .reverse()
              .map((item) => (
                <tr key={item._id}>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <img
                      src={item.user.photo || defaultProfile}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                    <Link
                      to={`/users/${item.user._id}/medical-history`}
                      className="block"
                      onClick={scrollToTop}
                    >
                      <div className="pl-3">
                        <div
                          className="text-base font-semibold truncate w-[150px]"
                          title={item.user.name}
                        >
                          {item.user.name}
                        </div>
                        <div
                          className="text-normal text-gray-500 truncate w-[150px]"
                          title={item.user.email}
                        >
                          {item.user.email}
                        </div>
                      </div>
                    </Link>
                  </th>
                  <td className="px-6 py-4">{item.user.healthInsurance}</td>
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
                  <td className="px-6 py-4 text-black-600 font-bold">
                    {item.user.phone}
                  </td>
                  <td className="px-6 py-4 text-black-600 font-bold">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-black-600 font-bold">
                    {item.time}
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => handleApprove(item)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => onDelete(item._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="7" className="px-6 py-4 text-center">
                No se encontraron reservas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
