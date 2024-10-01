import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import BasicDateCalendar from "./BasicDateCalendar"; // Importa tu componente de calendario personalizado
import convertTime from "../../utils/convertTime"; // Asegúrate de que esta ruta es correcta
import { BASE_URL, token } from "./../../config";
import { toast } from "react-toastify";
import { format } from "date-fns";

const SidePanel = ({
  doctorId,
  ticketPrice,
  timeSlots,
  appointments,
  refetch,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes());
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    if (selectedDate.toDateString() === new Date().toDateString()) {
      setCurrentHour(new Date().getHours());
    } else {
      setCurrentHour(0); // Reset currentHour if the selected date is not today
      setCurrentMinute(0);
    }
  }, [selectedDate]);

  useEffect(() => {
    generateAvailableTimes();
  }, [timeSlots, selectedDate]);

  const weekdayNames = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date.toDate()); // Convertir Day.js date a JavaScript Date
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const isTimeAvailable = (time) => {
    const selectedDateString = format(selectedDate, "dd/MM/yyyy"); // Formatear la fecha como "DD/MM/YYYY"

    const appointmentsOnSelectedDate = appointments.filter((appointment) => {
      const appointmentDateString = appointment.date; // La fecha ya está en formato 'DD/MM/YYYY'
      return (
        appointmentDateString === selectedDateString &&
        (appointment.status === "aprobado" ||
          appointment.status === "pendiente")
      );
    });

    const appointmentTimesOnSelectedDate = appointmentsOnSelectedDate.map(
      (appointment) => appointment.time
    );

    return !appointmentTimesOnSelectedDate.includes(time);
  };

  const generateAvailableTimes = () => {
    let times = new Set();

    const selectedDayOfWeek = selectedDate.getDay(); // Obtener el día de la semana de la fecha seleccionada (0 para Domingo, 1 para Lunes, etc.)

    // Obtener el nombre del día de la semana seleccionado
    const selectedDay = weekdayNames[selectedDayOfWeek].toLowerCase();

    // Filtrar timeSlots para obtener solo el objeto que coincide con el día seleccionado
    const selectedDaySlot = timeSlots.find(
      (slot) => slot.day.toLowerCase() === selectedDay
    );

    if (selectedDaySlot) {
      let {
        morningStartingTime,
        morningEndingTime,
        afternoonStartingTime,
        afternoonEndingTime,
        shiftDuration,
      } = selectedDaySlot;

      const generateHourSlots = (start, end) => {
        let startTime = new Date(`1970-01-01T${start}`);
        let endTime = new Date(`1970-01-01T${end}`);
        let shiftDurationMs = shiftDuration * 60000;

        while (startTime < endTime) {
          let remainingTime = endTime - startTime;
          if (shiftDurationMs <= remainingTime) {
            times.add(startTime.toTimeString().slice(0, 5));
            startTime = new Date(startTime.getTime() + shiftDurationMs);
          } else {
            break;
          }
        }
      };

      generateHourSlots(morningStartingTime, morningEndingTime);
      generateHourSlots(afternoonStartingTime, afternoonEndingTime);
    }

    setAvailableTimes(Array.from(times));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/book-directly/${doctorId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: selectedDate,
            time: selectedTime,
            ticketPrice: ticketPrice,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message + " Intente de nuevo.");
      }

      if (data.success) {
        toast.success(data.message);
        refetch();
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
      refetch();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Hace que el desplazamiento sea suave
    });
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md max-w-sm mx-auto mt-[40px]">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Precio de consulta</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          $ {ticketPrice}
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Horarios Disponibles
        </p>
        <ul className="mt-3">
          {timeSlots?.map(
            (item, index) =>
              item &&
              item.day && (
                <li
                  key={index}
                  className="flex items-center justify-between mb-2"
                >
                  <p className="text-[15px] leading-6 text-textColor font-semibold">
                    {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                  </p>
                  <p className="text-[15px] leading-6 text-textColor font-semibold">
                    {convertTime(item.morningStartingTime)}hs -{" "}
                    {convertTime(item.morningEndingTime)}hs
                    <br />
                    {convertTime(item.afternoonStartingTime)}hs -{" "}
                    {convertTime(item.afternoonEndingTime)}hs
                  </p>
                </li>
              )
          )}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="mb-4">
          <label htmlFor="date" className="block font-bold mb-2">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Seleccione
            una fecha:
          </label>
          <BasicDateCalendar
            onChange={handleDateChange}
            value={selectedDate}
            timeSlots={timeSlots}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block font-bold mb-2">
            <FontAwesomeIcon icon={faClock} className="mr-2" /> Seleccione una
            hora:
          </label>
          <select
            id="time"
            value={selectedTime}
            onChange={(e) => handleTimeChange(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecciona una hora</option>
            {availableTimes.map((time) => {
              const [hour, minute] = time.split(":").map(Number);
              const isToday =
                selectedDate.toDateString() === new Date().toDateString();
              const isPastTime =
                hour < currentHour ||
                (hour === currentHour && minute <= currentMinute);
              const isDisabled =
                (isToday && isPastTime) || !isTimeAvailable(time);

              return (
                <option key={time} value={time} disabled={isDisabled}>
                  {time}
                </option>
              );
            })}
          </select>
        </div>
        <button
          type="submit"
          className="btn px-2 w-full rounded-md"
          onClick={scrollToTop}
        >
          Reservar Turno
        </button>
      </form>
    </div>
  );
};

export default SidePanel;
