import { useContext } from "react";
import { UploadModal } from "./UploadModal";
import { UserContext } from "./UserProvider";
import { auth } from "./firebaseConfig";

export const UserMenu = () => {
  const { user } = useContext(UserContext);
  const isAuthenticated = user?.uid;
  return (
    <div className="flex flex-row gap-4 items-center">
      {isAuthenticated && (
        <>
          <UploadModal />
          <button onClick={() => auth.signOut()} className="btn">
            Logout
          </button>
        </>
      )}
    </div>
  );
};
