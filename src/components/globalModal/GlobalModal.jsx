import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const GlobalModal = ({children, onClose}) => {
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
        {children}
      </Fade>
    </Modal>
  );
};

export default GlobalModal;
