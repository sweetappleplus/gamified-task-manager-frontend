export type LeafVariant = "bronze" | "silver" | "gold" | "diamond";

export interface LeafProps {
  /**
   * The variant of the leaf badge
   */
  variant: LeafVariant;
}
