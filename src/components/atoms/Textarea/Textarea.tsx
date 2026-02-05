import React, { useState } from "react";
import { Box, InputBase, styled, Typography } from "@mui/material";
import { TextareaProps } from "./Textarea.types";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const StyledTextarea = styled(InputBase)(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  backgroundColor: theme.palette.grayscale[50],
  alignItems: "flex-start",
  "& textarea": {
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": { display: "none" },
  },
  "& .MuiInputBase-input": {
    padding: 0,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: "22px",
    color: theme.palette.grayscale[950],
    caretColor: theme.palette.additional.red["500"],
    "&::placeholder": {
      fontWeight: 500,
      fontSize: 16,
      lineHeight: "22px",
      color: theme.palette.grayscale[400],
      opacity: 1,
    },
  },
}));

const Counter = styled(Typography)(({ theme }) => ({
  marginTop: 6,
  fontWeight: 400,
  fontSize: 12,
  lineHeight: "16px",
  color: theme.palette.grayscale[800],
}));

export const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  maxLength,
  value,
  onChange,
  rows = 3,
}) => {
  const [internalValue, setInternalValue] = useState("");

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (maxLength && e.target.value.length > maxLength) return;
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e as React.ChangeEvent<HTMLTextAreaElement>);
  };

  return (
    <Container>
      <StyledTextarea
        multiline
        rows={rows}
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
      />
      {maxLength && (
        <Counter>
          {currentValue.length}/{maxLength}
        </Counter>
      )}
    </Container>
  );
};
