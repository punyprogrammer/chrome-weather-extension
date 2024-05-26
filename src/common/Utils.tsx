import React, { ChangeEvent } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, InputBase, Paper, Tooltip } from "@mui/material";
import { OpenWeatherScale } from "../utils/apiCalls";
import PictureInPicture from "@mui/icons-material/PictureInPicture";

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

export const TempScale: React.FC<{
  tempScale: OpenWeatherScale;
  onMetricChange: () => void;
}> = ({ tempScale, onMetricChange }) => {
  const tooltipTitle =
    tempScale === "metric" ? "Change to Fahrenheit" : "Change to Celsius";
  return (
    <Tooltip title={tooltipTitle}>
      <Box>
        <Paper>
          <IconButton onClick={onMetricChange}>
            {tempScale === "metric" ? "\u2103" : "\u2109"}
          </IconButton>
        </Paper>
      </Box>
    </Tooltip>
  );
};
export const OverlayOption: React.FC<{
  handleOverlay: () => void;
  disabled: boolean;
}> = ({ handleOverlay, disabled }) => {
  const titleForTooltip = disabled
    ? "Set a Default city to enable overlay"
    : "Enable Overlay";
  return (
    <Tooltip title={titleForTooltip}>
      <Box onClick={handleOverlay}>
        <Paper>
          <IconButton disabled={disabled}>
            <PictureInPicture />
          </IconButton>
        </Paper>
      </Box>
    </Tooltip>
  );
};
