import { getSession } from "@/app/actions/getCurrentUser";
import connectMongo from "@/app/libs/conn";
import Video from "@/models/Video";
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

  const video = await Video.findById(params.id).lean();

  const isliked = video.likes.includes(session.user._id);

  if (!isliked) {
    await Video.findByIdAndUpdate(params.id, {
      $addToSet: { likes: session.user._id },
    });
    return NextResponse.json({ isliked: true });
  } else {
    await Video.findByIdAndUpdate(params.id, {
      $pull: { likes: session.user._id },
    });
    return NextResponse.json({ isliked: false });
  }
}
