import React, { useRef, useCallback } from "react";
import { Box, styled } from "@mui/material";
import { HorizontalScrollProps } from "./HorizontalScroll.types";

const DRAG_THRESHOLD = 5;

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
  const dragState = useRef({
    isDown: false,
    hasDragged: false,
    startX: 0,
    scrollLeft: 0,
  });

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    dragState.current.isDown = true;
    dragState.current.hasDragged = false;
    dragState.current.startX = e.clientX;
    dragState.current.scrollLeft = track.scrollLeft;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragState.current.isDown) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > DRAG_THRESHOLD) {
      dragState.current.hasDragged = true;
      track.style.scrollBehavior = "auto";
      track.scrollLeft = dragState.current.scrollLeft - dx;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    const track = trackRef.current;
    if (track) {
      track.style.scrollBehavior = "smooth";
    }
    dragState.current.isDown = false;
  }, []);

  const handleClickCapture = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (dragState.current.hasDragged) {
        e.stopPropagation();
        e.preventDefault();
        dragState.current.hasDragged = false;
      }
    },
    []
  );

  return (
    <Wrapper sx={sx}>
      <Track
        ref={trackRef}
        ownerState={{ gap }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClickCapture={handleClickCapture}
        sx={{
          cursor: dragState.current.isDown ? "grabbing" : "default",
          userSelect: "none",
        }}
      >
        {children}
      </Track>
    </Wrapper>
  );
};
