import connect from "@/utils/db";
import { NextResponse } from "next/server";
import InteractModel from "@/lib/models/InteractModel";

export const POST = async (request: any) => {
  const { user_id, product_id, interaction_type } = await request.json();
  await connect();

  try {
    let message = "";
    let likesCount = 0;

    if (interaction_type === "like" || interaction_type === "heart") {
      const existingLike = await InteractModel.findOne({
        user_id,
        product_id,
      });

      if (!existingLike) {
        const interaction = new InteractModel({
          user_id,
          product_id,
          interaction_type,
        });
        await interaction.save();
      } else {
        await InteractModel.findOneAndUpdate(
          { user_id, product_id },
          { interaction_type },
          { new: true } // To return updated document
        );
      }
      message = `Product ${
        interaction_type === "like" ? "Liked" : "Hearted"
      } Successfully`;
    } else if (interaction_type === "dislike") {
      // Remove existing like or heart interaction
      await InteractModel.findOneAndDelete({
        user_id,
        product_id,
        interaction_type: { $in: ["like", "heart"] },
      });
      message = "Product Disliked Successfully";
    }

    // Calculate total likes count for the product (including both like and heart interactions)
    likesCount = await InteractModel.countDocuments({
      product_id,
      interaction_type: { $in: ["like", "heart"] }, // Include both like and heart interactions
    });

    return new NextResponse(JSON.stringify({ message, likesCount }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error saving interaction:", error);
    return new NextResponse("Failed to save interaction", { status: 500 });
  }
};
