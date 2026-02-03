import { sendJson, setCors } from "./_utils.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    return res.end();
  }

  return sendJson(res, 404, {
    success: false,
    message: "请访问 /api/admin/login 或 /api/admin/clear"
  });
}
