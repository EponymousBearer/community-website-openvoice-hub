import UserModel from "@/lib/models/User"
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { username, email, password } = await request.json();
  // console.log(firstname,lastname,email, password)

  await connect();

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new UserModel({
    username,
    email,
    password: hashedPassword,
  });
  // console.log("BS NU",newUser)
  try {
    await newUser.save();
    return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};