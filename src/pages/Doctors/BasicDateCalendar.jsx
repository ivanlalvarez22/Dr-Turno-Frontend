import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import esLocale from "dayjs/locale/es";

dayjs.locale(esLocale); // Establecer el idioma de Day.js en español

export default function BasicDateCalendar({ onChange, value, timeSlots }) {
  // Convertir el valor a Dayjs si aún no lo es
  const dayjsValue = value instanceof dayjs ? value : dayjs(value);

  const shouldDisableDate = (date) => {
    const weekdayNames = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];
    const dayOfWeek = weekdayNames[date.day()].toLowerCase(); // Obtener el nombre del día de la semana de la fecha y convertirlo a minúsculas

    // Verificar si el día de la semana no está en timeSlots
    const dayNotInTimeSlots = !timeSlots.some(
      (slot) => slot.day.toLowerCase() === dayOfWeek
    );

    return dayNotInTimeSlots || date.isBefore(dayjs(), "day");
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="es" // Establecer el idioma de la configuración regional en español
    >
      <div className="bg-indigo-50 rounded-lg overflow-x-auto mx-auto max-w-[320px]">
        <DateCalendar
          value={dayjsValue}
          onChange={(newValue) => onChange(newValue)}
          shouldDisableDate={shouldDisableDate}
        />
      </div>
    </LocalizationProvider>
  );
}
