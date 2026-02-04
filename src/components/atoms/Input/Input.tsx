import React, { useState } from "react";
import {
  Box,
  InputBase,
  styled,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { InputProps, InputVariant } from "./Input.types";
import { Icon } from "../Icon";
import { IconName } from "../Icon/Icon.types";

const ICON_SIZE = 20;

const getBorderColor = (
  theme: Theme,
  variant: InputVariant,
  focused: boolean
) => {
  const borderColorMap: Record<InputVariant, string> = {
    normal: focused
      ? theme.palette.grayscale[200]
      : theme.palette.grayscale[50],
    validated: theme.palette.primary[600],
    error: theme.palette.additional.red.main,
  };
  return borderColorMap[variant];
};

const getLabelColor = (theme: Theme, variant: InputVariant) => {
  const labelColorMap: Record<InputVariant, string> = {
    normal: theme.palette.grayscale[800],
    validated: theme.palette.primary[600],
    error: theme.palette.additional.red.main,
  };
  return labelColorMap[variant];
};

const InputContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const InputWrapper = styled(Box)<{
  ownerState: { variant: InputVariant; focused: boolean };
}>(({ theme, ownerState }) => ({
  display: "flex",
  alignItems: "center",
  height: 54,
  borderRadius: 16,
  paddingInline: 16,
  gap: 8,
  backgroundColor: theme.palette.grayscale[50],
  border: "1px solid",
  borderColor: getBorderColor(theme, ownerState.variant, ownerState.focused),
  transition: "border-color 0.2s ease",
}));

const InputFieldContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  flex: 1,
  height: "100%",
  position: "relative",
});

const FloatingPlaceholder = styled(Typography)<{
  ownerState: { hasValue: boolean };
}>(({ theme, ownerState }) => ({
  position: "absolute",
  left: 0,
  color: theme.palette.grayscale[400],
  pointerEvents: "none",
  transition: "all 0.2s ease",
  ...(ownerState.hasValue
    ? {
        top: 6,
        fontWeight: 400,
        fontSize: 14,
        lineHeight: "20px",
      }
    : {
        top: "50%",
        transform: "translateY(-50%)",
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "22px",
      }),
}));

const StyledInputBase = styled(InputBase)<{
  ownerState: { hasValue: boolean };
}>(({ theme, ownerState }) => ({
  flex: 1,
  padding: 0,
  ...(ownerState.hasValue && {
    marginTop: 18,
  }),
  "& .MuiInputBase-input": {
    padding: 0,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: "22px",
    color: theme.palette.grayscale[950],
    caretColor: theme.palette.additional.red["500"],
    "&::placeholder": {
      opacity: 0,
    },
  },
}));

const HelperLabel = styled(Typography)<{
  ownerState: { variant: InputVariant };
}>(({ theme, ownerState }) => ({
  marginTop: 6,
  fontWeight: 400,
  fontSize: 12,
  lineHeight: "16px",
  color: getLabelColor(theme, ownerState.variant),
}));

const IconWrapper = styled(Box)<{
  ownerState: { clickable: boolean };
}>(({ ownerState }) => ({
  display: "flex",
  cursor: ownerState.clickable ? "pointer" : "default",
}));

export const Input: React.FC<InputProps> = ({
  variant = "normal",
  placeholder,
  label,
  leftIcon,
  rightIcon,
  onClickLeftIcon,
  onClickRightIcon,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  sx,
  ...props
}) => {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const hasValue = Boolean(currentValue);
  const iconColor = theme.palette.grayscale[500];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  const renderIcon = (icon: IconName, onClick?: () => void) => (
    <IconWrapper onClick={onClick} ownerState={{ clickable: !!onClick }}>
      <Icon name={icon} size={ICON_SIZE} color={iconColor} />
    </IconWrapper>
  );

  return (
    <InputContainer sx={sx}>
      <InputWrapper ownerState={{ variant, focused }}>
        {leftIcon && renderIcon(leftIcon, onClickLeftIcon)}
        <InputFieldContainer>
          {placeholder && (
            <FloatingPlaceholder ownerState={{ hasValue }}>
              {placeholder}
            </FloatingPlaceholder>
          )}
          <StyledInputBase
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ownerState={{ hasValue }}
            {...props}
          />
        </InputFieldContainer>
        {rightIcon && renderIcon(rightIcon, onClickRightIcon)}
      </InputWrapper>
      {label && <HelperLabel ownerState={{ variant }}>{label}</HelperLabel>}
    </InputContainer>
  );
};
