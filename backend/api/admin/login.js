import { readJson, sendJson, setCors } from "../_utils.js";

const ADMIN_PASSWORD = "88888888";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { success: false, message: "Method Not Allowed" });
  }

  const body = await readJson(req);
  if (body?.password !== ADMIN_PASSWORD) {
    return sendJson(res, 401, { success: false, message: "密码错误" });
  }

  return sendJson(res, 200, { success: true });
}
