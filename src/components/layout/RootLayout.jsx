import { Container } from "@mui/material";
import { useSelector } from "react-redux";

import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Loader from "../loader/Loader";

const RootLayout = ({ children }) => {
  const { loading } = useSelector((state) => state.user);

  return (
    <>
      <Navbar />
      {loading && <Loader />}
      <Container
        maxWidth={false}
        disableGutters
        sx={{ minHeight: "calc(100dvh - 85px - 65px)" }}
      >
        {children}
      </Container>

      <Footer />
    </>
  );
};

export default RootLayout;
