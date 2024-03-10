import "./GlobalModal.css";

import { Container, Backdrop, Modal, Fade } from "@mui/material";

const GlobalModal = ({ children, onClose }) => {
  return (
    <Modal
      sx={{ zIndex: "99999", mx: 1 }}
      open={true}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={true}>
        <Container maxWidth="sm" className="modal-container">
          {children}
        </Container>
      </Fade>
    </Modal>
  );
};

export default GlobalModal;
