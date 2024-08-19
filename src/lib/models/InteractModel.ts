import mongoose from "mongoose";

const interactSchema = new mongoose.Schema(
  {
    user_id : { type: String, required: true },
    product_id: { type: String, required: true },
    interaction_type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const InteractModel =
  mongoose.models.Interact || mongoose.model("Interact", interactSchema);

export default InteractModel;
