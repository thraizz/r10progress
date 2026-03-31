import { useContext } from "react";
import { auth } from "../firebase";
import { UserContext } from "../provider/UserContext";

export const UserMenu = () => {
  const { user } = useContext(UserContext);
  const isAuthenticated = user?.uid;
  return (
    <div className="flex flex-row items-center gap-4">
      {isAuthenticated && (
        <button
          onClick={() => {
            auth.signOut();
            window.location.assign("/");
          }}
          className="btn"
        >
          Logout
        </button>
      )}
    </div>
  );
};
