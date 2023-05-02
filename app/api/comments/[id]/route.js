import { getSession } from "@/app/actions/getCurrentUser";
import connectMongo from "@/app/libs/conn";
import Comment from "@/models/Comment";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
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

  const comments = await Comment.find({ video: params.id });
  NextResponse.json(comments.sort((a, b) => b.createdAt - a.createdAt));
}

export async function DELETE(request, { params }) {
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
  connectMongo().catch((error) => {
    return NextResponse.json({ error: "Connection to database Failed...!" });
  });

  const comment = await Comment.findById(params.id);

  if (session.user._id === comment.user.toString()) {
    await Comment.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Comment deleted successfully" });
  } else {
    return NextResponse.json({ message: "You can delete your comment only." });
  }
}

export async function POST(request, { params }) {
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

  try {
    connectMongo().catch((error) => {
      return NextResponse.json({ error: "Connection to database Failed...!" });
    });

    const body = await request.json();

    const newComment = await Comment.create({
      user: new mongoose.Types.ObjectId(session.user._id),
      video: new mongoose.Types.ObjectId(params.id),
      desc: body.desc,
    });
    const savedComment = await newComment.save();
    return NextResponse.json(savedComment);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}
