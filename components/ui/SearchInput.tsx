import { ClearOutlined, SearchOutlined } from "@mui/icons-material";
import { IconButton, Input, InputAdornment } from "@mui/material";
import { FC, useState } from "react";

interface Props {
  searchText: string;

  showIconSearch?: boolean;
  showInconClearInput?: boolean;
  onSearch: () => void;
  setValue: (value: string) => void;

  onClearInput?: () => void | undefined ;
}

const SearchInput: FC<Props> = ({
  searchText,
  setValue,
  onSearch,
  showIconSearch,
  showInconClearInput,
  onClearInput,
}) => {
  const onSearchTerm = () => {
    onSearch();
  };

  const setSearchTerm = (value: string) => {
    if (value.trim().length === 0) return;

    setValue(value);
  };

  return (
    <Input
      autoFocus
      value={searchText}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
      type="text"
      placeholder="Buscar..."
      endAdornment={
        <InputAdornment position="end">
          {showIconSearch && (
            <IconButton
              onClick={onSearchTerm}
              aria-label="toggle password visibility"
            >
              <SearchOutlined />
            </IconButton>
          )}

          {showInconClearInput && (
            <IconButton onClick={() => onClearInput ? onClearInput() : undefined }>
              <ClearOutlined />
            </IconButton>
          )}
        </InputAdornment>
      }
    />
  );
};

export default SearchInput;
