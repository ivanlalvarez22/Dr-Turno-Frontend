import React from "react";
import starIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import defaultProfile from "./../../assets/images/default-profile.png";

const DoctorCard = ({ doctor }) => {
  const {
    _id,
    name,
    avgRating,
    totalRating,
    photo,
    specialization,
    experiences,
  } = doctor;

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Desplaza al principio de la página
  };

  return (
    <div className="p-4 lg:p-6">
      <Link to={`/doctors/${_id}`} onClick={scrollToTop} className="block">
        <figure
          className="relative w-full overflow-hidden rounded-md"
          style={{ paddingBottom: "100%" }}
        >
          <img
            src={photo || defaultProfile}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Doctor"
          />
        </figure>
      </Link>

      <h2 className="text-lg lg:text-2xl font-bold mt-4 lg:mt-6 text-headingColor">
        {name}
      </h2>

      <div className="mt-3 lg:mt-5 flex items-center justify-between">
        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-3 lg:py-2 lg:px-4 text-sm lg:text-base font-semibold rounded">
          {specialization ? specialization : "Doctor"}
        </span>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-sm lg:text-base font-semibold text-headingColor">
            <img src={starIcon} alt="Rating" /> {avgRating}
          </span>
          <span className="text-sm lg:text-base font-normal text-textColor">
            ({totalRating})
          </span>
        </div>
      </div>

      <div className="mt-4 lg:mt-6 flex items-center justify-between">
        <div>
          <p className="text-sm lg:text-base font-normal text-textColor">
            En{" "}
            {experiences && experiences.length > 0
              ? experiences[0]?.hospital
              : "Hospital.."}
          </p>
        </div>
        <Link to={`/doctors/${_id}`} className="block" onClick={scrollToTop}>
          <div className="w-11 h-11 rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none">
            <BsArrowRight className="group-hover:text-white w-5 h-5" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
