import { useState } from "react";
import signUpImg from "../assets/images/signup.gif";
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../utils/uploadCloudinary";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import eyeClosed from "../assets/images/eyeClosed.svg";
import eyeOpened from "../assets/images/eyeOpened.svg";

import { validate, validateFields } from "../utils/validationSignup.js";
const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dni: "",
    password: "",
    confirmPassword: "", // Initialize confirmPassword
    photo: selectedFile,
    gender: "",
    role: "patient",
    phone: "", // Agregado el campo para el número de teléfono
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    dni: "",
    password: "",
    confirmPassword: "", // Initialize confirmPassword
    photo: selectedFile,
    gender: "",
    role: "patient",
    phone: "", // Agregado el campo para el número de teléfono
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [property]: value });
    setError(validate({ ...formData, [property]: value }, error));
  };

  const handleChangeVisibility = (event) => {
    event.preventDefault();
    setVisible(!visible);
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    const data = await uploadImageToCloudinary(file);

    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!validateFields(formData)) {
      toast.error("Complete los campos");
      return;
    }

    // if (formData.password !== formData.confirmPassword) {
    //   toast.error("Las contraseñas no coinciden");
    //   return;
    // }

    setLoading(true);

    try {
      console.log(formData);
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 lx:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ========= img box ========= */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signUpImg} alt="" className="w-full rounded-l-lg" />
            </figure>
          </div>

          {/* ========= sign up form ========= */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Crear una <span className="text-primaryColor">cuenta</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className="mb-5 ml-2 mr-2">
                <input
                  type="text"
                  placeholder="Nombre Completo"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066FF61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  autoFocus
                />
                <span className="text-red-500">{error.name}</span>
              </div>

              <div className="mb-5 ml-2 mr-2">
                <input
                  type="text"
                  placeholder="Ingrese Su Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066FF61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                />
                <span className="text-red-500">{error.email}</span>
              </div>

              <div className="mb-5 ml-2 mr-2">
                <input
                  type="text"
                  placeholder="Ingrese su DNI"
                  name="dni"
                  value={formData.dni}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066FF61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                />
                <span className="text-red-500">{error.dni}</span>
              </div>

              <div className="mb-5 ml-2 mr-2">
                <input
                  type="tel"
                  placeholder="Número De Celular"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066FF61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                />
                <span className="text-red-500">{error.phone}</span>
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
                <span className="block text-red-500 mt-1">
                  {error.password}
                </span>
              </div>

              <div className="mb-5 ml-2 mr-2 relative">
                <div className="flex items-center relative">
                  <input
                    type={visible ? "text" : "password"}
                    placeholder="Confirmar contraseña"
                    name="confirmPassword"
                    value={formData.confirmPassword}
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
                <span className="block text-red-500 mt-1">
                  {error.confirmPassword}
                </span>
              </div>

              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  ¿Eres un:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="patient">Paciente</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>
                <div>
                  <label className="text-headingColor font-bold text-[16px] leading-7">
                    Género:
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                    >
                      <option value="patient">Seleccione</option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                      <option value="otro">Otro</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="mb-5 flex items-center gap-3">
                {selectedFile && (
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                    <img
                      src={previewURL}
                      alt=""
                      className="w-full rounded-full"
                    />
                  </figure>
                )}

                <div className="relative w-[130px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=".jpg, .png"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <label
                    htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066FF46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                  >
                    Subir Foto
                  </label>
                </div>
              </div>

              <div className="mt-7">
                <button
                  disabled={loading && true}
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  {loading ? (
                    <HashLoader size={35} color="#FFFFFF" />
                  ) : (
                    "Registrarse"
                  )}
                </button>
              </div>

              <p className="mt-5 text-textColor text-center">
                ¿Ya tiene una cuenta?{" "}
                <Link
                  to="/login"
                  className="text-primaryColor font-medium ml-1"
                >
                  Iniciar Sesión
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
