import "./SupportSection.css";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Container, TextField, Typography } from "@mui/material";

import { autoCloseAlert } from "../../../utils/alerts";
import Loader from "../../loader/Loader";
import clientAxios from "../../../utils/clientAxios";

const subjectRegex = /^(?=.*\S)[\s\S]{4,60}$/;
const messageRegex = /^(?=.*\S)[\s\S]{4,255}$/;

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
      return autoCloseAlert("¡Completa el formulario correctamente!", "error");
    }

    if (!subjectRegex.test(subject)) {
      setLoading(false);
      return autoCloseAlert(
        "¡El asunto debe tener de 4 a 60 caracteres!",
        "error"
      );
    }
    if (!messageRegex.test(message)) {
      setLoading(false);
      return autoCloseAlert(
        "¡El mensaje debe tener de 4 a 255 caracteres!",
        "error"
      );
    }

    if (user) {
      await clientAxios
        .post(`/users/send-support-email`, {
          subject,
          message,
          email: user.email,
        })
        .then((res) => {
          setLoading(false);
          autoCloseAlert(res.data.message, "success");
          setMessage("");
          setSubject("");
        })
        .catch((error) => {
          setLoading(false);
          autoCloseAlert(error, "error");
        });
    } else {
      setLoading(false);
      autoCloseAlert(
        "¡Debes iniciar sesión para enviar el formulario!",
        "error"
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
