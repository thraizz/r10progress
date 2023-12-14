import { FC, PropsWithChildren } from "react";

export const Label: FC<PropsWithChildren> = ({ children }) => (
  <p className="text-xs text-gray-500">{children}</p>
);
