export const formateDate = (date, config) => {
  const defaultOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
  const options = config ? config : defaultOptions;

  return new Date(date).toLocaleDateString("es-AR", options);
};
