const convertTime = (time) => {
  const timeParts = time.split(":");
  let hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);

  // Si las horas son menores a 10, agregar un cero al inicio para mantener el formato
  if (hours < 10) {
    hours = "0" + hours;
  }

  // Devolver la hora formateada en formato de 24 horas
  return hours.toString() + ":" + minutes.toString().padStart(2, "0");
};

export default convertTime;
