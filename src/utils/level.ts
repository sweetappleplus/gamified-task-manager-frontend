import type { LeafVariant } from "components/atoms/Leaf/Leaf.types";
import { LevelConfig } from "types";

const VARIANT_LEVELS: { name: string; variant: LeafVariant }[] = [
  { name: "Diamond", variant: "diamond" },
  { name: "Gold", variant: "gold" },
  { name: "Silver", variant: "silver" },
  { name: "Bronze", variant: "bronze" },
];

export const getLeafVariant = (
  totalXp: number,
  levelConfigs: LevelConfig[]
): LeafVariant => {
  for (const { name, variant } of VARIANT_LEVELS) {
    const config = levelConfigs.find((c) => c.name === name);
    if (config && totalXp >= config.xpRequired) {
      return variant;
    }
  }
  return "bronze";
};
