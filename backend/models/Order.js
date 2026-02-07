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
      size: String,
      temp: String
    }
  ],
  totalPrice: { type: Number, required: true },
  remark: { type: String, default: "" },
  status: { type: Number, default: 0 },
  paid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
