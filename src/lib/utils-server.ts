import toast from "react-hot-toast";
import { USER_PROFILE_STATUS } from "@/shared/constants";

export const handleAstrologerRedirect = (status: string): string | undefined => {
  switch (status) {
    case USER_PROFILE_STATUS.APPROVED_ACTIVATED:
      return "/astrologer/dashboard";

    case USER_PROFILE_STATUS.PENDING_PROFILE_COMPLETION:
      return "/astrologer/onboarding";

    case USER_PROFILE_STATUS.PROFILE_INCOMPLETE:
      return "/astrologer/profile";

    case USER_PROFILE_STATUS.AWAITING_FINAL_REVIEW:
      return "/astrologer/awaiting-review";

    case USER_PROFILE_STATUS.REJECTED:
      toast.error("Your account is rejected. Please contact to Admin");
      break;

    default:
      toast.error("Your account is not activated yet. Please contact to Admin");
      break;
  }
};

export const handleUserStatusRedirect = (status: string): string | undefined => {
  switch (status) {
    case USER_PROFILE_STATUS.APPROVED_ACTIVATED:
      return "/user/dashboard";

    case USER_PROFILE_STATUS.PENDING_PROFILE_COMPLETION:
      return "/user/onboarding";

    default:
      break;
  }
};
