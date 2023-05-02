import { getSession } from "@/app/actions/getCurrentUser";
import connectMongo from "@/app/libs/conn";
import Video from "@/models/Video";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
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

  const body = await request.json();

  connectMongo().catch((error) =>
    NextResponse.json({ error: "Connection to database Failed...!" })
  );

  const newVideo = await Video.create({
    user: new mongoose.Types.ObjectId(session.user._id),
    ...body,
  });
  const savedVideo = await newVideo.save();

  return NextResponse.json(savedVideo);
}
