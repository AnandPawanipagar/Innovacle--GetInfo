import React, { useState } from "react";
import "./InputName.css";
import { motion } from "framer-motion";
import axios from "axios";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Grid } from "@mui/material";
const InputName = () => {
  const [inputVal, setInputVal] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState([]);
  const GetGender = () => {
    axios.get(`https://api.genderize.io?name=${inputVal}`).then((r) => {
      console.log(r.data);
      setGender(r.data.gender);
    });
  };
  const GetAge = () => {
    axios.get(`https://api.agify.io?name=${inputVal}`).then((r) => {
      console.log(r.data);
      setAge(r.data.age);
    });
  };
  const GetNationality = () => {
    axios.get(`https://api.nationalize.io?name=${inputVal}`).then((r) => {
      console.log(r.data);
      setNationality(r.data.country);
    });
  };
  return (
    <>
      <Grid
        component={motion.div}
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 210,
          damping: 20,
        }}
        container
        mt={5}
        className="center background"
        component={motion.div}
      >
        <Grid xs={12}>
          <TextField
            onChange={(e) => {
              setInputVal(e.target.value);
            }}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    onClick={() => {
                      GetGender();
                      GetAge();
                      GetNationality();
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      {`name: ${inputVal} age:${age} nationality:${nationality
        .map((obj) => {
          return obj.country_id;
        })
        .join(",")}`}
    </>
  );
};

export default InputName;
