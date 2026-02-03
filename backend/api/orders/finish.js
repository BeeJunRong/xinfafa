import { connectDB } from "../../db/mongo.js";
import Order from "../../models/Order.js";
import { readJson, sendJson, setCors } from "../_utils.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== "PUT") {
    return sendJson(res, 405, { success: false, message: "Method Not Allowed" });
  }

  await connectDB();

  const body = await readJson(req);
  const { orderId } = body;
  if (!orderId) {
    return sendJson(res, 400, { success: false, message: "缺少orderId" });
  }

  const order = await Order.findByIdAndUpdate(orderId, { status: 1 }, { new: true });
  return sendJson(res, 200, { success: true, data: order });
}
