import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import Button from '@material-ui/core/Button';

import CharityList from './CharityList';
// import './sass/styles.scss';

import axios from 'axios';

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  // button: {
  //   margin: theme.spacing(1),
  //   "margin-top": "6px"
  // },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function Filters(props) {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [zip, setZip] = React.useState(props.defaultZip);
  const [cause, setCause] = React.useState(props.defaultCauseID);
  const [rating, setRating] = React.useState(props.defaultMinRating);
  const [rows, setRows] = React.useState(props.rows)

  useEffect(() => {
    setRows(rows)
  }, [rows])
  useEffect(() => {
    setZip(zip)
  }, [zip])
  useEffect(() => {
    setCause(cause)
  }, [cause])
  useEffect(() => {
    setRating(rating)
  }, [rating])

  const handleChangeName = event => {
    setName(event.target.value);
  };
  const handleChangeZip = event => {
    setZip(event.target.value);
  };
  const handleChangeCause = event => {
    setCause(event.target.value);
  };
  const handleChangeRating = event => {
    setRating(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const body = {
      causeID: 1,
      rating: 4
    };
    
    // if (typeof zip === 'number') body.zip = zip;
    // // body.causeID = 1;
    // if (rating >= 1 || rating.length >= 1) body.minRating = rating;
    console.log(body) 

    axios({
      method: 'POST',
      url: '/api/charity',
      body: body
    })
      .then(res => {
        setRows(res.data);
        console.log(res.data);
        console.log('rows', rows)
      })
  }

  const handleSaved = event => {

  }

  return (
    <div className="filters">
      <div className="paramSearch">
        <FormControl className={classes.margin} onChange={handleChangeZip}>
          <InputLabel htmlFor="demo-customized-textbox">Zipcode</InputLabel>
          <BootstrapInput id="demo-customized-textbox" />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel id="demo-customized-select-label">Cause</InputLabel>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={cause}
            onChange={handleChangeCause}
            input={<BootstrapInput />}
          >
            {/* <MenuItem value="Cause">
            <em>Cause</em>
          </MenuItem> */}
            <MenuItem value={0}>Cause</MenuItem>
            <MenuItem value={1}>Animals</MenuItem>
            <MenuItem value={4}>Performing Arts</MenuItem>
            <MenuItem value={10}>Nature Centers</MenuItem>
            <MenuItem value={13}>Diseases</MenuItem>
            <MenuItem value={15}>Human Service</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-select-native">Rating</InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            value={rating}
            onChange={handleChangeRating}
            input={<BootstrapInput />}
          >
            <option value={4}>> 90</option>
            <option value={3}>> 80</option>
          </NativeSelect>
        </FormControl>
        <p id="banana">
        <Button variant="outlined" color="primary" style={{"marignTop": "10px"}} onClick={e => handleSubmit(e)}>
          Submit
        </Button>
        </p>

      </div>
      <div className="paramSearch">
        <FormControl className={classes.margin} onChange={handleChangeZip}>
        <InputLabel htmlFor="demo-customized-textbox">Search by Name</InputLabel>
        <BootstrapInput id="demo-customized-textbox" />
      </FormControl>
      <p id="banana">
        <Button variant="outlined" color="primary" onClick={e => handleSubmit(e)}>
          Search
        </Button>

        <Button variant="outlined" color="primary" onClick={e => handleSaved(e)}>
          Saved
        </Button>
        </p>
      </div>
      <CharityList rows={rows} zip={zip} cause={cause} rating={rating}/>
    </div>
  );
}
