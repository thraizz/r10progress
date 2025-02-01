import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from "firebase/functions";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../provider/UserContext";

interface MembershipStatus {
  isSupporter: boolean;
  message: string;
}

export const useMembershipStatus = () => {
  const { user } = useContext(UserContext);
  const [membershipStatus, setMembershipStatus] =
    useState<MembershipStatus | null>(null);
  const [isCheckingMembership, setIsCheckingMembership] = useState(true);

  const functions = getFunctions();
  if (process.env.NODE_ENV === "development") {
    connectFunctionsEmulator(functions, "localhost", 5001);
  }

  const checkMembershipStatus = useCallback(
    () =>
      httpsCallable<void, MembershipStatus>(functions, "checkMembershipStatus"),
    [functions],
  );

  useEffect(() => {
    const checkMembership = async () => {
      if (!user) return;

      try {
        const result = await checkMembershipStatus()();
        setMembershipStatus(result.data);
      } catch (error) {
        console.error("Error checking membership:", error);
        setMembershipStatus({
          isSupporter: false,
          message: "Failed to check membership status",
        });
      } finally {
        setIsCheckingMembership(false);
      }
    };

    checkMembership();
  }, [user, checkMembershipStatus]);

  return {
    membershipStatus,
    isCheckingMembership,
  };
};
