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
  const [name, setName] = useState("");
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
        className="center background main-container"
        component={motion.div}
      >
        <Grid xs={12} className="heading-container">
          <div className="heading">GetInfo</div>
        </Grid>
        <Grid xs={12} className="align-textfield">
          <label style={{ marginRight: "20px" }}>Name&nbsp;:</label>
          <TextField
            onChange={(e) => {
              setInputVal(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                GetGender();
                GetAge();
                GetNationality();
                setName(inputVal);
              }
            }}
            id="standard-basic"
            placeholder="Search name"
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    onClick={() => {
                      GetGender();
                      GetAge();
                      GetNationality();
                      setName(inputVal);
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid xs={12} className="table-container">
          <tabel>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Country</th>
            </tr>
            <tr>
              <td>{name}</td>
              <td>{age}</td>
              <td>{gender}</td>
              <td>
                {nationality.map((obj) => {
                  return (
                    <>
                      {obj.country_id}
                      <img
                        src={`https://flagcdn.com/16x12/${obj.country_id.toLowerCase()}.png`}
                        alt="flag"
                      />
                      ,&nbsp;
                    </>
                  );
                })}
              </td>
            </tr>
          </tabel>
        </Grid>
      </Grid>
    </>
  );
};

export default InputName;
