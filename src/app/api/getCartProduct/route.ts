import BlogModel from "@/lib/models/BlogModel";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    await connectMongoDB();

    const AllBlogs = await BlogModel.find();

    return new NextResponse(JSON.stringify(AllBlogs), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
