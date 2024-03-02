import { useContext } from "react";
import { UserContext } from "./provider/UserContext";
import { Authentication } from "./views/Authentication";
import { DataView } from "./views/DataView";
import { Layout } from "./views/Layout";

export const App = () => {
  const { user } = useContext(UserContext);
  const isLoggedIn = user?.uid;

  return <Layout>{isLoggedIn ? <DataView /> : <Authentication />}</Layout>;
};
