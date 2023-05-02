import { getSession } from "@/app/actions/getCurrentUser";
import connectMongo from "@/app/libs/conn";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  connectMongo().catch((error) =>
    NextResponse.json({ error: "Connection to database Failed...!" })
  );

  const user = await User.findById(params.id);

  return NextResponse.json(user);
}

export async function PUT(request, { params }) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: "SignIn required" }, { status: 401 });
  }
  connectMongo().catch((error) =>
    NextResponse.json({ error: "Connection to database Failed...!" })
  );

  const body = await request.json();

  if (params.id === session.user._id) {
    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );
    return NextResponse.json(updatedUser);
  } else {
    return NextResponse.json({ message: "You can update your account only." });
  }
}
