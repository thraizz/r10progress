import { useContext } from "react";
import { auth } from "../firebase";
import { UserContext } from "../provider/UserContext";
import { UploadModal } from "./UploadModal";

export const UserMenu = () => {
  const { user } = useContext(UserContext);
  const isAuthenticated = user?.uid;
  const isAnonymous = user?.isAnonymous;
  return (
    <div className="flex flex-row gap-4 items-center">
      {isAuthenticated && (
        <>
          <UploadModal disabled={!!isAnonymous} />
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
