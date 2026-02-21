import React, { useCallback, useRef, useState } from "react";
import { Box, ClickAwayListener, Popper, alpha, styled } from "@mui/material";
import { Icon } from "components";
import { DropdownProps } from "./Dropdown.types";

const Trigger = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  padding: "8px 12px",
  borderRadius: 12,
  backgroundColor: theme.palette.grayscale[50],
  cursor: "pointer",
  userSelect: "none",
}));

const TriggerText = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 500,
  color: theme.palette.grayscale[950],
}));

const ListContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grayscale[0],
  borderRadius: 16,
  boxShadow: `0px 4px 20px 0px ${alpha(theme.palette.grayscale[950], 0.08)}`,
  paddingTop: 4,
  paddingBottom: 4,
  overflowY: "auto",
  maxHeight: 300,
  "&::-webkit-scrollbar": {
    width: 2,
    marginRight: 4,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grayscale[200],
    borderRadius: 100,
  },
}));

const ListItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 12px",
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 400,
  color: theme.palette.grayscale[950],
  cursor: "pointer",
  "&:not(:last-child)": {
    borderBottom: `0.5px solid ${theme.palette.grayscale[100]}`,
  },
  "&:hover": {
    backgroundColor: theme.palette.grayscale[50],
  },
}));

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  value,
  onChange,
  width,
  sx,
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const selectedLabel = items.find((item) => item.value === value)?.label ?? "";

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSelect = useCallback(
    (itemValue: string) => {
      onChange(itemValue);
      setOpen(false);
    },
    [onChange]
  );

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        sx={{
          position: "relative",
          display: "inline-block",
          width,
          ...(sx as Record<string, unknown>),
        }}
      >
        <Trigger ref={triggerRef} onClick={handleToggle} sx={{ width: "100%" }}>
          <TriggerText>{selectedLabel}</TriggerText>
          <Box
            sx={{
              display: "flex",
              color: "grayscale.500",
              ml: "auto",
              transform: open ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
            }}
          >
            <Icon name="down" size={20} />
          </Box>
        </Trigger>
        <Popper
          open={open}
          anchorEl={triggerRef.current}
          placement="bottom-start"
          style={{ zIndex: 1300, width: triggerRef.current?.offsetWidth }}
          modifiers={[{ name: "offset", options: { offset: [0, 4] } }]}
        >
          <ListContainer>
            {items.map((item) => (
              <ListItem
                key={item.value}
                isSelected={item.value === value}
                onClick={() => handleSelect(item.value)}
              >
                {item.label}
                {item.value === value && (
                  <Box sx={{ display: "flex", color: "primary.600" }}>
                    <Icon name="tick" size={20} />
                  </Box>
                )}
              </ListItem>
            ))}
          </ListContainer>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};
