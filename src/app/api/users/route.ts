import UserModel from "@/lib/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { name, age, gender, phoneNumber, profileImage } = await request.json();

  await connect();

  const newUser = new UserModel({
    name,
    age,
    gender,
    phoneNumber,
    profileImage,
  });
  try {
    await newUser.save();
    return new NextResponse("user Profile Updated", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
