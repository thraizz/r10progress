import { UploadModal } from "./UploadModal";
import { auth } from "./firebaseConfig";

export const UserMenu = () => {
  return (
    <div className="flex flex-row gap-4 items-center">
      <UploadModal />
      <button
        onClick={() => auth.signOut()}
        className="border-2 border-gray-300 px-4 py-2 rounded-md bg-sky-200"
      >
        Logout
      </button>
    </div>
  );
};
