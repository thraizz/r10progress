import { PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../provider/UserContext";

export const RedirectIfNotLoggedIn = ({ children }: PropsWithChildren) => {
  const { user } = useContext(UserContext);

  let target = "/login";
  if (window.location.pathname !== "/") {
    target = target + `?redirect=${window.location.pathname}`;
  }
  return !user?.uid ? <Navigate to={target} replace /> : children;
};

export const RedirectIfSignedIn = ({ children }: PropsWithChildren) => {
  const { user } = useContext(UserContext);

  const query = new URLSearchParams(window.location.search);

  const target = query.get("redirect") || "/dashboard";

  return user?.uid ? <Navigate to={target} replace /> : children;
};
