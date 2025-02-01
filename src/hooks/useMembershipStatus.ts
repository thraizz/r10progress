import { httpsCallable } from "firebase/functions";
import { useCallback, useContext, useEffect, useState } from "react";
import { functions } from "../firebase";
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

  const checkMembershipStatus = useCallback(
    () =>
      httpsCallable<void, MembershipStatus>(functions, "checkMembershipStatus"),
    [],
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
