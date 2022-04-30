import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { FC } from "react";

interface Props {
  currentValue: number;
  maxValue: number;
  onSetCounter: (value: number) => void;
}

const ItemCounter: FC<Props> = ({ currentValue, maxValue, onSetCounter }) => {
 
  const sumCounter = () => {
    if (currentValue < maxValue) {
      onSetCounter(currentValue + 1);
    }
  };

  const minusCounter = () => {
    if (currentValue > 1) {
      onSetCounter(currentValue - 1);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={minusCounter}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center" }}>
        {currentValue}
      </Typography>
      <IconButton onClick={sumCounter}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};

export default ItemCounter;
