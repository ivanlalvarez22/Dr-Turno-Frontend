import React from "react";
import aboutImg from "../../assets/images/about001.png";
import aboutCardImg from "../../assets/images/about-card.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          {/* ========= about img ========= */}
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img className="rounded-xl" src={aboutImg} alt="" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
              <img src="" alt="" />
            </div>
          </div>

          {/* ========= about content ========= */}
          <div className="w-full lg:w1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">
              Orgullosos de ser uno de los mejores del país
            </h2>
            <p className="text__para">
              Durante 30 años seguidos, el Ministerio de Salud de Argentina nos
              ha reconocido como uno de las mejores clínicas del país y la{" "}
              <span className="text-primaryColor">#1</span> en Santiago del Estero. Lorem ipsum, dolor sit
              amet consectetur adipisicing elit. Quas, nemo?
            </p>

            <p className="text__para mt-[30px]">
              Nuestro mejor esfuerzo es algo por lo que luchamos cada día,
              cuidando a nuestros pacientes, sin mirar atrás a lo que hemos
              logrado, sino hacia lo que podemos hacer mañana. Proporcionando lo
              mejor. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Aliquid, modi?
            </p>

            <Link to="/">
              <button className="btn btn-custom-shadow">Ver más</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
