import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader.js";
import eyeClosed from "../assets/images/eyeClosed.svg";
import eyeOpened from "../assets/images/eyeOpened.svg";

import { validate, validateFields } from "../utils/validationResetPassword.js";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { token } = useParams();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [error, setError] = useState({
    password: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [property]: value });
    setError(validate({ ...formData, [property]: value }, error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields(formData)) {
      toast.error("Por favor, complete los campos correctamente.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: formData.password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al restablecer la contraseña");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeVisibility = (event) => {
    event.preventDefault();
    setVisible(!visible);
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Restablecer Contraseña
        </h3>

        <form onSubmit={handleSubmit} className="py-4 md:py-0">
          <div className="mb-5 ml-2 mr-2 relative">
            <div className="flex items-center relative">
              <input
                type={visible ? "text" : "password"}
                placeholder="Nueva contraseña"
                name="password"
                value={formData.password}
                onChange={handleChange}
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
            <span className="block text-red-500 mt-1">{error.password}</span>
          </div>

          <div className="mb-5 ml-2 mr-2 relative">
            <div className="flex items-center relative">
              <input
                type={visible ? "text" : "password"}
                placeholder="Confirmar contraseña"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
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
            <span className="block text-red-500 mt-1">
              {error.confirmPassword}
            </span>
          </div>

          <div className="mt-7">
            <button
              type="submit" // Asegúrate de que el tipo sea "submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              disabled={loading}
            >
              {loading ? (
                <HashLoader size={25} color="#FFF" />
              ) : (
                "Restablecer Contraseña"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
