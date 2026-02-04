import mongoose from "mongoose";

const DishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameEn: { type: String, default: "" },
  nameMs: { type: String, default: "" },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  priceSmall: { type: Number, default: null },
  priceLarge: { type: Number, default: null },
  imageUrl: { type: String, default: "" },
  remark: { type: String, default: "" },
  remarkEn: { type: String, default: "" },
  remarkMs: { type: String, default: "" },
  status: { type: Number, default: 1 }
});

export default mongoose.models.Dish || mongoose.model("Dish", DishSchema);
