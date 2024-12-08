import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getCurrentUserKindeId = async () => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    return user.id;
  } catch (error) {
    throw new Error("Error getting user from session: " + error);
  }
};
