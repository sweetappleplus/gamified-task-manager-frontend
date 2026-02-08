import React from "react";
import { FooterNavLinks } from "components";
import { WorkerFooterProps } from "./WorkerFooter.types";

export const WorkerFooter: React.FC<WorkerFooterProps> = ({ activeRoute }) => {
  return <FooterNavLinks activeRoute={activeRoute} />;
};
