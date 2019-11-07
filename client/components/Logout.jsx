import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    // setAnchorEl(null);
    <Redirect to={{ pathname: '/' }} />
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Logout
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={e => handleClose(e)}>Logout</MenuItem>
      </Menu>
    </div>
  );
}