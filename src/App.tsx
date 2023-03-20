import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, Box, TextField, Menu, MenuItem } from "@mui/material";
import DropdownButton from "./DropDown";

function App() {
  const [address, setAddress] = useState<string>();
  const [Abi, setAbi] = useState<string>();

  return (
    <Box id="main-container">
      <Box id="input-container">
        <TextField
          variant="outlined"
          size="small"
          placeholder="address"
          onChange={(event) => setAddress(event.target.value)}
        ></TextField>
        <TextField
          variant="outlined"
          size="small"
          placeholder="ABI"
          multiline
          rows={30}
        ></TextField>
      </Box>
      <DropdownButton></DropdownButton>
    </Box>
  );
}

export default App;
