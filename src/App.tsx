import { Outlet } from "react-router-dom";
import Header from "./components/Layout/Header";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

import "./App.css";
import "./styles/full_calendar.css";

const BaseLayout = styled(Grid)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
});

const MainBody = styled(Grid)({
  flexGrow: "1 !important",
  flex: 1,
});

function App() {
  return (
    <BaseLayout container spacing={2}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <MainBody item marginX={12} mt={3} xs={12} display="flex">
        <Outlet />
      </MainBody>
      {/* <Footer /> */}
    </BaseLayout>
  );
}

export default App;
