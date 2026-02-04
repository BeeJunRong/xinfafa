import React, { useEffect, useMemo, useState } from "react";
import { api } from "./api";

const categories = ["海鲜", "肉类", "菜类", "豆腐", "汤类", "饮料", "其他"];
const categoryLabels = {
  zh: categories,
  en: ["Seafood", "Meat", "Vegetables", "Tofu", "Soup", "Drinks", "Others"],
  ms: ["Makanan Laut", "Daging", "Sayur-sayuran", "Tauhu", "Sup", "Minuman", "Lain-lain"]
};

const uiText = {
  zh: {
    appName: "新发发",
    adminName: "新发发 · 后台",
    adminEntry: "管理入口",
    backToCustomer: "返回点餐",
    tableTitle: "请输入桌号",
    tablePlaceholder: "仅数字",
    enterMenu: "进入菜单",
    cart: "购物车",
    emptyCart: "暂无菜品",
    total: "总价",
    submitOrder: "提交订单",
    orderSuccess: "订单已提交",
    orderSuccessTip: "请线下付款，后厨将尽快出餐。",
    continueOrder: "继续点餐",
    adminLogin: "管理员登录",
    adminPasswordPlaceholder: "请输入管理密码",
    login: "登录",
    tabOrders: "订单管理",
    tabDishes: "菜单管理",
    tabClean: "数据清理",
    statusPending: "未出餐",
    statusHistory: "历史订单",
    tableNo: "桌号",
    orderTime: "下单时间",
    orderItems: "菜品",
    orderTotal: "总价",
    action: "操作",
    markFinished: "已出餐",
    finished: "已完成",
    addDish: "新增菜品",
    editDish: "修改菜品",
    nameZh: "名称（中文）",
    nameEn: "名称（English）",
    nameMs: "名称（Bahasa Melayu）",
    price: "价格",
    priceSmall: "小份价格",
    priceLarge: "大份价格",
    imageUrl: "图片URL",
    remarkZh: "备注（中文）",
    remarkEn: "备注（English）",
    remarkMs: "备注（Bahasa Melayu）",
    save: "保存",
    cancel: "取消",
    currentMenu: "当前菜单",
    edit: "编辑",
    delete: "删除",
    clearOrdersTitle: "清空订单数据",
    clearOrdersTip: "不会影响菜单数据，请谨慎操作。",
    clearOrders: "一键清空订单",
    addToCart: "加入购物车",
    tableHint: "当前桌号",
    changeTable: "更换桌号",
    sizeSmall: "小份",
    sizeLarge: "大份",
    sizeNormal: "标准"
  },
  en: {
    appName: "Xinfafa",
    adminName: "Xinfafa · Admin",
    adminEntry: "Admin",
    backToCustomer: "Back",
    tableTitle: "Enter Table Number",
    tablePlaceholder: "Digits only",
    enterMenu: "Enter Menu",
    cart: "Cart",
    emptyCart: "No items",
    total: "Total",
    submitOrder: "Submit Order",
    orderSuccess: "Order Submitted",
    orderSuccessTip: "Please pay offline. The kitchen will prepare soon.",
    continueOrder: "Order More",
    adminLogin: "Admin Login",
    adminPasswordPlaceholder: "Enter admin password",
    login: "Login",
    tabOrders: "Orders",
    tabDishes: "Menu",
    tabClean: "Data Cleanup",
    statusPending: "Pending",
    statusHistory: "History",
    tableNo: "Table",
    orderTime: "Time",
    orderItems: "Items",
    orderTotal: "Total",
    action: "Action",
    markFinished: "Done",
    finished: "Finished",
    addDish: "Add Dish",
    editDish: "Edit Dish",
    nameZh: "Name (Chinese)",
    nameEn: "Name (English)",
    nameMs: "Name (Bahasa Melayu)",
    price: "Price",
    priceSmall: "Small Price",
    priceLarge: "Large Price",
    imageUrl: "Image URL",
    remarkZh: "Remark (Chinese)",
    remarkEn: "Remark (English)",
    remarkMs: "Remark (Bahasa Melayu)",
    save: "Save",
    cancel: "Cancel",
    currentMenu: "Current Menu",
    edit: "Edit",
    delete: "Delete",
    clearOrdersTitle: "Clear Orders",
    clearOrdersTip: "Menu data will remain. Proceed carefully.",
    clearOrders: "Clear All Orders",
    addToCart: "Add to Cart",
    tableHint: "Table",
    changeTable: "Change Table",
    sizeSmall: "Small",
    sizeLarge: "Large",
    sizeNormal: "Regular"
  },
  ms: {
    appName: "Xinfafa",
    adminName: "Xinfafa · Admin",
    adminEntry: "Admin",
    backToCustomer: "Kembali",
    tableTitle: "Masukkan Nombor Meja",
    tablePlaceholder: "Nombor sahaja",
    enterMenu: "Masuk Menu",
    cart: "Troli",
    emptyCart: "Tiada item",
    total: "Jumlah",
    submitOrder: "Hantar Pesanan",
    orderSuccess: "Pesanan Dihantar",
    orderSuccessTip: "Sila bayar secara tunai. Dapur akan sediakan segera.",
    continueOrder: "Tambah Pesanan",
    adminLogin: "Log Masuk Admin",
    adminPasswordPlaceholder: "Masukkan kata laluan admin",
    login: "Log Masuk",
    tabOrders: "Pesanan",
    tabDishes: "Menu",
    tabClean: "Pembersihan Data",
    statusPending: "Belum siap",
    statusHistory: "Sejarah",
    tableNo: "Meja",
    orderTime: "Masa",
    orderItems: "Item",
    orderTotal: "Jumlah",
    action: "Tindakan",
    markFinished: "Siap",
    finished: "Selesai",
    addDish: "Tambah Menu",
    editDish: "Sunting Menu",
    nameZh: "Nama (Cina)",
    nameEn: "Nama (English)",
    nameMs: "Nama (Bahasa Melayu)",
    price: "Harga",
    priceSmall: "Harga Kecil",
    priceLarge: "Harga Besar",
    imageUrl: "URL Gambar",
    remarkZh: "Catatan (Cina)",
    remarkEn: "Catatan (English)",
    remarkMs: "Catatan (Bahasa Melayu)",
    save: "Simpan",
    cancel: "Batal",
    currentMenu: "Menu Semasa",
    edit: "Sunting",
    delete: "Padam",
    clearOrdersTitle: "Padam Pesanan",
    clearOrdersTip: "Data menu kekal. Sila berhati-hati.",
    clearOrders: "Padam Semua Pesanan",
    addToCart: "Tambah ke Troli",
    tableHint: "Meja",
    changeTable: "Tukar Meja",
    sizeSmall: "Kecil",
    sizeLarge: "Besar",
    sizeNormal: "Biasa"
  }
};

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

  const addItem = (dish, size, price) => {
    setCart((prev) => {
      const found = prev.find(
        (item) => item._id === dish._id && item.size === size
      );
      if (found) {
        return prev.map((item) =>
          item._id === dish._id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...dish, size, price, quantity: 1 }];
    });
  };

  const updateQuantity = (id, size, quantity) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id && item.size === size
            ? { ...item, quantity }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clear = () => setCart([]);

  return { cart, total, count, addItem, updateQuantity, clear };
}

