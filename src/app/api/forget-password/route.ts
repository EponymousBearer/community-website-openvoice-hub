import User from "@/lib/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: any) => {
  const { email, newPassword } = await request.json();

  await connect();

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return new NextResponse("Email does not exist", { status: 400 });
  }

  // Hash the new password before updating
  const hashedPassword = await bcrypt.hash(newPassword, 5);

  // Update the user's password in the database
  try {
    await User.updateOne({ email }, { password: hashedPassword });
    return new NextResponse("Password updated successfully", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
