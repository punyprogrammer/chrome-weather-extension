import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./options.css";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import {
  LocalStorageOptions,
  getStoredOptions,
  setStoredOptions,
} from "../utils/storage";
type FormState = "loading" | "error" | "ready";
const App: React.FC<{}> = () => {
  const [homecity, setHomeCity] = useState<string>("");
  const [options, setOptions] = useState<LocalStorageOptions>(null);
  const [formState, setFormState] = useState<FormState>("ready");

  useEffect(() => {
    getStoredOptions().then((res) => {
      setOptions(res);
      setHomeCity(res?.homeCity);
    });
  }, []);
  const onSaveHomeCity = () => {
    setFormState("loading");
    const newOptions = { ...options, homeCity: homecity };
    setStoredOptions(newOptions).then(() => {
      setOptions(newOptions);
      setFormState("ready");
    });
  };
  return (
    <Grid container spacing={2} alignItems={"center"} padding={"100px"}>
      <Grid item xs={12}>
        <Typography variant="h1" sx={{ fontSize: "28px" }}>
          Weather Extension Options
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2" sx={{ fontSize: "24px", display: "flex" }}>
          Enter your homecity name
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          defaultValue="Normal"
          variant="filled"
          sx={{ width: "200px" }}
          value={homecity}
          onChange={(e) => {
            setHomeCity(e.target.value);
          }}
          disabled={formState === "loading"}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          disabled={formState === "loading"}
          onClick={onSaveHomeCity}
          variant="contained"
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};
const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
