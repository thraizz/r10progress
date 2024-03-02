import { PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../provider/UserContext";

export const RedirectIfSignedIn = ({ children }: PropsWithChildren) => {
  const { user } = useContext(UserContext);

  return !user?.uid ? <Navigate to="/login" replace /> : children;
};
