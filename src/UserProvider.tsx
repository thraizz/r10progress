import { onAuthStateChanged, User } from "firebase/auth";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { auth } from "./firebaseConfig";

type UserInitialState = User | null | undefined;
interface UserContextInterface {
  user: UserInitialState;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextInterface>({
  user: undefined,
  setUser: () => undefined,
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserInitialState>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const memoizedValue = React.useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser],
  );

  return (
    <UserContext.Provider value={memoizedValue}>
      {children}
    </UserContext.Provider>
  );
};
