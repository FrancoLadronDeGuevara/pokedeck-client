import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Container } from "@mui/material";

const RootLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container maxWidth={false} disableGutters sx={{ minHeight: "calc(100vh - 85px - 65px)" }}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default RootLayout;
