import React from "react";
import { FooterNavLinks } from "components";
import { WORKER_FOOTER_NAV_ITEMS } from "consts";
import { WorkerFooterProps } from "./WorkerFooter.types";

export const WorkerFooter: React.FC<WorkerFooterProps> = ({ activeRoute }) => {
  return (
    <FooterNavLinks items={WORKER_FOOTER_NAV_ITEMS} activeRoute={activeRoute} />
  );
};