export default function App() {
  const [mode, setMode] = useState("customer");
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "zh";
    return window.localStorage.getItem("language") || "zh";
  });
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
    nameEn: "",
    nameMs: "",
    category: categories[0],
    price: "",
    priceSmall: "",
    priceLarge: "",
    imageUrl: "",
    remark: "",
    remarkEn: "",
    remarkMs: ""
  });
  const [editingDishId, setEditingDishId] = useState(null);
  const [sizeSelections, setSizeSelections] = useState({});

  const { cart, total, count, addItem, updateQuantity, clear } = useCart();

  const filteredDishes = useMemo(
    () => dishes.filter((dish) => dish.category === selectedCategory),
    [dishes, selectedCategory]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("language", language);
    }
  }, [language]);

  const getDishSizeOptions = (dish) => {
    const options = [];
    if (typeof dish.priceSmall === "number") {
      options.push({ label: "小份", value: "small", price: dish.priceSmall });
    }
    if (typeof dish.priceLarge === "number") {
      options.push({ label: "大份", value: "large", price: dish.priceLarge });
    }
    if (options.length === 0) {
      options.push({ label: "标准", value: "normal", price: dish.price });
    }
    return options;
  };

  const getSelectedSize = (dish) => {
    const options = getDishSizeOptions(dish);
    return sizeSelections[dish._id] || options[0].value;
  };

  const getDishName = (dish) => {
    if (language === "en") return dish.nameEn || dish.name;
    if (language === "ms") return dish.nameMs || dish.name;
    return dish.name;
  };

  const getDishRemark = (dish) => {
    if (language === "en") return dish.remarkEn || dish.remark;
    if (language === "ms") return dish.remarkMs || dish.remark;
    return dish.remark;
  };

  const t = uiText[language] || uiText.zh;
  const localizedCategories = categoryLabels[language] || categoryLabels.zh;
  const categoryLabelMap = useMemo(
    () =>
      categories.reduce((acc, key, index) => {
        acc[key] = localizedCategories[index] || key;
        return acc;
      }, {}),
    [localizedCategories]
  );

  const getItemName = (item) => {
    if (language === "en") return item.nameEn || item.name;
    if (language === "ms") return item.nameMs || item.name;
    return item.name;
  };

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
          nameEn: item.nameEn || "",
          nameMs: item.nameMs || "",
          price: item.price,
          quantity: item.quantity,
          size: item.size
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
      price: Number(dishForm.price),
      priceSmall: dishForm.priceSmall === "" ? undefined : Number(dishForm.priceSmall),
      priceLarge: dishForm.priceLarge === "" ? undefined : Number(dishForm.priceLarge)
    };
    try {
      if (editingDishId) {
        await api.updateDish({ id: editingDishId, ...payload });
      } else {
        await api.addDish(payload);
      }
      setDishForm({
        name: "",
        nameEn: "",
        nameMs: "",
        category: categories[0],
        price: "",
        priceSmall: "",
        priceLarge: "",
        imageUrl: "",
        remark: "",
        remarkEn: "",
        remarkMs: ""
      });
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
      nameEn: dish.nameEn || "",
      nameMs: dish.nameMs || "",
      category: dish.category,
      price: dish.price,
      priceSmall: dish.priceSmall ?? "",
      priceLarge: dish.priceLarge ?? "",
      imageUrl: dish.imageUrl || "",
      remark: dish.remark || "",
      remarkEn: dish.remarkEn || "",
      remarkMs: dish.remarkMs || ""
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
          <div className="logo">{t.adminName}</div>
          <div className="flex">
            <button className={`button ${language === "zh" ? "" : "ghost"}`} onClick={() => setLanguage("zh")}>中文</button>
            <button className={`button ${language === "ms" ? "" : "ghost"}`} onClick={() => setLanguage("ms")}>马来文</button>
            <button className={`button ${language === "en" ? "" : "ghost"}`} onClick={() => setLanguage("en")}>English</button>
            <button className="button ghost" onClick={() => setMode("customer")}>{t.backToCustomer}</button>
          </div>
        </div>

        {message && <div className="card section">{message}</div>}

        {!adminAuthed ? (
          <div className="card">
            <h3>{t.adminLogin}</h3>
            <input
              className="input"
              type="password"
              placeholder={t.adminPasswordPlaceholder}
              value={adminPassword}
              onChange={(event) => setAdminPassword(event.target.value)}
            />
            <div className="section">
              <button className="button" onClick={handleAdminLogin}>{t.login}</button>
            </div>
          </div>
        ) : (
          <div className="section">
            <div className="flex">
              <button className={`button ${adminTab === "orders" ? "" : "ghost"}`} onClick={() => setAdminTab("orders")}>{t.tabOrders}</button>
              <button className={`button ${adminTab === "dishes" ? "" : "ghost"}`} onClick={() => setAdminTab("dishes")}>{t.tabDishes}</button>
              <button className={`button ${adminTab === "clean" ? "" : "ghost"}`} onClick={() => setAdminTab("clean")}>{t.tabClean}</button>
            </div>

            {adminTab === "orders" && (
              <div className="section card">
                <div className="space-between">
                  <h3>{t.tabOrders}</h3>
                  <div className="flex">
                    <button className={`button ${orderStatus === 0 ? "" : "ghost"}`} onClick={() => setOrderStatus(0)}>{t.statusPending}</button>
                    <button className={`button ${orderStatus === 1 ? "" : "ghost"}`} onClick={() => setOrderStatus(1)}>{t.statusHistory}</button>
                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>{t.tableNo}</th>
                      <th>{t.orderTime}</th>
                      <th>{t.orderItems}</th>
                      <th>{t.orderTotal}</th>
                      <th>{t.action}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.tableNo}</td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                        <td>
                          {order.items.map((item) => (
                            <div key={`${item.dishId}-${item.size || "normal"}`} className="small">
                              {getItemName(item)}
                              {item.size ? `（${item.size === "large" ? t.sizeLarge : item.size === "small" ? t.sizeSmall : t.sizeNormal}）` : ""}
                              {` x ${item.quantity}（￥${formatPrice(item.price)}）`}
                            </div>
                          ))}
                        </td>
                        <td>￥{formatPrice(order.totalPrice)}</td>
                        <td>
                          {orderStatus === 0 ? (
                            <button className="button" onClick={() => handleFinishOrder(order._id)}>{t.markFinished}</button>
                          ) : (
                            <span className="tag">{t.finished}</span>
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
                    <h3>{editingDishId ? t.editDish : t.addDish}</h3>
                    <form onSubmit={handleDishSubmit} className="section">
                      <input className="input" placeholder={t.nameZh} value={dishForm.name} onChange={(event) => setDishForm({ ...dishForm, name: event.target.value })} />
                      <div className="section">
                        <input className="input" placeholder={t.nameEn} value={dishForm.nameEn} onChange={(event) => setDishForm({ ...dishForm, nameEn: event.target.value })} />
                      </div>
                      <div className="section">
                        <input className="input" placeholder={t.nameMs} value={dishForm.nameMs} onChange={(event) => setDishForm({ ...dishForm, nameMs: event.target.value })} />
                      </div>
                      <div className="section">
                        <select className="input" value={dishForm.category} onChange={(event) => setDishForm({ ...dishForm, category: event.target.value })}>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <input className="input" placeholder={t.price} value={dishForm.price} onChange={(event) => setDishForm({ ...dishForm, price: event.target.value })} />
                      <div className="section">
                        <input className="input" placeholder={t.priceSmall} value={dishForm.priceSmall} onChange={(event) => setDishForm({ ...dishForm, priceSmall: event.target.value })} />
                      </div>
                      <div className="section">
                        <input className="input" placeholder={t.priceLarge} value={dishForm.priceLarge} onChange={(event) => setDishForm({ ...dishForm, priceLarge: event.target.value })} />
                      </div>
                      <div className="section">
                        <input className="input" placeholder={t.imageUrl} value={dishForm.imageUrl} onChange={(event) => setDishForm({ ...dishForm, imageUrl: event.target.value })} />
                      </div>
                      <input className="input" placeholder={t.remarkZh} value={dishForm.remark} onChange={(event) => setDishForm({ ...dishForm, remark: event.target.value })} />
                      <div className="section">
                        <input className="input" placeholder={t.remarkEn} value={dishForm.remarkEn} onChange={(event) => setDishForm({ ...dishForm, remarkEn: event.target.value })} />
                      </div>
                      <div className="section">
                        <input className="input" placeholder={t.remarkMs} value={dishForm.remarkMs} onChange={(event) => setDishForm({ ...dishForm, remarkMs: event.target.value })} />
                      </div>
                      <div className="section flex">
                        <button className="button" type="submit">{t.save}</button>
                        {editingDishId && (
                          <button className="button ghost" type="button" onClick={() => {
                            setEditingDishId(null);
                            setDishForm({
                              name: "",
                              nameEn: "",
                              nameMs: "",
                              category: categories[0],
                              price: "",
                              priceSmall: "",
                              priceLarge: "",
                              imageUrl: "",
                              remark: "",
                              remarkEn: "",
                              remarkMs: ""
                            });
                          }}>{t.cancel}</button>
                        )}
                      </div>
                    </form>
                  </div>

                  <div className="card">
                    <h3>{t.currentMenu}</h3>
                    {dishes.map((dish) => (
                      <div key={dish._id} className="section space-between">
                        <div>
                          <div>{getDishName(dish)}</div>
                          <div className="small">
                            {categoryLabelMap[dish.category]} · {getDishSizeOptions(dish)
                              .map((option) => `${option.label} ￥${formatPrice(option.price)}`)
                              .join(" / ")}
                          </div>
                        </div>
                        <div className="flex">
                          <button className="button ghost" onClick={() => handleEditDish(dish)}>{t.edit}</button>
                          <button className="button danger" onClick={() => handleDeleteDish(dish._id)}>{t.delete}</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {adminTab === "clean" && (
              <div className="card section">
                <h3>{t.clearOrdersTitle}</h3>
                <p className="small">{t.clearOrdersTip}</p>
                <button className="button danger" onClick={handleClearOrders}>{t.clearOrders}</button>
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
        <div className="logo">{t.appName}</div>
        <div className="flex">
          <button className={`button ${language === "zh" ? "" : "ghost"}`} onClick={() => setLanguage("zh")}>中文</button>
          <button className={`button ${language === "ms" ? "" : "ghost"}`} onClick={() => setLanguage("ms")}>马来文</button>
          <button className={`button ${language === "en" ? "" : "ghost"}`} onClick={() => setLanguage("en")}>English</button>
          <div className="admin-entry" onClick={() => setMode("admin")}>{t.adminEntry}</div>
        </div>
      </div>

      {message && <div className="card section">{message}</div>}

      {step === "table" && (
        <div className="card">
          <h3>{t.tableTitle}</h3>
          <input
            className="input"
            placeholder={t.tablePlaceholder}
            value={tableNo}
            onChange={(event) => setTableNo(event.target.value)}
          />
          <div className="section">
            <button className="button" onClick={handleEnterMenu}>{t.enterMenu}</button>
          </div>
        </div>
      )}

      {step === "menu" && (
        <div>
          <div className="card section space-between">
            <div>
              <strong>{t.tableHint}：</strong>{tableNo}
            </div>
            <button className="button ghost" onClick={() => setStep("table")}>
              {t.changeTable}
            </button>
          </div>
          <div className="cart-button" onClick={() => setCartVisible(!cartVisible)}>
            {t.cart} {count}
          </div>

          {cartVisible && (
            <div className="card cart-panel">
              <h4>{t.cart}</h4>
              {cart.length === 0 && <div className="small">{t.emptyCart}</div>}
              {cart.map((item) => (
                <div key={`${item._id}-${item.size}`} className="section space-between">
                  <div>
                    <div>{getItemName(item)}</div>
                    <div className="small">
                      {item.size ? `${item.size === "large" ? t.sizeLarge : item.size === "small" ? t.sizeSmall : t.sizeNormal} · ` : ""}
                      ￥{formatPrice(item.price)}
                    </div>
                  </div>
                  <div className="flex">
                    <button className="button ghost" onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="button ghost" onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}>+</button>
                  </div>
                </div>
              ))}
              <div className="section space-between">
                <strong>{t.total}</strong>
                <strong>￥{formatPrice(total)}</strong>
              </div>
              <button className="button" onClick={submitOrder}>{t.submitOrder}</button>
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
                  {categoryLabelMap[cat]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid">
            {filteredDishes.map((dish) => (
              <div key={dish._id} className="card">
                <div className="space-between">
                  <div>
                    <h4>{getDishName(dish)}</h4>
                    <div className="small">
                      {getDishSizeOptions(dish)
                        .map((option) => `${option.label} ￥${formatPrice(option.price)}`)
                        .join(" / ")}
                    </div>
                  </div>
                  <span className="badge">{dish.category}</span>
                </div>
                {dish.imageUrl && (
                  <img src={dish.imageUrl} alt={dish.name} className="dish-image" />
                )}
                {getDishRemark(dish) && <div className="small section">{getDishRemark(dish)}</div>}
                <div className="section">
                  <div className="size-selector">
                    {getDishSizeOptions(dish).map((option) => (
                      <label key={option.value} className="size-option">
                        <input
                          type="radio"
                          name={`size-${dish._id}`}
                          value={option.value}
                          checked={getSelectedSize(dish) === option.value}
                          onChange={() =>
                            setSizeSelections((prev) => ({
                              ...prev,
                              [dish._id]: option.value
                            }))
                          }
                        />
                        {option.value === "small" ? t.sizeSmall : option.value === "large" ? t.sizeLarge : t.sizeNormal}
                      </label>
                    ))}
                  </div>
                  <button
                    className="button"
                    onClick={() => {
                      const selected = getDishSizeOptions(dish).find(
                        (option) => option.value === getSelectedSize(dish)
                      );
                      addItem(dish, selected.value, selected.price);
                    }}
                  >
                    {t.addToCart}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === "success" && (
        <div className="card">
          <h3>{t.orderSuccess}</h3>
          <p>{t.tableNo}：{tableNo}</p>
          <p>{t.orderSuccessTip}</p>
          <div className="section">
            <button className="button" onClick={() => setStep("menu")}>{t.continueOrder}</button>
          </div>
        </div>
      )}
    </div>
  );
}
