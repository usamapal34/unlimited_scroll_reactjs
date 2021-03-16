import React from "react";
import Container from "@material-ui/core/Container";
import { HomePage } from "./pages";

function App() {
  return (
    <React.Fragment>
      <Container maxWidth="md" style={{ height: "100vh", padding: "20px" }}>
        <HomePage />
      </Container>
    </React.Fragment>
  );
}

export default App;
