import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAmbulance } from "@fortawesome/free-solid-svg-icons"; // Icono de una cruz de hospital
// faFirstAid, faStethoscope, faTemperatureHigh, faHeartbeat

const Logo = () => {
  return (
    <div className="flex items-center">
      <FontAwesomeIcon icon={faAmbulance} className="text-blue-600 text-2xl" />
      <span className="text-black text-xl font-bold ml-2">Dr. Turno</span>
    </div>
  );
};

export default Logo;
