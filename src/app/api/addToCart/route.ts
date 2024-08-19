import CartModel from "@/lib/models/CartModel";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { product_id, quantity, user_id } = await request.json();

  await connectMongoDB();

  // Find the existing product in the cart for the given user and product
  const existingProduct = await CartModel.findOne({ product_id, user_id });

  if (existingProduct) {
    // If the product already exists, update the quantity
    existingProduct.quantity =
      parseInt(existingProduct.quantity) + parseInt(quantity);
    await existingProduct.save();
    return new NextResponse("Product quantity updated in the cart", {
      status: 200,
    });
  }

  const newCartData = new CartModel({
    user_id,
    product_id,
    quantity,
  });

  try {
    await newCartData.save();
    return new NextResponse("Product added to cart", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
