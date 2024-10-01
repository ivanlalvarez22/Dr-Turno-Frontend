import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { RiLinkedinFill } from "react-icons/ri";
import {
  AiFillYoutube,
  AiFillGithub,
  AiOutlineInstagram,
} from "react-icons/ai";
import Logo from "../Header/Logo";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";

const DonateHandler = async () => {
  try {
    const response = await fetch(`${BASE_URL}/bookings/checkout-session/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(`${data.message}. Por favor, intente de nuevo.`);
    }

    const data = await response.json();

    console.log(data);
    if (data.session && data.session.url) {
      window.location.href = data.session.url;
    } else {
      throw new Error("URL de sesión no encontrada en la respuesta.");
    }
  } catch (error) {
    toast.error(error.message);
  }
};

const socialLinks = [
  {
    path: "https://www.youtube.com/@itsesde5094",
    icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />,
    target: "_blank",
  },
  {
    path: "https://www.github.com/ivanlalvarez22",
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
    target: "_blank",
  },
  {
    path: "https://www.instagram.com/ivanlalvarez22",
    icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" />,
    target: "_blank",
  },
  {
    path: "https://linkedin.com/in/ivanlalvarez22",
    icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" />,
    target: "_blank",
  },
];

const quickLinks01 = [
  {
    path: "/home",
    display: "Inicio",
  },
  {
    path: "/about",
    display: "Sobre nosotros",
  },
  {
    path: "/services",
    display: "Servicios",
  },
  {
    path: "/",
    display: "Blog",
  },
];

const quickLinks02 = [
  {
    path: "/doctors",
    display: "Buscar un médico",
  },
  {
    path: "/doctors",
    display: "Solicitar una cita",
  },
  {
    path: "/",
    display: "Encontrar ubicación",
  },
  {
    path: "/doctors/",
    display: "Obtener una opinión",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="pb-16 pt-10">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <Link to="/" onClick={scrollToTop}>
              <Logo />
            </Link>
            <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">
              Copyright © {year} <br /> Desarrollado con ❤️ por Ivan, Cris,
              Santino, Hernan y Dolo
            </p>

            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.path}
                  target={link.target}
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Enlaces rápidos
            </h2>

            <ul>
              {quickLinks01.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font[400] text-textColor"
                    onClick={scrollToTop}
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Quiero:
            </h2>

            <ul>
              {quickLinks02.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font[400] text-textColor"
                    onClick={scrollToTop}
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Soporte
            </h2>

            <ul>
              <li className="mb-4">
                <Link
                  to={`contact`}
                  className="text-[16px] leading-7 font[400] text-textColor"
                  onClick={scrollToTop}
                >
                  Contáctenos
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  className="text-[16px] leading-7 font[400] text-yellow-500 font-semibold"
                  onClick={DonateHandler}
                >
                  Donar 💛
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
