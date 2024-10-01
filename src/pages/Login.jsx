import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext.jsx";
import HashLoader from "react-spinners/HashLoader.js";
import eyeClosed from "../assets/images/eyeClosed.svg";
import eyeOpened from "../assets/images/eyeOpened.svg";

import { validate, validateFields } from "../utils/validation.js";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const { dispatch } = useContext(authContext);

  const handleChangeVisibility = (event) => {
    event.preventDefault();
    setVisible(!visible);
  };

  const handleInputChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [property]: value });
    setError(validate({ ...formData, [property]: value }, error));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // if (!validateFields(formData)) {
    //   toast.error("Complete los campos");
    //   return none;
    // }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });

      console.log(result, "login data");

      setLoading(false);
      toast.success(result.message);
      navigate("/home");
      window.location.reload();
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          ¡Hola! <span className="text-primaryColor">¡Bienvenido!</span> de
          nuevo 🎉
        </h3>

        <form className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5 ml-2 mr-2">
            <input
              type="text"
              placeholder="Ingresa tu correo electrónico"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066FF61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              autoFocus
            />
            <span className="text-red-500">{error.email}</span>
          </div>

          <div className="mb-5 ml-2 mr-2 relative">
            <div className="flex items-center relative">
              <input
                type={visible ? "text" : "password"}
                placeholder="Contraseña"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full py-3 pr-10 border-b border-solid border-[#0066FF61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                required
              />
              <span
                onClick={handleChangeVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                style={{ top: 0 }} // Botón a la misma altura que el input
              >
                <img
                  src={visible ? eyeOpened : eyeClosed}
                  alt="Toggle visibility"
                  className="w-6 h-6"
                />
              </span>
            </div>
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              {loading ? (
                <HashLoader size={25} color="#FFF" />
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-primaryColor font-medium ml-1">
              Registrarse
            </Link>
          </p>

          <p className="mt-5 text-textColor text-center">
            ¿Olvidaste tu contraseña?{" "}
            <Link
              to="/forgottenpassword"
              className="text-primaryColor font-medium ml-1"
            >
              Recuperar contraseña
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
