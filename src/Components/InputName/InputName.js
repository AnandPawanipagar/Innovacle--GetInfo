import React from "react";
import "./InputName.css";
import { motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Grid } from "@mui/material";
const InputName = () => {
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
            id="outlined-basic"
            label="Name"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default InputName;
