import mongoose from "mongoose";

const DishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, default: "" },
  remark: { type: String, default: "" },
  status: { type: Number, default: 1 }
});

export default mongoose.models.Dish || mongoose.model("Dish", DishSchema);
