import { Button, Menu, MenuItem, TextField, Box } from "@mui/material";
import "@fontsource/roboto/500.css";
import { useState } from "react";

export default function DropdownButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showForm, setShowForm] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = () => {
    setAnchorEl(null);
    setShowForm(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box id="method-container">
      {showForm && (
          <Box id="param-container">
            <h2>method name</h2>
          <TextField label="args" />
          <TextField label="args" />
          <TextField label="args" />
        </Box>
      )}
      <Box id="method-action-container">
        <Button variant="outlined" onClick={handleClick}>
          method
        </Button>
        {showForm && (
          <Button variant="contained" color="warning">
            transact
          </Button>
        )}
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleMenuItemClick}>Display Form</MenuItem>
      </Menu>
    </Box>
  );
}
