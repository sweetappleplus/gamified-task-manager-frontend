import React, { useCallback } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  Typography,
  Checkbox,
} from "@mui/material";
import { User } from "types";
import { UserSelectFieldProps } from "./UserSelectField.types";

const getOptionLabel = (option: User) =>
  option.name ? `${option.name} (${option.email})` : option.email;

const ellipsisStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
} as const;

export const UserSelectField = (props: UserSelectFieldProps) => {
  const {
    label,
    placeholder,
    disabled,
    size = "small",
    width,
    multiple,
    users,
    isLoading,
    hasMore,
    onLoadMore,
    onSearch,
  } = props;

  const handleScroll = useCallback(
    (event: React.SyntheticEvent) => {
      const listbox = event.currentTarget;
      const isNearBottom =
        listbox.scrollTop + listbox.clientHeight >= listbox.scrollHeight - 40;
      if (isNearBottom && hasMore && !isLoading) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore]
  );

  if (multiple && props.multiple) {
    return (
      <Autocomplete
        multiple
        disableCloseOnSelect
        options={users}
        value={props.value}
        onChange={(_, newValue) => props.onChange(newValue)}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={(option, val) => option.id === val.id}
        onInputChange={(_, inputValue, reason) => {
          if (reason === "input") onSearch(inputValue);
        }}
        loading={isLoading}
        disabled={disabled}
        size={size}
        sx={width ? { width } : undefined}
        ListboxProps={{ onScroll: handleScroll }}
        renderOption={(optionProps, option, { selected }) => (
          <li {...optionProps} key={option.id}>
            <Checkbox size="small" checked={selected} sx={{ mr: 1 }} />
            <Box component="span" sx={ellipsisStyle}>
              {getOptionLabel(option)}
            </Box>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    );
  }

  return (
    <Autocomplete
      options={users}
      value={!multiple ? props.value : null}
      onChange={(_, newValue) => {
        if (!multiple) {
          props.onChange(newValue);
        }
      }}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={(option, val) => option.id === val.id}
      onInputChange={(_, inputValue, reason) => {
        if (reason === "input") onSearch(inputValue);
      }}
      loading={isLoading}
      disabled={disabled}
      size={size}
      sx={width ? { width } : undefined}
      ListboxProps={{ onScroll: handleScroll }}
      renderOption={(optionProps, option) => (
        <li {...optionProps} key={option.id}>
          <Box component="span" sx={ellipsisStyle}>
            {getOptionLabel(option)}
          </Box>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      noOptionsText={
        isLoading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={16} />
            <Typography variant="body2">Loading...</Typography>
          </Box>
        ) : (
          "No users found"
        )
      }
    />
  );
};
