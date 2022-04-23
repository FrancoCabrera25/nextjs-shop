import { Box, Button } from "@mui/material";
import { FC } from "react";
import { ISizes as ISize } from "../../interface";

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
}

const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
  return (
    <Box sx={{ my: 2 }}>
      {sizes.map((size) => (
        <Button
          key={size}
          size="small"
          color={selectedSize === size ? "primary" : "info"}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};

export default SizeSelector;
