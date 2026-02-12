import React, { useMemo } from "react";
import { Box, styled } from "@mui/material";
import { DigitCard } from "components";
import { TimeCounterProps } from "./TimeCounter.types";

const Wrapper = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
});

const Pair = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 2,
});

const padTwo = (value: number): [number, number] => {
  const clamped = Math.min(Math.max(Math.floor(value), 0), 99);
  return [Math.floor(clamped / 10), clamped % 10];
};

export const TimeCounter: React.FC<TimeCounterProps> = ({ seconds, sx }) => {
  const [h1, h2, m1, m2, s1, s2] = useMemo(() => {
    const totalSec = Math.max(Math.floor(seconds), 0);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return [...padTwo(h), ...padTwo(m), ...padTwo(s)];
  }, [seconds]);

  return (
    <Wrapper sx={sx}>
      <Pair>
        <DigitCard digit={h1} />
        <DigitCard digit={h2} />
      </Pair>
      <Pair>
        <DigitCard digit={m1} />
        <DigitCard digit={m2} />
      </Pair>
      <Pair>
        <DigitCard digit={s1} />
        <DigitCard digit={s2} />
      </Pair>
    </Wrapper>
  );
};
