import connect from "@/utils/db";
import { NextResponse } from "next/server";
import InteractModel from "@/lib/models/InteractModel";

export const POST = async (request: any) => {
  const { product_id } = await request.json();
  await connect();

  try {
    const likesCount = await InteractModel.countDocuments({
      product_id: product_id as string, // Assuming product_id is a string
      interaction_type: { $in: ["like", "heart"] },
    });

    // Return the count of likes
    return new NextResponse(JSON.stringify({ likesCount }), { status: 200 });
  } catch (error) {
    console.error("Error fetching likes count:", error);
    return new NextResponse("Failed to fetch likes count", { status: 500 });
  }
};
