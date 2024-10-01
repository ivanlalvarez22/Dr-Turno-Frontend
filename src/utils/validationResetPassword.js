export const validate = (form, errorState) => {
  const error = { ...errorState };

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
  return error;
};

export const validateFields = ({ password, confirmPassword }) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{1,}$/;
  if (!password || password.trim() === "" || !passwordRegex.test(password))
    return false;
  if (password !== confirmPassword) return false;
  return true;
};
