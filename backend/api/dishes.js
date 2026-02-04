import { connectDB } from "../db/mongo.js";
import Dish from "../models/Dish.js";
import { readJson, sendJson, setCors } from "./_utils.js";

const categories = ["海鲜", "肉类", "菜类", "豆腐", "汤类", "饮料", "其他"];

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    return res.end();
  }

  await connectDB();

  if (req.method === "GET") {
    const dishes = await Dish.find({ status: 1 }).sort({ _id: -1 });
    return sendJson(res, 200, { success: true, data: dishes });
  }

  const body = await readJson(req);

  if (req.method === "POST") {
    const {
      name,
      nameEn,
      nameMs,
      category,
      price,
      priceSmall,
      priceLarge,
      imageUrl,
      remark,
      remarkEn,
      remarkMs
    } = body;
    if (!name || !category || typeof price !== "number") {
      return sendJson(res, 400, { success: false, message: "参数不完整" });
    }
    if (!categories.includes(category)) {
      return sendJson(res, 400, { success: false, message: "分类不合法" });
    }
    const dish = await Dish.create({
      name,
      nameEn: nameEn || "",
      nameMs: nameMs || "",
      category,
      price,
      priceSmall: typeof priceSmall === "number" ? priceSmall : null,
      priceLarge: typeof priceLarge === "number" ? priceLarge : null,
      imageUrl,
      remark,
      remarkEn: remarkEn || "",
      remarkMs: remarkMs || ""
    });
    return sendJson(res, 200, { success: true, data: dish });
  }

  if (req.method === "PUT") {
    const {
      id,
      name,
      nameEn,
      nameMs,
      category,
      price,
      priceSmall,
      priceLarge,
      imageUrl,
      remark,
      remarkEn,
      remarkMs,
      status
    } = body;
    if (!id) return sendJson(res, 400, { success: false, message: "缺少id" });
    const update = { name, category, price, imageUrl, remark };
    if (typeof nameEn === "string") update.nameEn = nameEn;
    if (typeof nameMs === "string") update.nameMs = nameMs;
    if (typeof priceSmall === "number") update.priceSmall = priceSmall;
    if (typeof priceLarge === "number") update.priceLarge = priceLarge;
    if (typeof remarkEn === "string") update.remarkEn = remarkEn;
    if (typeof remarkMs === "string") update.remarkMs = remarkMs;
    if (typeof status === "number") update.status = status;
    const dish = await Dish.findByIdAndUpdate(id, update, { new: true });
    return sendJson(res, 200, { success: true, data: dish });
  }

  if (req.method === "DELETE") {
    const { id } = body;
    if (!id) return sendJson(res, 400, { success: false, message: "缺少id" });
    await Dish.findByIdAndUpdate(id, { status: 0 });
    return sendJson(res, 200, { success: true });
  }

  return sendJson(res, 405, { success: false, message: "Method Not Allowed" });
}
