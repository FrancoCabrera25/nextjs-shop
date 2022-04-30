import { SearchOutlined } from "@mui/icons-material"
import { IconButton, Input, InputAdornment } from "@mui/material"
import { FC, useState } from "react";

interface Props {
    value: string
}

const SearchInput: FC<Props> = ({ value }) => {

    const [searchTerm, setSearchTerm] = useState(value);
    
    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;

      };
  return (
          <Input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress = { (e) => e.key === 'Enter' ? onSearchTerm() : null  }
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearchTerm} aria-label="toggle password visibility">
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
  )
}

export default SearchInput