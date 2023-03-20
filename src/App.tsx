import { ClipboardEvent, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, Box, TextField, Menu, MenuItem } from "@mui/material";
import DropdownButton from "./DropDown";
import { Parser } from "./parser/parser";
import { FunctionFragment } from "./parser/type";

function App() {
  const [address, setAddress] = useState<string>();
  const [abi, setAbi] = useState<FunctionFragment[]>();
  const [showForm, setShowForm] = useState(false);

  function handlePaste(event: ClipboardEvent<HTMLDivElement>): void {
    const text = event.clipboardData.getData("text");
    handleFrags(text);
  }

  function hanldeChange(event: { target: { value: any } }): void {
    const text = event.target.value;
    handleFrags(text);
  }

  function handleFrags(text: string) {
    const frags = Parser.parse(text);
    setAbi(frags);
    setShowForm(true);
  }

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
          onPaste={(event) => handlePaste(event)}
          onChange={hanldeChange}
        ></TextField>
      </Box>
      <DropdownButton fragments={abi} showForm={showForm}></DropdownButton>
    </Box>
  );
}

export default App;
