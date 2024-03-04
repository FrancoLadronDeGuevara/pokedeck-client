import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clientAxios from "../utils/clientAxios";
import { autoCloseAlert } from "../utils/alerts";
import Loader from "../components/loader/Loader";

const ActiveUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userFound, setUserFound] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    clientAxios
      .get(`/users/get-user-to-verify/${id}`)
      .then((res) => setUserFound(res.data))
  }, []);

  const handleVerification = async () => {
    setLoading(true);

    if(!userFound){
        setLoading(false)
        return autoCloseAlert('El usuario no existe', 'error', 'red')
    } 

    if (userFound.verified) {
      setLoading(false);
      return autoCloseAlert(
        "Tu cuenta ya se encuentra activa",
        "warning",
        "orange"
      );
    }

    try {
      await clientAxios
        .patch(`/users/verify-user/${id}`, { active: true })
        .then(() => {
          autoCloseAlert("Cuenta verificada con éxito!", "success", "green");
          setTimeout(()=>{
              navigate("/login")
          }, 2000)
        });
    } catch (error) {
      autoCloseAlert(error.message, "error", "red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Container sx={{paddingTop: 5 , display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Typography textAlign='center' className="text">
          ¡Hola {userFound?.email}, bienvenido a Pokedeck!
          <br/>
          <br/>
           Sumérgete en el
          emocionante mundo de Pokémon y disfruta de minijuegos, competiciones y
          más. Gana Pokémonedas para desbloquear cofres con cartas especiales.
          <br/>
          <br/>
          ¡Únete ahora y comienza tu aventura Pokémon!
        </Typography>
        <button className="support-button" onClick={handleVerification}>Verificar cuenta</button>
      </Container>
    </>
  );
};

export default ActiveUserPage;
