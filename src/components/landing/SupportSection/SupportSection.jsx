import { Box, Container, TextField, Typography } from "@mui/material";
import "./SupportSection.css";
import { useState } from "react";
import axios from "axios";
import { autoCloseAlert } from "../../../utils/alerts";
import { useSelector } from "react-redux";
import Loader from "../../loader/Loader";

const subjectRegex = /^[a-zA-Z0-9 ]{4,60}$/;
const messageRegex = /^[a-zA-Z0-9 ]{10,255}$/;

const SupportSection = () => {
  const { user } = useSelector((state) => state.user);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!message || !subject) {
      setLoading(false);
      return autoCloseAlert(
        "Completa el formulario correctamente",
        "error",
        "red"
      );
    }

    if (!subjectRegex.test(subject)) {
      setLoading(false);
      return autoCloseAlert(
        "El asunto debe tener de 4 a 60 caracteres",
        "error",
        "red"
      );
    }
    if (!messageRegex.test(message)) {
      setLoading(false);
      return autoCloseAlert(
        "El mensaje debe tener de 10 a 255 caracteres",
        "error",
        "red"
      );
    }

    if (user) {
      await axios.post("https://formsubmit.co/ajax/francoguevara93@gmail.com", {
        subject,
        message,
        email: user.email,
      });

      autoCloseAlert("Gracias por tu mensaje", "success", "green");
      setMessage("");
      setSubject("");
      setLoading(false);
    } else {
      setLoading(false);
      autoCloseAlert(
        "Debes iniciar sesión para enviar el formulario",
        "error",
        "red"
      );
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Container maxWidth="md" disableGutters className="container-support">
        <Typography variant="h3" textAlign="center" className="title-support">
          Soporte
        </Typography>
        <Box component="form" className="support" onSubmit={handleSubmit}>
          <Typography
            variant="h6"
            textAlign="center"
            className="subtitle-support"
          >
            ¿Quieres reportar una <span style={{ color: "orange" }}>falla</span>{" "}
            o simplemente <span style={{ color: "lightgreen" }}>contactar</span>{" "}
            con el creador de esta web?
          </Typography>
          <TextField
            fullWidth
            variant="filled"
            id="subject"
            label="Asunto"
            name="subject"
            autoComplete="subject"
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
          />
          <textarea
            name="message"
            placeholder="Escribe tu mensaje..."
            className="textarea-support"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" disabled={loading} className="support-button">
            Enviar
          </button>
        </Box>
      </Container>
    </>
  );
};

export default SupportSection;
