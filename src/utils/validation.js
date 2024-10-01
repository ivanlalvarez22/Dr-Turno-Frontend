export const validate = (form, errorState) => {
  const error = { ...errorState };

  if (!form.email) error.email = "Complete el campo";
  else if (form.email === "") error.email = "Complete el campo";
  else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(form.email))
    error.email = "Correo electrónico no válido";
  else if (form.email.length >= 35)
    error.email = "Supera la cantidad de caracteres permitidos";
  else error.email = "";

  if (!form.password) error.password = "Complete el campo";
  else if (form.password === "") error.password = "Complete el campo";
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{1,}$/;
  if (!passwordRegex.test(form.password))
    error.password =
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial. Por favor, actualice su contraseña.";
  else error.password = "";

  return error;
};

export const validateFields = ({ email, password }) => {
  if (!email || email === "") return false;
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(email)) return false;
  if (email.length >= 35) return false;
  if (!password || password === "") return false;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{1,}$/;
  if (!passwordRegex.test(password)) return false;

  return true;
};
