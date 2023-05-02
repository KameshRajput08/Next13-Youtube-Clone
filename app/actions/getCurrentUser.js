import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import connectMongo from "../libs/conn";
import User from "@/models/User";

export async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  try {
    connectMongo();

    const user = await User.findById(session.user._id).lean();

    const safeUser = {
      ...user,
      _id: user._id.toString(),
      createdAt: user.createdAt.toISOString(),
    };

    return safeUser;
  } catch (err) {
    return null;
  }
}

export async function getUserById(id) {
  try {
    connectMongo();

    const user = await User.findById(id).lean();

    const safeUser = {
      ...user,
      _id: user._id.toString(),
      createdAt: user.createdAt.toISOString(),
    };

    return safeUser;
  } catch (err) {
    return null;
  }
}
