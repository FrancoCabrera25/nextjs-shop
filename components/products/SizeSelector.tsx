import { Box, Button } from "@mui/material";
import { FC } from "react";
import { ISizes as ISize, ISizes } from "../../interface";

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];

  onSelectedSize:(size: ISizes) => void
}

const SizeSelector: FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => {
  return (
    <Box sx={{ my: 2 }}>
      {sizes.map((size) => (
        <Button
          key={size}
          size="small"
          color={selectedSize === size ? "primary" : "info"}
          onClick={ () => onSelectedSize(size) }
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};

export default SizeSelector;
