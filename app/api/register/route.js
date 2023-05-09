import { NextResponse } from "next/server";
import connectMongo from "@/app/libs/conn";
import User from "@/models/User";
import { hash } from "bcryptjs";

export async function POST(request) {
  connectMongo().catch((error) =>
    NextResponse.json({ error: "Connection to database Failed...!" })
  );

  const body = await request.json();
  const { email, name, password } = body;

  if (!email || !name || !password) {
    NextResponse.json({ error: "Please fill all required fields." });
  }

  // check duplicate users
  const checkexisting = await User.findOne({ email });
  if (checkexisting)
    return NextResponse.json({ error: "User Already Exists...!" });

  // hash password
  const user = await User.create({
    username: name,
    email,
    password: await hash(password, 12),
    isAdmin: false,
  });

  return NextResponse.json(user);
}
