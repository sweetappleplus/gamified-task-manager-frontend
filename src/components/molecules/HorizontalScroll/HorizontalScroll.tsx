import React, { useRef, useState, useCallback } from "react";
import { Box, styled } from "@mui/material";
import { HorizontalScrollProps } from "./HorizontalScroll.types";

const Wrapper = styled(Box)({
  position: "relative",
  width: "100%",
  minWidth: 0,
});

const Track = styled(Box)<{ ownerState: { gap: number } }>(
  ({ ownerState }) => ({
    display: "flex",
    gap: ownerState.gap,
    overflowX: "auto",
    scrollBehavior: "smooth",
    WebkitOverflowScrolling: "touch",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  })
);

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  gap = 8,
  sx,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0 });

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const track = trackRef.current;
      if (!track) return;
      setIsDragging(true);
      dragState.current.startX = e.clientX;
      dragState.current.scrollLeft = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
      track.style.scrollBehavior = "auto";
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const track = trackRef.current;
      if (!track) return;
      const dx = e.clientX - dragState.current.startX;
      track.scrollLeft = dragState.current.scrollLeft - dx;
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      setIsDragging(false);
      const track = trackRef.current;
      if (track) {
        track.releasePointerCapture(e.pointerId);
        track.style.scrollBehavior = "smooth";
      }
    },
    []
  );

  return (
    <Wrapper sx={sx}>
      <Track
        ref={trackRef}
        ownerState={{ gap }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        sx={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {children}
      </Track>
    </Wrapper>
  );
};
