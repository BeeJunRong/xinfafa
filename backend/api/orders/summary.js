import { connectDB } from "../../db/mongo.js";
import Order from "../../models/Order.js";
import { sendJson, setCors } from "../_utils.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== "GET") {
    return sendJson(res, 405, { success: false, message: "Method Not Allowed" });
  }

  await connectDB();

  const url = new URL(req.url, "http://localhost");
  const dateParam = url.searchParams.get("date");
  if (!dateParam) {
    return sendJson(res, 400, { success: false, message: "缺少date" });
  }

  const [year, month, day] = dateParam.split("-").map(Number);
  if (!year || !month || !day) {
    return sendJson(res, 400, { success: false, message: "date格式错误" });
  }

  const start = new Date(year, month - 1, day, 0, 0, 0, 0);
  const end = new Date(year, month - 1, day + 1, 0, 0, 0, 0);

  const orders = await Order.find({
    paid: true,
    createdAt: { $gte: start, $lt: end }
  });

  const total = orders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);
  return sendJson(res, 200, { success: true, data: { total } });
}
