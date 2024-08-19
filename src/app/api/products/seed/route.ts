import { connectMongoDB } from "@/lib/mongodb";
import BlogModel from "@/lib/models/BlogModel";
import productService from "@/lib/services/productService";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const products = await productService.getAllProducts();
  await connectMongoDB();

  await BlogModel.deleteMany();
  await BlogModel.insertMany(products);

  return NextResponse.json({
    message: "seeded successfully",
    products,
  });
};
