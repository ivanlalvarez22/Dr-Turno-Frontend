import React from "react";
import heroImg01 from "../assets/images/hero-img001.png";
import heroImg02 from "../assets/images/hero-img02.png";
import heroImg03 from "../assets/images/hero-img03.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import featureImg from "../assets/images/feature-img001.png";
import faqImg from "../assets/images/faq-img.png";
import videoIcon from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/avatar-icon001.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import About from "../components/About/About";
import ServiceList from "../components/Services/ServiceList";
import DoctorList from "../components/Doctors/DoctorList";
import FaqList from "../components/Faq/FaqList";
import Testimonial from "../components/Testimonial/Testimonial";

const Home = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Hace que el desplazamiento sea suave
    });
  };

  window.addEventListener("mouseover", initLandbot, { once: true });
  window.addEventListener("touchstart", initLandbot, { once: true });
  var myLandbot;
  function initLandbot() {
    if (!myLandbot) {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.addEventListener("load", function () {
        var myLandbot = new Landbot.Livechat({
          configUrl:
            "https://storage.googleapis.com/landbot.online/v3/H-2618822-RAD4IQB4CDXITXFK/index.json",
        });
      });
      s.src = "https://cdn.landbot.io/landbot-3/landbot-3.0.0.js";
      var x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
    }
  }

  return (
    <>
      {/* ===== hero section ===== */}
      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* ====== hero content ====== */}
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                  Turnos médicos al alcance de tu mano.
                </h1>
                <p className="text__para">
                  Brindamos atención médica de alta calidad, combinando
                  experiencia y tecnología avanzada para mejorar la salud y el
                  bienestar de nuestros pacientes. Nuestro equipo está aquí para
                  apoyar a cada paciente en su camino hacia una vida más
                  saludable.
                </p>
                <Link to="/doctors" onClick={scrollToTop}>
                  <button className="btn btn-custom-shadow text-xl">
                    Solicitar turno
                  </button>
                </Link>
              </div>
              {/* ====== hero counter ====== */}
              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-30[px]">
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    30+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Años de Experiencia</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    15+
                  </h2>
                  <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Especialidades</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    100%
                  </h2>
                  <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Satisfacción del Paciente</p>
                </div>
              </div>
            </div>
            {/* ====== hero counter end ====== */}
            <div className="flex gap-[30px] justify-end">
              <div>
                <img className="w-full rounded-xl" src={heroImg01} alt="" />
              </div>
              <div className="mt-[30px]">
                <img className="w-full mb-[30px]" src={heroImg02} alt="" />
                <img className="w-full mb-[30px]" src={heroImg03} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== hero section end ====== */}
      {/* ========= Featured Services Section ========= */}
      <section>
        <div className="container">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="heading text-center">
              Proporcionando los mejores servicios médicos
            </h2>
            <p className="text__para text-center">
              Atención de primera clase para todos. Nuestro sistema de salud
              ofrece atención experta inigualable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            <Link to="/doctors">
              <div className="py-[30px] px-5">
                <div className="flex items-center justify-center">
                  <img src={icon01} alt="" />
                </div>
                <div className="mt-[30px]">
                  <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                    Encuentra un médico
                  </h2>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                    Atención médica de primer nivel para todos. Nuestro sistema
                    de salud ofrece atención experta inigualable. Desde el
                    laboratorio hasta la clínica.
                  </p>
                  <div className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/doctors">
              <div className="py-[30px] px-5">
                <div className="flex items-center justify-center">
                  <img src={icon02} alt="" />
                </div>
                <div className="mt-[30px]">
                  <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                    Encuentra nuestra ubicación
                  </h2>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                    Atención médica excepcional para todos. Nuestro sistema de
                    salud brinda cuidados expertos sin igual. Desde el
                    laboratorio hasta la sala de consulta.
                  </p>
                  <div className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/doctors">
              <div className="py-[30px] px-5">
                <div className="flex items-center justify-center">
                  <img src={icon03} alt="" />
                </div>
                <div className="mt-[30px]">
                  <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                    Reservar un turno
                  </h2>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                    Atención médica excepcional para todos. Ofrecemos cuidados
                    expertos sin igual. Desde el laboratorio hasta la clínica.
                  </p>
                  <div className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* ========= Featured Services Section ========= */}
      <About />
      {/* ========= Services section ========= */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Nuestros servicios médicos</h2>
            <p className="text__para text-center">
              Atención de clase mundial para todos. Nuestro sistema de salud
              ofrece atención experta inigualable.
            </p>
          </div>
          <ServiceList />
        </div>
      </section>
      {/* ========= Services section end ========= */}
      {/* ========= feature section ========= */}
      <section>
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row">
            {/* ========= feature content ========= */}
            <div className="xl:w-[670px]">
              <h2 className="heading">
                Accede a servicios de <br />
                <span className="text-red-600"> salud ❤</span> en cualquier
                momento.
              </h2>
              <ul className="pl-4">
                <li className="text__para">
                  1. Programa la cita directamente.
                </li>
                <li className="text__para">
                  2. Busca a tu médico aquí y contacta su consultorio.
                </li>
                <li className="text__para">
                  3. Visualiza a nuestros médicos que están aceptando nuevos
                  pacientes, utiliza la herramienta de programación en línea
                  para seleccionar una hora de cita.
                </li>
              </ul>

              <Link to="/">
                <button className="btn btn-custom-shadow">Ver más</button>
              </Link>
            </div>

            {/* ========= feature img ========= */}
            <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
              <img src={featureImg} className="w-3/4 rounded-xl" alt="" />

              <div className="w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px] lg:gap-3">
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600]">
                      Martes, 24
                    </p>
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[400]">
                      10:00AM
                    </p>
                  </div>
                  <span className="w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify center bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px]">
                    <img src={videoIcon} alt="" />
                  </span>
                </div>

                <div className="w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full">
                  Consulta
                </div>

                <div className="flex itemx-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]">
                  <img src={avatarIcon} alt="" />
                  <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor">
                    Dra. Grierson
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ========= feature section end ========= */}
      {/* ========= our great doctors ========= */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Nuestros excelentes médicos</h2>
            <p className="text__para text-center">
              Atención médica de clase mundial para todos. Nuestro sistema de
              salud ofrece atención médica experta incomparable.
            </p>
          </div>
          <DoctorList />
        </div>
      </section>
      {/* our great doctors end */}
      {/* ========= faq section ========= */}
      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block">
              <img src={faqImg} alt="" />
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="heading">
                La mayoría de las preguntas de nuestros queridos pacientes
              </h2>

              <FaqList />
            </div>
          </div>
        </div>
      </section>
      {/* ========= faq section end ========= */}
      {/* ========= testimonial ========= */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">
              Lo que dicen nuestros pacientes
            </h2>
            <p className="text__para text-center">
              Atención médica de clase mundial para todos. Nuestro sistema de
              salud ofrece atención médica experta incomparable.
            </p>
          </div>

          <Testimonial />
        </div>
      </section>
      {/* ========= testimonial end ========= */}
    </>
  );
};

export default Home;
