import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  tableNo: { type: String, required: true },
  items: [
    {
      dishId: String,
      name: String,
      nameEn: String,
      nameMs: String,
      price: Number,
      quantity: Number,
      size: String
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
