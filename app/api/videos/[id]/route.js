import { getSession } from "@/app/actions/getCurrentUser";
import connectMongo from "@/app/libs/conn";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  connectMongo().catch((error) =>
    NextResponse.json({ error: "Connection to database Failed...!" })
  );

  await Video.findByIdAndUpdate(params.id, {
    $inc: { views: 1 },
  });

  return NextResponse.json({ message: "View added successfully" });
}

export async function DELETE(request, { params }) {
  connectMongo().catch((error) =>
    NextResponse.json({ error: "Connection to database Failed...!" })
  );

  const video = await Video.findByIdAndDelete(params.id).lean();

  if (session?.user?._id === video.user) {
    try {
      await Video.findByIdAndDelete(params.id);
      return NextResponse.json({ message: "Video deleted successfully" });
    } catch (err) {
      return NextResponse.json({ error: "Something went wrong..." });
    }
  } else {
    return NextResponse.json({ error: "You can delete your video only." });
  }
}
