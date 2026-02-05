import React, { useCallback, useRef } from "react";
import { Box, InputBase, styled } from "@mui/material";
import { OtpInputProps } from "./OtpInput.types";

const OtpContainer = styled(Box)({
  display: "flex",
  gap: 8,
});

const OtpCell = styled(InputBase)(({ theme }) => ({
  width: 48,
  height: 56,
  borderRadius: 16,
  backgroundColor: theme.palette.grayscale[50],
  "& .MuiInputBase-input": {
    padding: 16,
    textAlign: "center",
    fontSize: 16,
    lineHeight: "22px",
    fontWeight: 500,
    color: theme.palette.grayscale[950],
    caretColor: theme.palette.additional.red.main,
  },
}));

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  autoComplete = false,
  onChange,
  onComplete,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const valuesRef = useRef<string[]>(Array(length).fill(""));

  const getOtpValue = useCallback(() => valuesRef.current.join(""), []);

  const focusInput = useCallback((index: number) => {
    inputRefs.current[index]?.focus();
  }, []);

  const handleChange = useCallback(
    (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const char = e.target.value.replace(/\D/g, "").slice(-1);
      valuesRef.current[index] = char;

      const inputEl = inputRefs.current[index];
      if (inputEl) {
        inputEl.value = char;
      }

      const otpValue = getOtpValue();
      onChange?.(otpValue);

      if (char && index < length - 1) {
        focusInput(index + 1);
      }

      if (otpValue.length === length) {
        onComplete?.(otpValue);
      }
    },
    [length, onChange, onComplete, getOtpValue, focusInput]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (valuesRef.current[index]) {
          valuesRef.current[index] = "";
          const inputEl = inputRefs.current[index];
          if (inputEl) {
            inputEl.value = "";
          }
          onChange?.(getOtpValue());
        } else if (index > 0) {
          valuesRef.current[index - 1] = "";
          const prevEl = inputRefs.current[index - 1];
          if (prevEl) {
            prevEl.value = "";
          }
          focusInput(index - 1);
          onChange?.(getOtpValue());
        }
        e.preventDefault();
      }

      if (e.key === "ArrowLeft" && index > 0) {
        focusInput(index - 1);
      }

      if (e.key === "ArrowRight" && index < length - 1) {
        focusInput(index + 1);
      }
    },
    [length, onChange, getOtpValue, focusInput]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, length);

      pasted.split("").forEach((char, i) => {
        valuesRef.current[i] = char;
        const inputEl = inputRefs.current[i];
        if (inputEl) {
          inputEl.value = char;
        }
      });

      const otpValue = getOtpValue();
      onChange?.(otpValue);

      const nextIndex = Math.min(pasted.length, length - 1);
      focusInput(nextIndex);

      if (otpValue.length === length) {
        onComplete?.(otpValue);
      }
    },
    [length, onChange, onComplete, getOtpValue, focusInput]
  );

  return (
    <OtpContainer>
      {Array.from({ length }).map((_, index) => (
        <OtpCell
          key={index}
          inputRef={(el: HTMLInputElement | null) => {
            inputRefs.current[index] = el;
          }}
          inputProps={{
            maxLength: 1,
            inputMode: "numeric",
            autoComplete: autoComplete ? "one-time-code" : "off",
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(index, e)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(index, e)
          }
          onPaste={handlePaste}
        />
      ))}
    </OtpContainer>
  );
};
