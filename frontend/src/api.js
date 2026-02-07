const baseUrl = import.meta.env.VITE_API_BASE || "";

async function request(path, options = {}) {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.success === false) {
    throw new Error(data?.message || "请求失败");
  }
  return data;
}

export const api = {
  getDishes: (all = false) => request(all ? "/api/dishes?all=1" : "/api/dishes"),
  addDish: (payload) =>
    request("/api/dishes", { method: "POST", body: JSON.stringify(payload) }),
  updateDish: (payload) =>
    request("/api/dishes", { method: "PUT", body: JSON.stringify(payload) }),
  deleteDish: (id) =>
    request("/api/dishes", { method: "DELETE", body: JSON.stringify({ id }) }),
  createOrder: (payload) =>
    request("/api/orders", { method: "POST", body: JSON.stringify(payload) }),
  getOrders: (status) => request(`/api/orders?status=${status}`),
  finishOrder: (orderId) =>
    request("/api/orders/finish", {
      method: "PUT",
      body: JSON.stringify({ orderId })
    }),
  payOrder: (orderId) =>
    request("/api/orders/pay", {
      method: "PUT",
      body: JSON.stringify({ orderId })
    }),
  getRevenueSummary: (date) => request(`/api/orders/summary?date=${date}`),
  adminLogin: (password) =>
    request("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password })
    }),
  clearOrders: (password) =>
    request("/api/admin/clear", {
      method: "POST",
      body: JSON.stringify({ password })
    })
};
