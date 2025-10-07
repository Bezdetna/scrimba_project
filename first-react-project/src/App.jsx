import React from "react"

import Container from '@mui/material/Container';
import Table from "./components/Table/Table";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import TableColorPicker from "./components/Context/TableColorPicker";


function App() {
  return (
    <Container className="App" maxWidth="sm">
      <TableColorPicker.Provider value={{ color: '#eb5200' }}>
        <ColorPicker />
        <Table color="black" listName="todos" />
      </TableColorPicker.Provider>
    </Container>

  );
}
export default App;