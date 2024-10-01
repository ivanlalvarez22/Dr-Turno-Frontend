import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com"; // Importa emailjs-com
import { validate } from "../utils/validationContact.js";

const Contacto = () => {
  // Inicializar emailjs-com con tu clave pública (public key)
  useEffect(() => {
    emailjs.init("LyaqWLG2U2nKYliA3");
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [property]: value });
    setError(validate({ ...formData, [property]: value }, error));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe por defecto

    // Validar los campos antes de enviar
    const currentErrors = validate(formData, error);
    setError(currentErrors);
    const isValid = Object.values(currentErrors).every((err) => err === "");
    if (!isValid) {
      alert("Por favor, corrija los errores en el formulario.");
      return;
    }

    // Enviar el formulario usando EmailJS
    emailjs
      .send(
        "service_hft891p", // Reemplazar con tu Service ID de EmailJS
        "template_35n3god", // Reemplazar con tu Template ID de EmailJS
        formData
      )
      .then((response) => {
        console.log(
          "Correo enviado correctamente!",
          response.status,
          response.text
        );
        // Mostrar mensaje de éxito al usuario si lo deseas
        alert("¡Correo enviado correctamente!");
      })
      .catch((error) => {
        console.error("Error al enviar el correo:", error);
        // Mostrar mensaje de error al usuario
        alert(
          "Hubo un error al enviar el correo. Por favor, inténtelo nuevamente más tarde."
        );
      });

    // Limpiar los campos del formulario después de enviar
    setFormData({
      email: "",
      subject: "",
      message: "",
    });

    setError({
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center">Contáctenos</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text__para">
          ¿Tiene un problema técnico? ¿Quiere enviar comentarios sobre una
          función beta? Háganoslo saber.
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="email" className="form__label">
              Su Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ejemplo@gmail.com"
              className="form__input mt-1"
              value={formData.email}
              onChange={handleInputChange}
              autoFocus
              required
            />
            <span className="text-red-500">{error.email}</span>
          </div>
          <div>
            <label htmlFor="subject" className="form__label">
              Asunto
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Déjenos saber cómo podemos ayudarle"
              className="form__input mt-1"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
            <span className="text-red-500">{error.subject}</span>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="form__label">
              Mensaje
            </label>
            <textarea
              rows="6"
              id="message"
              name="message"
              placeholder="Deje un comentario..."
              className="form__input mt-1"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
            <span className="text-red-500">{error.message}</span>
          </div>
          <button type="submit" className="btn rounded sm:w-fit">
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contacto;
