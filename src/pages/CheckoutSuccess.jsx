import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Importar el ícono de check de FontAwesome

const CheckoutSuccess = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6 md:mx-auto">
        <div className="text-center">
          <div className="rounded-full bg-green-600 w-16 h-16 flex items-center justify-center mx-auto my-6">
            <FaCheckCircle className="text-white w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold mt-4">¡Pago Completado!</h3>
          <p className="text-gray-600 my-2">
            Gracias por completar tu pago en línea de forma segura.
          </p>
          <p>¡Que tengas un excelente día!</p>
          <div className="py-10 text-center">
            <Link
              to="/home"
              className="px-12 bg-buttonBgColor text-white font-semibold py-3 rounded-lg inline-block mt-4"
            >
              Volver a la página principal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
