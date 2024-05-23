import React, { ChangeEvent } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, InputBase, Paper } from "@mui/material";

export const CityInput: React.FC<{
  cityQuery: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAdd: (text: string) => void;
}> = ({ cityQuery, onChange, onAdd }) => {
  return (
    <Box sx={{ paddingInline: "2px" }}>
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        component={"form"}
        onSubmit={(e) => e.preventDefault()}
      >
        <InputBase
          value={cityQuery}
          onChange={onChange}
          sx={{ padding: "10px" }}
          placeholder="Search for city"
          onKeyDown={(e) =>
            cityQuery !== "" && e.key === "Enter" && onAdd(cityQuery)
          }
        />
        <IconButton
          type="button"
          aria-label="plus-icon"
          onClick={() => onAdd(cityQuery)}
        >
          <AddIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};
