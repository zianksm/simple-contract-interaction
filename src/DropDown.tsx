import { Button, Menu, MenuItem, TextField, Box } from "@mui/material";
import "@fontsource/roboto/500.css";
import { ChangeEvent, useEffect, useState } from "react";
import { FunctionFragment } from "./parser/type";
import { ethers } from "ethers";

type Props = {
  fragments: FunctionFragment[] | undefined;
  showForm: boolean;
  address: string | undefined;
  textAbi?: string;
};

type Param = {
  name: string;
  args: any;
};

export default function DropdownButton(props: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [fragment, setFragment] = useState<FunctionFragment | undefined>();
  const [showInitialMenu, setInitialMenu] = useState(false);
  const [showConstant, setShowConstant] = useState(false);
  const [showNonConstant, setShowNonConstant] = useState(false);
  const [abi, setAbi] = useState<FunctionFragment[]>();
  const [buttonColor, setButtonColor] = useState<any>();
  const [param, setParam] = useState<Map<string, any>>(new Map<string, any>());

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

  async function handleTx() {
    const fnArgs = encodeParams(fragment as FunctionFragment);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const baseContract = new ethers.Contract(
      props.address as string,
      props.textAbi as string
    );
    const contract: any = baseContract.connect(signer);

    const method = fragment?.name ?? "fallback";
    const tx = await contract[method](...fnArgs);

    if (fragment?.stateMutability !== "view") {
      await tx.wait();
    }

    alert(tx);
  }

  function encodeParams(fragment: FunctionFragment) {
    const params: Map<string, any> = structuredClone(param);

    const arr = [];

    for (const ioFrag of fragment?.inputs ? fragment.inputs : []) {
      const arg = params.get(ioFrag.name);
      arr.push(arg);
    }

    return arr;
  }

  function handleParam(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    argsName: string
  ): void {
    const arg: Param = {
      name: argsName,
      args: event.target.value,
    };

    const params: Map<string, any> = structuredClone(param);
    params.set(argsName, event.target.value);
    setParam(params);
  }

  return (
    <Box id="method-container">
      {props.showForm && (
        <Box id="param-container">
          <h2>function : {fragment?.name}</h2>
          {fragment?.inputs?.map((input, index) => (
            <TextField
              onChange={(e) => handleParam(e, input.name)}
              label={`${input.name}(${input.type})`}
            />
          ))}
        </Box>
      )}
      <Box id="method-action-container">
        {props.showForm && (
          <>
            <Button variant="outlined" onClick={handleClick}>
              choose method
            </Button>
            <Button variant="contained" color={buttonColor} onClick={handleTx}>
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
