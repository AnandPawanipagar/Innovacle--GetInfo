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
  const [all, setAll] = useState({});
  const [allArr, setAllArr] = useState([]);
  const [allResponseCame,setAllResponseCame]=[false,false,false];
  const myClear=()=>{
    setInputVal("");
    setName("");
    setGender("");
    setAge("");
    setNationality([]);
    setAll({});
  }
  const GetGender = () => {
    axios.get(`https://api.genderize.io?name=${inputVal}`).then((r) => {
      // console.log(r.data);
      setGender(r.data.gender);
      all.gender = r.data.gender;
      setAll({ ...all });
      allResponseCame[0]=true;
      setAllResponseCame([...allResponseCame]);
      // if(name.length!==0 && age.length!==0 && gender.length!==0 && nationality.length>0){
      //   console.log("getGender")
      //   allArr.push({...all})
      //   setAllArr([...allArr]);
      //   // myClear();
      // }
    });
  };
  const GetAge = () => {
    axios.get(`https://api.agify.io?name=${inputVal}`).then((r) => {
      // console.log(r.data);
      setAge(r.data.age);
      all.age = r.data.age;
      setAll({ ...all });
      allResponseCame[1]=true;
      setAllResponseCame([...allResponseCame]);
      // if(name.length!==0 && age.length!==0 && gender.length!==0 && nationality.length>0){
      //   console.log("getAge")
      //   allArr.push({...all});
      //   setAllArr([...allArr]);
      //   // myClear();
      // }
    });
  };
  const GetNationality = () => {
    axios.get(`https://api.nationalize.io?name=${inputVal}`).then((r) => {
      // console.log(r.data);
      setNationality(r.data.country);
      all.country = r.data.county;
      setAll({ ...all });
      allResponseCame[1]=true;
      setAllResponseCame([...allResponseCame]);
      // if(name.length!==0 && age.length!==0 && gender.length!==0 && nationality.length>0){
      //   console.log("getNationality")
      //   allArr.push({...all});
      //   setAllArr([...allArr]);
      //   // myClear();
      // }
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
                      setName(inputVal);
                      all.name = inputVal;
                      setAll({ ...all });
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
        {console.log(allArr)}
        <Grid xs={12} className="xxxx">
          <div>Name: {name}</div>
          <div>Age:{age}</div>
          <div>Gender:{gender}</div>
          <div>
            Country :<br></br>
            <table style={{ textAlign: "center" }}>
              <tr>
                <td>Code</td>
                <td>Flag</td>
              </tr>
              {nationality.map((obj, i) => {
                return (
                  <>
                    <tr>
                      <td>{obj.country_id}</td>
                      <td>
                        {obj.country_id ? (
                          <>
                            <img
                              src={`https://flagcdn.com/16x12/${obj.country_id.toLowerCase()}.png`}
                              alt="flag"
                            />
                          </>
                        ) : null}
                      </td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default InputName;
