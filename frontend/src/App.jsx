import React, { useEffect, useMemo, useState } from "react";
import { api } from "./api";

const categories = ["海鲜", "肉类", "菜类", "豆腐", "汤类", "饮料", "其他"];

function formatPrice(value) {
  return Number(value || 0).toFixed(2);
}

function useCart() {
  const [cart, setCart] = useState([]);
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );
  const count = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const addItem = (dish) => {
    setCart((prev) => {
      const found = prev.find((item) => item._id === dish._id);
      if (found) {
        return prev.map((item) =>
          item._id === dish._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clear = () => setCart([]);

  return { cart, total, count, addItem, updateQuantity, clear };
}

export default function App() {
  const [mode, setMode] = useState("customer");
  const [tableNo, setTableNo] = useState("");
  const [step, setStep] = useState("table");
  const [dishes, setDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [cartVisible, setCartVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminTab, setAdminTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState(0);
  const [dishForm, setDishForm] = useState({
    name: "",
    category: categories[0],
    price: "",
    imageUrl: "",
    remark: ""
  });
  const [editingDishId, setEditingDishId] = useState(null);

  const { cart, total, count, addItem, updateQuantity, clear } = useCart();

  const filteredDishes = useMemo(
    () => dishes.filter((dish) => dish.category === selectedCategory),
    [dishes, selectedCategory]
  );

  useEffect(() => {
    if (mode === "customer" && step === "menu") {
      api.getDishes().then((res) => setDishes(res.data)).catch(handleError);
    }
  }, [mode, step]);

  useEffect(() => {
    if (mode === "admin" && adminAuthed) {
      loadOrders(orderStatus);
      loadDishes();
    }
  }, [mode, adminAuthed, orderStatus]);

  const handleError = (err) => {
    setMessage(err.message || "操作失败");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEnterMenu = () => {
    if (!/^\d+$/.test(tableNo)) {
      return handleError(new Error("桌号必须是数字"));
    }
    setStep("menu");
  };

  const submitOrder = async () => {
    try {
      if (cart.length === 0) return handleError(new Error("购物车为空"));
      await api.createOrder({
        tableNo,
        items: cart.map((item) => ({
          dishId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      });
      clear();
      setMessage("下单成功，请线下付款");
      setStep("success");
    } catch (err) {
      handleError(err);
    }
  };

  const loadOrders = async (status) => {
    try {
      const res = await api.getOrders(status);
      setOrders(res.data);
    } catch (err) {
      handleError(err);
    }
  };

  const loadDishes = async () => {
    try {
      const res = await api.getDishes();
      setDishes(res.data);
    } catch (err) {
      handleError(err);
    }
  };

  const handleFinishOrder = async (orderId) => {
    try {
      await api.finishOrder(orderId);
      loadOrders(orderStatus);
    } catch (err) {
      handleError(err);
    }
  };

  const handleAdminLogin = async () => {
    try {
      await api.adminLogin(adminPassword);
      setAdminAuthed(true);
    } catch (err) {
      handleError(err);
    }
  };

  const handleDishSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...dishForm,
      price: Number(dishForm.price)
    };
    try {
      if (editingDishId) {
        await api.updateDish({ id: editingDishId, ...payload });
      } else {
        await api.addDish(payload);
      }
      setDishForm({ name: "", category: categories[0], price: "", imageUrl: "", remark: "" });
      setEditingDishId(null);
      loadDishes();
    } catch (err) {
      handleError(err);
    }
  };

  const handleEditDish = (dish) => {
    setEditingDishId(dish._id);
    setDishForm({
      name: dish.name,
      category: dish.category,
      price: dish.price,
      imageUrl: dish.imageUrl || "",
      remark: dish.remark || ""
    });
    setAdminTab("dishes");
  };

  const handleDeleteDish = async (id) => {
    try {
      await api.deleteDish(id);
      loadDishes();
    } catch (err) {
      handleError(err);
    }
  };

  const handleClearOrders = async () => {
    if (!window.confirm("确认清空所有订单？此操作不可撤销")) return;
    try {
      await api.clearOrders(adminPassword);
      loadOrders(orderStatus);
    } catch (err) {
      handleError(err);
    }
  };

  if (mode === "admin") {
    return (
      <div className="app">
        <div className="header">
          <div className="logo">新发发 · 后台</div>
          <button className="button ghost" onClick={() => setMode("customer")}>返回点餐</button>
        </div>

        {message && <div className="card section">{message}</div>}

        {!adminAuthed ? (
          <div className="card">
            <h3>管理员登录</h3>
            <input
              className="input"
              type="password"
              placeholder="请输入管理密码"
              value={adminPassword}
              onChange={(event) => setAdminPassword(event.target.value)}
            />
            <div className="section">
              <button className="button" onClick={handleAdminLogin}>登录</button>
            </div>
          </div>
        ) : (
          <div className="section">
            <div className="flex">
              <button className={`button ${adminTab === "orders" ? "" : "ghost"}`} onClick={() => setAdminTab("orders")}>订单管理</button>
              <button className={`button ${adminTab === "dishes" ? "" : "ghost"}`} onClick={() => setAdminTab("dishes")}>菜单管理</button>
              <button className={`button ${adminTab === "clean" ? "" : "ghost"}`} onClick={() => setAdminTab("clean")}>数据清理</button>
            </div>

            {adminTab === "orders" && (
              <div className="section card">
                <div className="space-between">
                  <h3>订单管理</h3>
                  <div className="flex">
                    <button className={`button ${orderStatus === 0 ? "" : "ghost"}`} onClick={() => setOrderStatus(0)}>未出餐</button>
                    <button className={`button ${orderStatus === 1 ? "" : "ghost"}`} onClick={() => setOrderStatus(1)}>历史订单</button>
                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>桌号</th>
                      <th>下单时间</th>
                      <th>菜品</th>
                      <th>总价</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.tableNo}</td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                        <td>
                          {order.items.map((item) => (
                            <div key={item.dishId} className="small">
                              {item.name} x {item.quantity}（￥{formatPrice(item.price)}）
                            </div>
                          ))}
                        </td>
                        <td>￥{formatPrice(order.totalPrice)}</td>
                        <td>
                          {orderStatus === 0 ? (
                            <button className="button" onClick={() => handleFinishOrder(order._id)}>已出餐</button>
                          ) : (
                            <span className="tag">已完成</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {adminTab === "dishes" && (
              <div className="section">
                <div className="grid">
                  <div className="card">
                    <h3>{editingDishId ? "修改菜品" : "新增菜品"}</h3>
                    <form onSubmit={handleDishSubmit} className="section">
                      <input className="input" placeholder="名称" value={dishForm.name} onChange={(event) => setDishForm({ ...dishForm, name: event.target.value })} />
                      <div className="section">
                        <select className="input" value={dishForm.category} onChange={(event) => setDishForm({ ...dishForm, category: event.target.value })}>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <input className="input" placeholder="价格" value={dishForm.price} onChange={(event) => setDishForm({ ...dishForm, price: event.target.value })} />
                      <div className="section">
                        <input className="input" placeholder="图片URL" value={dishForm.imageUrl} onChange={(event) => setDishForm({ ...dishForm, imageUrl: event.target.value })} />
                      </div>
                      <input className="input" placeholder="备注" value={dishForm.remark} onChange={(event) => setDishForm({ ...dishForm, remark: event.target.value })} />
                      <div className="section flex">
                        <button className="button" type="submit">保存</button>
                        {editingDishId && (
                          <button className="button ghost" type="button" onClick={() => {
                            setEditingDishId(null);
                            setDishForm({ name: "", category: categories[0], price: "", imageUrl: "", remark: "" });
                          }}>取消</button>
                        )}
                      </div>
                    </form>
                  </div>

                  <div className="card">
                    <h3>当前菜单</h3>
                    {dishes.map((dish) => (
                      <div key={dish._id} className="section space-between">
                        <div>
                          <div>{dish.name}</div>
                          <div className="small">{dish.category} · ￥{formatPrice(dish.price)}</div>
                        </div>
                        <div className="flex">
                          <button className="button ghost" onClick={() => handleEditDish(dish)}>编辑</button>
                          <button className="button danger" onClick={() => handleDeleteDish(dish._id)}>删除</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {adminTab === "clean" && (
              <div className="card section">
                <h3>清空订单数据</h3>
                <p className="small">不会影响菜单数据，请谨慎操作。</p>
                <button className="button danger" onClick={handleClearOrders}>一键清空订单</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="app">
      <div className="header">
        <div className="logo">新发发订餐</div>
        <div className="admin-entry" onClick={() => setMode("admin")}>管理入口</div>
      </div>

      {message && <div className="card section">{message}</div>}

      {step === "table" && (
        <div className="card">
          <h3>请输入桌号</h3>
          <input
            className="input"
            placeholder="仅数字"
            value={tableNo}
            onChange={(event) => setTableNo(event.target.value)}
          />
          <div className="section">
            <button className="button" onClick={handleEnterMenu}>进入菜单</button>
          </div>
        </div>
      )}

      {step === "menu" && (
        <div>
          <div className="cart-button" onClick={() => setCartVisible(!cartVisible)}>
            购物车 {count}
          </div>

          {cartVisible && (
            <div className="card cart-panel">
              <h4>购物车</h4>
              {cart.length === 0 && <div className="small">暂无菜品</div>}
              {cart.map((item) => (
                <div key={item._id} className="section space-between">
                  <div>
                    <div>{item.name}</div>
                    <div className="small">￥{formatPrice(item.price)}</div>
                  </div>
                  <div className="flex">
                    <button className="button ghost" onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="button ghost" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                </div>
              ))}
              <div className="section space-between">
                <strong>总价</strong>
                <strong>￥{formatPrice(total)}</strong>
              </div>
              <button className="button" onClick={submitOrder}>提交订单</button>
            </div>
          )}

          <div className="section card">
            <div className="flex">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`button ${selectedCategory === cat ? "" : "ghost"}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid">
            {filteredDishes.map((dish) => (
              <div key={dish._id} className="card">
                <div className="space-between">
                  <div>
                    <h4>{dish.name}</h4>
                    <div className="small">￥{formatPrice(dish.price)}</div>
                  </div>
                  <span className="badge">{dish.category}</span>
                </div>
                {dish.imageUrl && (
                  <img src={dish.imageUrl} alt={dish.name} style={{ width: "100%", borderRadius: 10, marginTop: 10 }} />
                )}
                {dish.remark && <div className="small section">{dish.remark}</div>}
                <div className="section">
                  <button className="button" onClick={() => addItem(dish)}>加入购物车</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === "success" && (
        <div className="card">
          <h3>订单已提交</h3>
          <p>桌号：{tableNo}</p>
          <p>请线下付款，后厨将尽快出餐。</p>
          <div className="section">
            <button className="button" onClick={() => setStep("menu")}>继续点餐</button>
          </div>
        </div>
      )}
    </div>
  );
}
