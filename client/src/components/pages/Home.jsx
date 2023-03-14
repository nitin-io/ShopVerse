import NavBar from "./../layout/NavBar";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

function Home() {
  return (
    <>
      <NavBar />
      <Grid container>
        <Grid xs={12} placeContent="center">
          <h1>Home Component</h1>
          <Link to="/login">Login</Link>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
