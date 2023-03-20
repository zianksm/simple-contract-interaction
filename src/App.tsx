import { ClipboardEvent, useEffect, useState } from "react";
import "./App.css";
import { Box, TextField } from "@mui/material";
import DropdownButton from "./DropDown";
import { Parser } from "./parser/parser";
import { FunctionFragment } from "./parser/type";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [address, setAddress] = useState<string>();
  const [abi, setAbi] = useState<FunctionFragment[]>();
  const [showForm, setShowForm] = useState(false);
  const [textAbi,setTextAbi] = useState<string>();


  function handlePaste(event: ClipboardEvent<HTMLDivElement>): void {
    const text = event.clipboardData.getData("text");
    setTextAbi(text);
    handleFrags(text);
  }

  function hanldeChange(event: { target: { value: any } }): void {
    const text = event.target.value;
    setTextAbi(text)
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
      <DropdownButton textAbi={textAbi} fragments={abi} showForm={showForm} address={address}></DropdownButton>
    </Box>
  );
}

export default App;
