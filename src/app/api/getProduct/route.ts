import BlogModel from "@/lib/models/BlogModel";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  try {
    const { productIds } = await request.json();
    // console.log(productIds);

    await connectMongoDB();

    // Find products by the array of product IDs
    const products = await BlogModel.find({ _id: { $in: productIds } });

    return new NextResponse(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
