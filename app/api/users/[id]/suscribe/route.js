import { getSession } from "@/app/actions/getCurrentUser";
import connectMongo from "@/app/libs/conn";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      {
        message: "SignIn required",
      },
      {
        status: 401,
      }
    );
  }

  connectMongo().catch((error) =>
    NextResponse.json({ error: "Connection to database Failed...!" })
  );

  const user = await User.findById(session.user._id).lean();

  const isSuscribed = user.suscribedChannels.includes(params.id);

  if (isSuscribed) {
    await User.findByIdAndUpdate(session.user._id, {
      $pull: { suscribedChannels: params.id },
    });
    await User.findByIdAndUpdate(params.id, {
      $inc: { suscribers: -1 },
    });
    return NextResponse.json({ isSuscribed: false });
  } else {
    await User.findByIdAndUpdate(session.user._id, {
      $push: { suscribedChannels: params.id },
    });
    await User.findByIdAndUpdate(params.id, {
      $inc: { suscribers: 1 },
    });
    return NextResponse.json({ isSuscribed: true });
  }
}
