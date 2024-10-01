export const validate = (form, errorState) => {
  const error = { ...errorState };

  if (!form.name || form.name.trim() === "") {
    error.name = "Complete el campo";
  } else if (!isNaN(form.name)) {
    error.name = "No debe ser un número";
  } else {
    error.name = "";
  }

  if (!form.email || form.email.trim() === "") {
    error.email = "Complete el campo";
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w+)+$/.test(form.email)) {
    error.email = "No es un correo válido";
  } else if (form.email.length >= 35) {
    error.email = "Excede el número de caracteres permitidos";
  } else {
    error.email = "";
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{1,}$/;
  if (!form.password || form.password.trim() === "") {
    error.password = "Complete el campo";
  } else if (!passwordRegex.test(form.password)) {
    error.password =
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.";
  } else {
    error.password = "";
  }

  if (!form.confirmPassword || form.confirmPassword.trim() === "") {
    error.confirmPassword = "Complete el campo";
  } else if (form.confirmPassword !== form.password) {
    error.confirmPassword = "Las contraseñas no coinciden";
  } else {
    error.confirmPassword = "";
  }

  if (!form.dni || form.dni.trim() === "") {
    error.dni = "Complete el campo";
  } else if (isNaN(form.dni)) {
    error.dni = "Debe ser un número";
  } else {
    error.dni = "";
  }

  if (!form.phone || form.phone.trim() === "") {
    error.phone = "Complete el campo";
  } else if (isNaN(form.phone)) {
    error.phone = "Debe ser un número";
  } else {
    error.phone = "";
  }

  return error;
};

export const validateFields = ({
  name,
  confirmPassword,
  email,
  password,
  phone,
  dni,
}) => {
  if (!name || name.trim() === "" || !isNaN(name)) return false;
  if (
    !email ||
    email.trim() === "" ||
    !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w+)+$/.test(email) ||
    email.length >= 35
  )
    return false;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{1,}$/;
  if (!password || password.trim() === "" || !passwordRegex.test(password))
    return false;
  if (password !== confirmPassword) return false;
  if (!dni || dni.trim() === "" || isNaN(dni)) return false;
  if (!phone || phone.trim() === "" || isNaN(phone)) return false;
  return true;
};
