import "./DashboardAdmin.css";

import { useState } from "react";
import { Container, useMediaQuery, Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";

import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone";
import AllInboxTwoToneIcon from "@mui/icons-material/AllInboxTwoTone";
import PeopleIcon from "@mui/icons-material/People";

const DashboardAdmin = () => {
  const [value, setValue] = useState(0);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container className="container-tabs" maxWidth="lg">
      <Tabs
        value={value}
        onChange={handleChange}
        variant={isSmallScreen ? "scrollable" : "fullWidth"}
        scrollButtons={isSmallScreen ? "auto" : false}
        allowScrollButtonsMobile
      >
        <Tab
          icon={<PeopleIcon />}
          label="Usuarios"
          component={Link}
          to="allUsers"
          
        />

        <Tab
          icon={<AllInboxTwoToneIcon />}
          label="Cofres"
          component={Link}
          to="allChests"
        />

        <Tab
          icon={<CatchingPokemonTwoToneIcon />}
          label="Cartas"
          component={Link}
          to="allCards"
        />

        <Tab
          icon={<CatchingPokemonTwoToneIcon />}
          label="Crear Carta"
          component={Link}
          to="cards"
        />

        <Tab
          icon={<AllInboxTwoToneIcon />}
          label="Crear Cofre"
          component={Link}
          to="chests"
        />
      </Tabs>
    </Container>
  );
};

export default DashboardAdmin;
