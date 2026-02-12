import React from "react";
import { Box, styled, useTheme } from "@mui/material";
import { LeafProps, LeafVariant } from "./Leaf.types";

const LEAF_HEIGHT = 20;

const labelMap: Record<LeafVariant, string> = {
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
  diamond: "Diamond",
};

const imageMap: Record<LeafVariant, string> = {
  bronze: "/assets/images/common/leafs-bronze.png",
  silver: "/assets/images/common/leafs-silver.png",
  gold: "/assets/images/common/leafs-gold.png",
  diamond: "/assets/images/common/leafs-diamond.png",
};

const LeafContainer = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
});

const LeafImage = styled("img")({
  height: LEAF_HEIGHT,
});

export const Leaf: React.FC<LeafProps> = ({ variant, text }) => {
  const theme = useTheme();
  const gradient = theme.palette.gradient[variant];

  return (
    <LeafContainer>
      <LeafImage src={imageMap[variant]} alt={variant} />
      <Box
        component="span"
        sx={{
          fontSize: 14,
          lineHeight: "20px",
          fontWeight: 600,
          background: `linear-gradient(180deg, ${gradient.start} 0%, ${gradient.end} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {text ?? labelMap[variant]}
      </Box>
      <LeafImage
        src={imageMap[variant]}
        alt={variant}
        sx={{ transform: "scaleX(-1)" }}
      />
    </LeafContainer>
  );
};
