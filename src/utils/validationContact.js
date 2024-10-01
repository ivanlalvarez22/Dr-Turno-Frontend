export const validate = (form, errorState) => {
  const error = { ...errorState };

  // Validación del email
  if (!form.email || form.email.trim() === "") {
    error.email = "Complete el campo";
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w+)+$/.test(form.email)) {
    error.email = "No es un correo válido";
  } else if (form.email.length >= 35) {
    error.email = "Excede el número de caracteres permitidos";
  } else {
    error.email = "";
  }

  // Validación del asunto
  if (!form.subject || form.subject.trim() === "") {
    error.subject = "Complete el campo";
  } else if (/^\d+$/.test(form.subject)) {
    error.subject = "El asunto no debe ser solo números";
  } else if (form.subject.length > 80) {
    error.subject = "El asunto no debe exceder los 80 caracteres";
  } else {
    error.subject = "";
  }

  // Validación del mensaje
  if (!form.message || form.message.trim() === "") {
    error.message = "Complete el campo";
  } else if (form.message.length > 150) {
    error.message = "El mensaje no debe exceder los 150 caracteres";
  } else {
    error.message = "";
  }

  return error;
};

export const validateFields = ({ email, subject, message }) => {
  if (
    !email ||
    email.trim() === "" ||
    !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w+)+$/.test(email) ||
    email.length >= 35
  )
    return false;
  if (
    !subject ||
    subject.trim() === "" ||
    /^\d+$/.test(subject) ||
    subject.length > 80
  )
    return false;
  if (!message || message.trim() === "" || message.length > 150) return false;
  return true;
};
