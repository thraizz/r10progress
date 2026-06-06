import { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { UserContext } from "../provider/UserContext";
import { dashboardRoutes } from "../routes";

export const UserMenu = () => {
  const { user } = useContext(UserContext);
  const isAuthenticated = user?.uid;
  return (
    <div className="flex flex-row items-center gap-4">
      {isAuthenticated && (
        <>
          <Link
            to={dashboardRoutes.upload}
            className="btn btn-secondary whitespace-nowrap"
          >
            Upload File
          </Link>
          <button
            onClick={() => {
              auth.signOut();
              window.location.assign("/");
            }}
            className="btn"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};
