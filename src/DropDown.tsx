import { Button, Menu, MenuItem, TextField, Box } from "@mui/material";
import "@fontsource/roboto/500.css";
import { useEffect, useState } from "react";
import { FunctionFragment } from "./parser/type";

type Props = {
  fragments: FunctionFragment[] | undefined;
  showForm: boolean;
};

export default function DropdownButton(props: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [fragment, setFragment] = useState<FunctionFragment | undefined>();
  const [showInitialMenu, setInitialMenu] = useState(false);
  const [showConstant, setShowConstant] = useState(false);
  const [showNonConstant, setShowNonConstant] = useState(false);
  const [abi, setAbi] = useState<FunctionFragment[]>();
  const [buttonColor, setButtonColor] = useState<any>();

  useEffect(() => {
    const fragment = props?.fragments ? props.fragments[0] : undefined;
    const color = handleButtonColor(fragment);
    setButtonColor(color);
    setFragment(fragment);
  }, [props.showForm]);

  useEffect(() => {
    setAbi(props.fragments);
  }, [props.fragments]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setInitialMenu(true);
  };

  const handleMenuItemClick = (fragment: FunctionFragment) => {
    setAnchorEl(null);
    setFragment(fragment);
    const color = handleButtonColor(fragment);
    setButtonColor(color);
    setShowConstant(false);
    setShowNonConstant(false);
  };

  const handleConstantClick = () => {
    setInitialMenu(false);
    setShowConstant(true);
  };

  const handleNonConstantClick = () => {
    setInitialMenu(false);
    setShowNonConstant(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setInitialMenu(false);
    setShowConstant(false);
    setShowNonConstant(false);
  };

  const handleButtonColor = (fragment: FunctionFragment | undefined) => {
    switch (fragment?.stateMutability) {
      case "nonpayable":
        return "warning";
      case "payable":
        return "error";
      case "view":
        return "info";
      default:
        return "info";
    }
  };

  return (
    <Box id="method-container">
      {props.showForm && (
        <Box id="param-container">
          <h2>function : {fragment?.name}</h2>
          {fragment?.inputs?.map((input, index) => (
            <TextField label={`${input.name}(${input.type})`} />
          ))}
        </Box>
      )}
      <Box id="method-action-container">
        {props.showForm && (
          <>
            <Button variant="outlined" onClick={handleClick}>
              choose method
            </Button>
            <Button variant="contained" color={buttonColor}>
              {fragment?.stateMutability !== "view" ? "transact" : "call"}
            </Button>
          </>
        )}
      </Box>

      <Menu anchorEl={anchorEl} open={showInitialMenu} onClose={handleClose}>
        <MenuItem onClick={handleConstantClick}>constant</MenuItem>
        <MenuItem onClick={handleNonConstantClick}>non-constant</MenuItem>
      </Menu>

      <Menu anchorEl={anchorEl} open={showConstant} onClose={handleClose}>
        {abi?.map((fragment, index) => {
          if (fragment.stateMutability === "view")
            return (
              <MenuItem onClick={() => handleMenuItemClick(fragment)}>
                {fragment.name}
              </MenuItem>
            );
        })}
      </Menu>

      <Menu anchorEl={anchorEl} open={showNonConstant} onClose={handleClose}>
        {props.fragments?.map((fragment, index) => {
          if (fragment.stateMutability !== "view")
            return (
              <MenuItem onClick={() => handleMenuItemClick(fragment)}>
                {fragment.name}
              </MenuItem>
            );
        })}{" "}
      </Menu>
    </Box>
  );
}
