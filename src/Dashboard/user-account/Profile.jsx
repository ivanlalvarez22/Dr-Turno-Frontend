import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import obrasSociales from "./obrasSociales";

const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dni: "",
    phone: "",
    password: "",
    photo: null,
    gender: "",
    bloodType: "",
    healthInsurance: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: user?.name,
      email: user?.email,
      dni: user?.dni,
      phone: user?.phone,
      password: user?.password,
      photo: user?.photo,
      gender: user?.gender,
      bloodType: user?.bloodType || "",
      healthInsurance: user?.healthInsurance || "",
    });
  }, [user]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/users/profile/me");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
    scrollToTop();
  };

  return (
    <div className="mt-10">
      <form onSubmit={submitHandler}>
        <div className="mb-5 flex items-center">
          <label className="mr-4 text-[16px] text-headingColor w-[85px] font-bold">
            Nombre:
          </label>
          <input
            type="text"
            placeholder="Nombre Completo"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066FF61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            autoFocus
            required
          />
        </div>

        <div className="mb-5 flex items-center">
          <label className="mr-4 text-[16px] text-headingColor w-[85px] font-bold">
            DNI:
          </label>
          <input
            type="text"
            placeholder="Ingrese su DNI"
            name="dni"
            value={formData.dni}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066FF61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            required
          />
        </div>

        <div className="mb-5 flex items-center">
          <label className="mr-4 text-[16px] text-headingColor w-[85px] font-bold">
            Email:
          </label>
          <input
            type="email"
            placeholder="Ingrese su Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066FF61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            aria-readonly
            readOnly
          />
        </div>

        <div className="mb-5 flex items-center">
          <label className="mr-4 text-[16px] text-headingColor w-[85px] font-bold">
            Tipo de Sangre:
          </label>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066FF61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
            required
          >
            <option value="" disabled>
              Selecciona tu tipo de sangre
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="mb-5 flex items-center">
          <label className="mr-4 text-[16px] text-headingColor w-[85px] font-bold">
            Obra Social:
          </label>
          <select
            name="healthInsurance"
            value={formData.healthInsurance}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066FF61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            required
          >
            <option value="">Seleccione una obra social</option>
            {obrasSociales.map((obraSocial) => (
              <option key={obraSocial} value={obraSocial}>
                {obraSocial}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5 flex items-center">
          <label className="mr-4 text-[16px] text-headingColor w-[85px] font-bold">
            Celular:
          </label>
          <input
            type="text"
            placeholder="Número de Celular"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066FF61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            required
          />
        </div>

        <div className="mb-5 flex items-center">
          <label className="mr-5 text-[16px] text-headingColor font-bold leading-7">
            Género:
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none cursor-pointer border-2 rounded-xl"
          >
            <option value="">Select</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
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
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066FF46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              Subir Foto
            </label>
          </div>
        </div>

        <div className="mt-7">
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
          >
            {loading ? (
              <HashLoader size={25} color="#FFFFFF" />
            ) : (
              "Actualizar Perfil"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
