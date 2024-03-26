import "./ModalCookies.css";

import { Container, Typography } from "@mui/material";

const ModalCookies = ({onClose}) => {
    
  return (
    <Container disableGutters maxWidth="md" className="container-cookies">
      <Typography className="text-custom-modal">
        Pokedeck utiliza cookies propias y de terceros que permiten mejorar la
        usabilidad de navegación y facilitar el proceso de inicio de sesión. No
        se utilizarán las cookies para recoger información de carácter personal.
      </Typography>
      <Typography className="text-custom-modal text-login">
        <b>
          Si presenta problemas para iniciar sesión, habilite las cookies de
          terceros
        </b>
      </Typography>
      <button onClick={onClose} className="modal-open-chest-button">Aceptar</button>
    </Container>
  );
};

export default ModalCookies;
