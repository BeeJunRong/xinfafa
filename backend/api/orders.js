import { connectDB } from "../db/mongo.js";
import Order from "../models/Order.js";
import { readJson, sendJson, setCors } from "./_utils.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    return res.end();
  }

  await connectDB();

  if (req.method === "GET") {
    const url = new URL(req.url, "http://localhost");
    const statusParam = url.searchParams.get("status");
    const status = statusParam === "1" ? 1 : 0;
    const orders = await Order.find({ status }).sort({ createdAt: 1 });
    return sendJson(res, 200, { success: true, data: orders });
  }

  if (req.method === "POST") {
    const body = await readJson(req);
    const { tableNo, items, remark } = body;
    if (!tableNo || !Array.isArray(items) || items.length === 0) {
      return sendJson(res, 400, { success: false, message: "参数不完整" });
    }
    const totalPrice = items.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
      0
    );
    const order = await Order.create({
      tableNo,
      items,
      totalPrice,
      remark: remark || "",
      status: 0
    });
    return sendJson(res, 200, { success: true, data: order });
  }

  return sendJson(res, 405, { success: false, message: "Method Not Allowed" });
}
